import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
        <h1 className="text-4xl font-bold mb-8">MealFlow</h1>
        <p className="text-xl mb-8">Plataforma SaaS para gestão de cafeterias e refeitórios</p>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/?subdomain=abc" 
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Tenant ABC{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                ->
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Acessar o tenant ABC (em desenvolvimento)
            </p>
          </Link>

          <Link
            href="/?subdomain=xyz"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Tenant XYZ{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                ->
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Acessar o tenant XYZ (em desenvolvimento)
            </p>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm opacity-70">
            Modo de desenvolvimento: Use os links acima para simular acesso a diferentes tenants
          </p>
        </div>
      </div>
    </main>
  );
}
