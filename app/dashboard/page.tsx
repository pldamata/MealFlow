import { headers } from 'next/headers';

export default function DashboardPage() {
  const headersList = headers();
  const tenantId = headersList.get('x-tenant-id') || 'Não identificado';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Informações do Tenant</h2>
        <p className="mb-2"><strong>ID do Tenant:</strong> {tenantId}</p>
        <p className="text-sm mt-4 text-gray-500">
          Esta página está acessando o contexto do tenant através do middleware.
        </p>
      </div>
    </div>
  );
}
