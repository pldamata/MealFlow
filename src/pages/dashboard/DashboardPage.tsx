import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar, 
  Utensils, 
  Clock, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, className }) => {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-6", className)}>
      <div className="flex items-center">
        <div className="p-3 rounded-md bg-emerald-50 text-emerald-600">
          {icon}
        </div>
        <div className="ml-5">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
      </div>
      
      {change && (
        <div className="mt-4 flex items-center">
          {change.trend === 'up' ? (
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          ) : change.trend === 'down' ? (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          ) : null}
          
          <span 
            className={cn(
              "text-sm font-medium ml-1",
              change.trend === 'up' ? "text-emerald-600" : 
              change.trend === 'down' ? "text-red-600" : 
              "text-gray-500"
            )}
          >
            {change.value}
          </span>
        </div>
      )}
    </div>
  );
};

interface AlertProps {
  title: string;
  description: string;
  type: 'warning' | 'info' | 'success' | 'error';
}

const Alert: React.FC<AlertProps> = ({ title, description, type }) => {
  const styles = {
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      title: 'text-amber-800',
      description: 'text-amber-700'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: <AlertTriangle className="h-5 w-5 text-blue-500" />,
      title: 'text-blue-800',
      description: 'text-blue-700'
    },
    success: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      icon: <AlertTriangle className="h-5 w-5 text-emerald-500" />,
      title: 'text-emerald-800',
      description: 'text-emerald-700'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      title: 'text-red-800',
      description: 'text-red-700'
    }
  };
  
  const style = styles[type];
  
  return (
    <div className={cn("rounded-md p-4 border", style.bg, style.border)}>
      <div className="flex">
        <div className="flex-shrink-0">
          {style.icon}
        </div>
        <div className="ml-3">
          <h3 className={cn("text-sm font-medium", style.title)}>{title}</h3>
          <div className={cn("mt-2 text-sm", style.description)}>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Visão geral das operações e métricas principais
        </p>
      </div>
      
      {/* Alerts */}
      <div className="mb-6 space-y-4">
        <Alert 
          type="warning"
          title="Capacidade próxima do limite"
          description="O refeitório Central está com 92% da capacidade reservada para o almoço de hoje."
        />
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Reservas Hoje" 
          value="387" 
          icon={<Calendar className="h-6 w-6" />}
          change={{ value: "+12% vs. semana passada", trend: "up" }}
        />
        <StatCard 
          title="Consumidores Ativos" 
          value="1,284" 
          icon={<Users className="h-6 w-6" />}
          change={{ value: "+3% vs. mês passado", trend: "up" }}
        />
        <StatCard 
          title="Taxa de Ocupação" 
          value="78%" 
          icon={<BarChart3 className="h-6 w-6" />}
          change={{ value: "+5% vs. semana passada", trend: "up" }}
        />
        <StatCard 
          title="Avaliação Média" 
          value="4.7/5" 
          icon={<TrendingUp className="h-6 w-6" />}
          change={{ value: "+0.2 vs. mês passado", trend: "up" }}
        />
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Reservations chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Reservas por Período</h2>
              <div className="flex space-x-2">
                <select className="text-sm border-gray-300 rounded-md">
                  <option>Últimos 7 dias</option>
                  <option>Últimos 30 dias</option>
                  <option>Este mês</option>
                </select>
              </div>
            </div>
            
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
              <p className="text-gray-500">Gráfico de reservas por período seria exibido aqui</p>
            </div>
          </div>
          
          {/* Recent activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Atividade Recente</h2>
            
            <div className="flow-root">
              <ul className="-mb-8">
                <li>
                  <div className="relative pb-8">
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center ring-8 ring-white">
                          <Utensils className="h-5 w-5 text-emerald-600" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <a href="#" className="font-medium text-gray-900">Ementa Semanal</a>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            Publicada a ementa para a próxima semana
                          </p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>A ementa para a semana de 15/05 a 19/05 foi publicada e está disponível para reservas.</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                        <time dateTime="2023-05-08T09:12:00">Hoje, 09:12</time>
                      </div>
                    </div>
                  </div>
                </li>
                
                <li>
                  <div className="relative pb-8">
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center ring-8 ring-white">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <a href="#" className="font-medium text-gray-900">Novos Consumidores</a>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            27 novos consumidores adicionados
                          </p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>Departamento de Marketing adicionou 27 novos consumidores ao sistema.</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                        <time dateTime="2023-05-07T14:32:00">Ontem, 14:32</time>
                      </div>
                    </div>
                  </div>
                </li>
                
                <li>
                  <div className="relative pb-8">
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center ring-8 ring-white">
                          <Clock className="h-5 w-5 text-amber-600" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <a href="#" className="font-medium text-gray-900">Período de Reservas</a>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            Alteração no horário de reservas
                          </p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>O horário limite para reservas do jantar foi alterado para 15:00h.</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                        <time dateTime="2023-05-05T10:15:00">05/05, 10:15</time>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="mt-6">
              <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                Ver todas as atividades
              </a>
            </div>
          </div>
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          {/* Today's menu */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Ementa de Hoje</h2>
            
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Almoço</h3>
                <ul className="mt-2 divide-y divide-gray-200">
                  <li className="py-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Prato Principal
                        </span>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">Bacalhau à Brás</p>
                        <p className="mt-1 text-xs text-gray-500">Nutriscore: A</p>
                      </div>
                      <div className="ml-3 flex-shrink-0">
                        <span className="inline-block h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium flex items-center justify-center">
                          87
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="py-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Prato Principal
                        </span>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">Bife de Peru Grelhado</p>
                        <p className="mt-1 text-xs text-gray-500">Nutriscore: B</p>
                      </div>
                      <div className="ml-3 flex-shrink-0">
                        <span className="inline-block h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium flex items-center justify-center">
                          65
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="py-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Vegetariano
                        </span>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">Lasanha de Legumes</p>
                        <p className="mt-1 text-xs text-gray-500">Nutriscore: A</p>
                      </div>
                      <div className="ml-3 flex-shrink-0">
                        <span className="inline-block h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium flex items-center justify-center">
                          42
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900">Jantar</h3>
                <ul className="mt-2 divide-y divide-gray-200">
                  <li className="py-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Prato Principal
                        </span>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">Arroz de Pato</p>
                        <p className="mt-1 text-xs text-gray-500">Nutriscore: B</p>
                      </div>
                      <div className="ml-3 flex-shrink-0">
                        <span className="inline-block h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium flex items-center justify-center">
                          53
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="py-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Peixe
                        </span>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">Salmão Grelhado</p>
                        <p className="mt-1 text-xs text-gray-500">Nutriscore: A</p>
                      </div>
                      <div className="ml-3 flex-shrink-0">
                        <span className="inline-block h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium flex items-center justify-center">
                          38
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6">
              <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                Ver ementa completa
              </a>
            </div>
          </div>
          
          {/* Top rated meals */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Refeições Mais Bem Avaliadas</h2>
            
            <ol className="space-y-4">
              <li className="flex items-center space-x-3">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-800 rounded-full font-medium">
                  1
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Bacalhau à Brás</p>
                  <p className="text-xs text-gray-500">Servido 127 vezes</p>
                </div>
                <div className="flex items-center space-x-1 text-amber-500">
                  <span className="text-sm font-medium">4.9</span>
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-800 rounded-full font-medium">
                  2
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Lasanha de Legumes</p>
                  <p className="text-xs text-gray-500">Servido 98 vezes</p>
                </div>
                <div className="flex items-center space-x-1 text-amber-500">
                  <span className="text-sm font-medium">4.8</span>
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-800 rounded-full font-medium">
                  3
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Salmão Grelhado</p>
                  <p className="text-xs text-gray-500">Servido 112 vezes</p>
                </div>
                <div className="flex items-center space-x-1 text-amber-500">
                  <span className="text-sm font-medium">4.7</span>
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-800 rounded-full font-medium">
                  4
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Arroz de Pato</p>
                  <p className="text-xs text-gray-500">Servido 87 vezes</p>
                </div>
                <div className="flex items-center space-x-1 text-amber-500">
                  <span className="text-sm font-medium">4.6</span>
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-800 rounded-full font-medium">
                  5
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Bife de Peru Grelhado</p>
                  <p className="text-xs text-gray-500">Servido 103 vezes</p>
                </div>
                <div className="flex items-center space-x-1 text-amber-500">
                  <span className="text-sm font-medium">4.5</span>
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </li>
            </ol>
            
            <div className="mt-6">
              <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                Ver todas as avaliações
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
