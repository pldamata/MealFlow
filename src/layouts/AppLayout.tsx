import React, { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { 
  ChevronDown, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  User, 
  Bell, 
  Calendar, 
  Utensils, 
  Users, 
  Map, 
  FileText
} from 'lucide-react';
import Logo from '../components/ui/Logo';
import { cn } from '../utils/cn';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to?: string;
  children?: React.ReactNode;
  badge?: number;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon, 
  label, 
  to, 
  children,
  badge
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  if (children) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center px-4 py-2 text-sm font-medium rounded-md w-full transition-colors",
            isOpen 
              ? "text-emerald-700 bg-emerald-50" 
              : "text-gray-700 hover:text-emerald-700 hover:bg-gray-50"
          )}
        >
          <span className="mr-3 text-gray-500">{icon}</span>
          <span>{label}</span>
          {badge && (
            <span className="ml-auto bg-emerald-100 text-emerald-800 py-0.5 px-2 rounded-full text-xs font-medium">
              {badge}
            </span>
          )}
          <ChevronDown 
            className={cn(
              "ml-2 h-4 w-4 transition-transform duration-200",
              isOpen ? "transform rotate-180" : ""
            )} 
          />
        </button>
        
        {isOpen && (
          <div className="mt-1 ml-9 space-y-1">
            {children}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <NavLink
      to={to || '#'}
      className={({ isActive }) => cn(
        "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
        isActive 
          ? "text-emerald-700 bg-emerald-50" 
          : "text-gray-700 hover:text-emerald-700 hover:bg-gray-50"
      )}
    >
      <span className="mr-3 text-gray-500">{icon}</span>
      <span>{label}</span>
      {badge && (
        <span className="ml-auto bg-emerald-100 text-emerald-800 py-0.5 px-2 rounded-full text-xs font-medium">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

const SubNavItem: React.FC<{ label: string; to: string }> = ({ label, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "block py-2 px-3 text-sm rounded-md transition-colors",
        isActive 
          ? "text-emerald-700 bg-emerald-50" 
          : "text-gray-600 hover:text-emerald-700 hover:bg-gray-50"
      )}
    >
      {label}
    </NavLink>
  );
};

interface AppLayoutProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  tenantLogo?: string;
  tenantName?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  user = {
    name: 'Ana Silva',
    email: 'ana.silva@empresa.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
  },
  tenantLogo = 'https://images.unsplash.com/photo-1563694983011-6f4d90358083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
  tenantName = 'FoodService'
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Tenant logo */}
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="h-8 w-auto"
                  src={tenantLogo}
                  alt={`${tenantName} logo`}
                />
              </div>
              
              {/* MealFlow logo */}
              <div className="hidden lg:ml-10 lg:flex lg:items-center">
                <Logo variant="full" size="md" />
              </div>
            </div>
            
            <div className="flex items-center">
              {/* Notifications */}
              <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <span className="sr-only">Ver notificações</span>
                <Bell className="h-6 w-6" />
              </button>
              
              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <span className="sr-only">Abrir menu de usuário</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.avatar}
                      alt={user.name}
                    />
                    <span className="hidden md:flex md:items-center ml-2">
                      <span className="text-sm font-medium text-gray-700 mr-1">{user.name}</span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </span>
                  </button>
                </div>
                
                {showProfileMenu && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Seu Perfil
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Configurações
                      </Link>
                      <Link
                        to="/logout"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Sair
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Nav Menu */}
      <nav className="bg-white shadow-sm border-t border-gray-200 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 h-12 overflow-x-auto">
            <NavItem 
              icon={<LayoutDashboard size={20} />} 
              label="Dashboard" 
              to="/dashboard" 
            />
            
            <NavItem 
              icon={<Calendar size={20} />} 
              label="Reservas" 
              badge={3}
            >
              <SubNavItem label="Gestão de Refeições" to="/reserve_meals" />
              <SubNavItem label="Planeamento de Ementas" to="/reserve_plans" />
              <SubNavItem label="Mapa de Reservas" to="/reserve_maps" />
              <SubNavItem label="Consumidores" to="/reserve_consumers" />
              <SubNavItem label="MicroSites" to="/reserve_microsites" />
              <SubNavItem label="Kiosks" to="/reserves_kiosk" />
              <SubNavItem label="Monitor de Cozinha" to="/reserve_monitor" />
            </NavItem>
            
            <NavItem 
              icon={<Utensils size={20} />} 
              label="Refeitórios" 
              to="/dining_halls" 
            />
            
            <NavItem 
              icon={<Users size={20} />} 
              label="Utilizadores" 
              to="/users" 
            />
            
            <NavItem 
              icon={<Map size={20} />} 
              label="Clientes" 
              to="/clients" 
            />
            
            <NavItem 
              icon={<FileText size={20} />} 
              label="Relatórios" 
              to="/reports" 
            />
            
            <div className="ml-auto">
              <NavItem 
                icon={<Settings size={20} />} 
                label="Configurações"
              >
                <SubNavItem label="Perfis de Acesso" to="/settings/profiles" />
                <SubNavItem label="Preferências" to="/settings/preferences" />
                <SubNavItem label="Sistema" to="/settings/system" />
              </NavItem>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main content */}
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div>
              MealFlow v2023.1.5 • Base de dados: 1.2GB
            </div>
            <div>
              © 2023 MealFlow. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
