/**
 * Resolvedor de tenants baseado em subdomínio
 * 
 * Este módulo é responsável por:
 * 1. Identificar o tenant com base no subdomínio da requisição
 * 2. Carregar as configurações do tenant
 */

import { NextRequest } from 'next/server';
import { Tenant } from './types';

// Simulação de um repositório de tenants - em produção, isso viria do banco de dados
const MOCK_TENANTS: Record<string, Tenant> = {
  'tenant1': {
    id: 'tenant1',
    name: 'Empresa ABC',
    subdomain: 'abc',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    databaseConfig: {
      host: 'localhost',
      port: 5432,
      database: 'tenant1_db',
      user: 'tenant1_user',
      password: 'password'
    }
  },
  'tenant2': {
    id: 'tenant2',
    name: 'Empresa XYZ',
    subdomain: 'xyz',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    databaseConfig: {
      host: 'localhost',
      port: 5432,
      database: 'tenant2_db',
      user: 'tenant2_user',
      password: 'password'
    }
  }
};

export class TenantResolver {
  /**
   * Extrai o subdomínio da URL da requisição
   */
  static getSubdomainFromRequest(request: NextRequest): string | null {
    const host = request.headers.get('host');
    if (!host) return null;
    
    // Ignorar porta se presente
    const hostname = host.split(':')[0];
    
    // Verificar se é localhost (desenvolvimento)
    if (hostname === 'localhost') {
      // Em desenvolvimento, podemos usar um header personalizado ou um parâmetro de query
      const subdomain = request.nextUrl.searchParams.get('subdomain');
      return subdomain;
    }
    
    // Extrair subdomínio de domínios como 'abc.mealflow.com'
    const parts = hostname.split('.');
    if (parts.length <= 2) return null; // Não há subdomínio
    
    return parts[0];
  }
  
  /**
   * Busca um tenant pelo subdomínio
   */
  static async getTenantBySubdomain(subdomain: string): Promise<Tenant | null> {
    // Em produção, isso seria uma consulta ao banco de dados
    for (const tenant of Object.values(MOCK_TENANTS)) {
      if (tenant.subdomain === subdomain && tenant.isActive) {
        return tenant;
      }
    }
    
    return null;
  }
  
  /**
   * Resolve o tenant com base na requisição
   */
  static async resolveTenantFromRequest(request: NextRequest): Promise<Tenant | null> {
    const subdomain = this.getSubdomainFromRequest(request);
    if (!subdomain) return null;
    
    return this.getTenantBySubdomain(subdomain);
  }
}
