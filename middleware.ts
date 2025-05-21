import { NextRequest, NextResponse } from 'next/server';
import { TenantResolver } from './lib/multi-tenant/tenant-resolver';

export async function middleware(request: NextRequest) {
  // Ignorar rotas públicas e estáticas
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api/public') ||
    request.nextUrl.pathname.startsWith('/favicon.ico') ||
    request.nextUrl.pathname === '/'
  ) {
    return NextResponse.next();
  }

  // Verificar se é uma rota de dashboard ou tenant
  if (request.nextUrl.pathname.startsWith('/dashboard') || 
      request.nextUrl.pathname.startsWith('/app')) {
    
    // Resolver o tenant com base no subdomínio
    const tenant = await TenantResolver.resolveTenantFromRequest(request);
    
    if (!tenant) {
      // Redirecionar para a página inicial se o tenant não for encontrado
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    // Adicionar o tenant ao contexto da requisição
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-tenant-id', tenant.id);
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /_next (Next.js internals)
     * 2. /static (static files)
     * 3. /favicon.ico (favicon file)
     * 4. /api/* (API routes - added to exclude API routes from middleware)
     */
    '/((?!_next|static|favicon.ico|api).*)',
  ],
};
