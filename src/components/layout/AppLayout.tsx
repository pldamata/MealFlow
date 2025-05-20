import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';

interface AppLayoutProps {
  tenantLogo?: string;
  tenantName?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ 
  tenantLogo,
  tenantName 
}) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <NavBar tenantLogo={tenantLogo} tenantName={tenantName} />
      
      {/* Main content */}
      <main className="mt-28 flex-1 px-4 pb-12 md:px-6">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-4 py-4 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
        <div className="flex flex-col items-center justify-between space-y-2 md:flex-row md:space-y-0">
          <div>
            <span>MealFlow v2025.1.0</span>
            <span className="mx-2">•</span>
            <span>Database: 142MB</span>
          </div>
          <div>
            <span>&copy; 2025 MealFlow. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};