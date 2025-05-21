import { headers } from 'next/headers';
import Link from 'next/link';

export default function AppPage() {
  const headersList = headers();
  const tenantId = headersList.get('x-tenant-id') || 'Não identificado';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Aplicação MealFlow</h1>
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">Informações do Tenant</h2>
        <p className="mb-2"><strong>ID do Tenant:</strong> {tenantId}</p>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/dashboard" 
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-xl font-semibold">
              Dashboard{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                ->
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Acessar o dashboard
            </p>
          </Link>

          <Link
            href="/"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-xl font-semibold">
              Página Inicial{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                ->
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Voltar para a página inicial
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
