import React from 'react';
import { Users, Building2, Box, Settings, Activity } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const AdminDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Painel de Administração</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Gestão centralizada da plataforma MealFlow
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            Relatório do Sistema
          </Button>
          <Button size="sm">
            Novo Tenant
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white p-5 shadow transition-all hover:shadow-md dark:bg-gray-800">
          <div className="flex items-center">
            <div className="rounded-md bg-emerald-100 p-3 dark:bg-emerald-900/20">
              <Building2 className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tenants Ativos</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">24</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-green-600 dark:text-green-500">+2</span>
              <span className="ml-1.5 text-xs text-gray-500 dark:text-gray-400">este mês</span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white p-5 shadow transition-all hover:shadow-md dark:bg-gray-800">
          <div className="flex items-center">
            <div className="rounded-md bg-blue-100 p-3 dark:bg-blue-900/20">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-500" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Utilizadores Totais</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">1,284</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-green-600 dark:text-green-500">+156</span>
              <span className="ml-1.5 text-xs text-gray-500 dark:text-gray-400">este mês</span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white p-5 shadow transition-all hover:shadow-md dark:bg-gray-800">
          <div className="flex items-center">
            <div className="rounded-md bg-purple-100 p-3 dark:bg-purple-900/20">
              <Box className="h-6 w-6 text-purple-600 dark:text-purple-500" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Módulos Ativos</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">86</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-green-600 dark:text-green-500">98.2%</span>
              <span className="ml-1.5 text-xs text-gray-500 dark:text-gray-400">disponibilidade</span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white p-5 shadow transition-all hover:shadow-md dark:bg-gray-800">
          <div className="flex items-center">
            <div className="rounded-md bg-amber-100 p-3 dark:bg-amber-900/20">
              <Activity className="h-6 w-6 text-amber-600 dark:text-amber-500" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Desempenho</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">96%</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-green-600 dark:text-green-500">+2.3%</span>
              <span className="ml-1.5 text-xs text-gray-500 dark:text-gray-400">esta semana</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Tenants Recentes</h2>
            <Button variant="ghost" size="sm">Ver Todos</Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900 dark:text-white">Refeitório Central</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">central.mealflow.net</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Gerir</Button>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900 dark:text-white">Cantina Municipal</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">municipal.mealflow.net</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Gerir</Button>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Alertas do Sistema</h2>
            <Button variant="ghost" size="sm">Ver Todos</Button>
          </div>
          <div className="space-y-4">
            <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-900/20">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Atualização de Sistema Agendada
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                    <p>Manutenção programada para domingo, 20 de junho, das 02:00 às 04:00.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Novo Módulo Disponível
                  </h3>
                  <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                    <p>Módulo de Gestão de Stocks está disponível para ativação.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};