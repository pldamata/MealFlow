/**
 * Gerenciador de conexões para a arquitetura multi-tenant
 * 
 * Este módulo é responsável por:
 * 1. Gerenciar pools de conexão para cada tenant
 * 2. Rotear conexões para o banco de dados correto
 * 3. Implementar cache e timeout para conexões
 */

import { Tenant, TenantConnectionInfo, ConnectionPoolStats } from './types';

// Simulação de um pool de conexões - em produção, usaríamos uma biblioteca como pg ou knex
class ConnectionPool {
  private tenant: Tenant;
  private active: number = 0;
  private idle: number = 5;
  private maxConnections: number = 20;
  private lastActivity: Date = new Date();

  constructor(tenant: Tenant) {
    this.tenant = tenant;
  }

  async getConnection() {
    if (this.active >= this.maxConnections) {
      throw new Error(`Connection limit reached for tenant ${this.tenant.id}`);
    }
    
    this.active++;
    this.idle = Math.max(0, this.idle - 1);
    this.lastActivity = new Date();
    
    // Simulação de conexão - em produção, retornaria uma conexão real
    return {
      query: async (sql: string, params: any[] = []) => {
        console.log(`Executing query for tenant ${this.tenant.id}:`, sql, params);
        return { rows: [] };
      },
      release: () => {
        this.active--;
        this.idle++;
        this.lastActivity = new Date();
      }
    };
  }

  getStats(): ConnectionPoolStats {
    return {
      active: this.active,
      idle: this.idle,
      waiting: 0,
      total: this.active + this.idle,
      maxConnections: this.maxConnections
    };
  }

  getLastActivity(): Date {
    return this.lastActivity;
  }

  async close() {
    // Em produção, fecharia todas as conexões no pool
    this.active = 0;
    this.idle = 0;
    console.log(`Closed connection pool for tenant ${this.tenant.id}`);
  }
}

class TenantConnectionManager {
  private connectionPools: Map<string, ConnectionPool> = new Map();
  private inactivityTimeout: number = 30 * 60 * 1000; // 30 minutos
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Iniciar limpeza periódica de conexões inativas
    this.cleanupInterval = setInterval(() => this.cleanupInactiveConnections(), 5 * 60 * 1000);
  }

  async getConnectionForTenant(tenant: Tenant) {
    let pool = this.connectionPools.get(tenant.id);
    
    if (!pool) {
      pool = new ConnectionPool(tenant);
      this.connectionPools.set(tenant.id, pool);
    }
    
    return pool.getConnection();
  }

  async cleanupInactiveConnections() {
    const now = new Date();
    
    // Usando Array.from para converter o Map em um array compatível com ES5
    Array.from(this.connectionPools.keys()).forEach(tenantId => {
      const pool = this.connectionPools.get(tenantId)!;
      const lastActivity = pool.getLastActivity();
      const inactiveTime = now.getTime() - lastActivity.getTime();
      
      if (inactiveTime > this.inactivityTimeout && pool.getStats().active === 0) {
        pool.close().then(() => {
          this.connectionPools.delete(tenantId);
          console.log(`Removed inactive connection pool for tenant ${tenantId}`);
        });
      }
    });
  }

  getAllConnectionInfo(): TenantConnectionInfo[] {
    const result: TenantConnectionInfo[] = [];
    
    // Usando Array.from para converter o Map em um array compatível com ES5
    Array.from(this.connectionPools.entries()).forEach(([tenantId, pool]) => {
      const tenant = { id: tenantId } as Tenant; // Em produção, buscaríamos o tenant completo
      
      result.push({
        tenant,
        stats: pool.getStats(),
        lastActivity: pool.getLastActivity()
      });
    });
    
    return result;
  }

  async shutdown() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    
    // Usando Array.from para converter o Map em um array compatível com ES5
    const closePromises = Array.from(this.connectionPools.values()).map(pool => pool.close());
    await Promise.all(closePromises);
    
    this.connectionPools.clear();
    console.log('All connection pools have been closed');
  }
}

// Singleton para uso em toda a aplicação
export const tenantConnectionManager = new TenantConnectionManager();
