import { NextRequest, NextResponse } from 'next/server';
import { Tenant } from '@/lib/multi-tenant/types';

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

// Configuração para indicar que esta rota é dinâmica
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Obter o ID do tenant do header (definido pelo middleware)
  const tenantId = request.headers.get('x-tenant-id');
  
  if (!tenantId) {
    return NextResponse.json(
      { error: 'Tenant not found' },
      { status: 404 }
    );
  }
  
  const tenant = MOCK_TENANTS[tenantId];
  
  if (!tenant) {
    return NextResponse.json(
      { error: 'Tenant not found' },
      { status: 404 }
    );
  }
  
  // Remover informações sensíveis antes de enviar para o cliente
  const { databaseConfig, ...safeTenant } = tenant;
  
  return NextResponse.json(safeTenant);
}
