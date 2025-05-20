import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../components/ui/Logo';

interface AuthLayoutProps {
  tenantLogo?: string;
  tenantName?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  tenantLogo,
  tenantName = 'Tenant'
}) => {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Auth form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 relative">
        {tenantLogo && (
          <div className="absolute top-8 left-8">
            <img 
              src={tenantLogo} 
              alt={`${tenantName} logo`} 
              className="h-10 w-auto"
            />
          </div>
        )}
        
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          <Outlet />
        </div>
      </div>
      
      {/* Right side - Info area */}
      <div className="hidden lg:block relative w-0 flex-1 bg-gradient-to-br from-emerald-500 to-emerald-700">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543353071-10c8ba85a904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-emerald-700/50"></div>
        
        <div className="flex flex-col justify-between h-full p-12 relative z-10">
          <div>
            <Logo variant="full" color="white" size="lg" />
            <h2 className="mt-6 text-white text-3xl font-extrabold">
              Sistema Integrado de Gestão de Refeitórios
            </h2>
            <p className="mt-3 text-emerald-100 text-lg">
              Plataforma completa para gestão eficiente de refeitórios, unificando todos os processos operacionais em um único ecossistema digital.
            </p>
          </div>
          
          <div className="mt-10">
            <div className="border-t border-emerald-400/30 pt-6">
              <blockquote>
                <p className="text-xl font-medium text-white">
                  "O MealFlow revolucionou nossa operação, proporcionando transparência nutricional e eficiência operacional sem precedentes."
                </p>
                <footer className="mt-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                        alt="Depoimento"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-white">João Silva</p>
                      <p className="text-base font-medium text-emerald-100">Diretor de Operações, Empresa ABC</p>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
