import React, { useState } from 'react';
import { ChevronDown, Bell, Menu, X, User, LogOut, Settings, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Module } from '../../types';
import { mockModules } from '../../data/mockData';

interface NavBarProps {
  tenantLogo?: string;
  tenantName?: string;
}

export const NavBar: React.FC<NavBarProps> = ({ 
  tenantLogo = '/images/tenant-logo.svg',
  tenantName = 'Demo Tenant' 
}) => {
  const { user, logout } = useAuth();
  const { mode, setMode } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  // Use mock modules for now, this would come from an API in production
  const modules = mockModules.filter(module => module.licensed);

  const toggleDropdown = (moduleId: string) => {
    setActiveDropdown(activeDropdown === moduleId ? null : moduleId);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const toggleTheme = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 z-40 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          {/* Left side - Tenant Logo */}
          <div className="flex items-center">
            <img 
              src={tenantLogo} 
              alt={`${tenantName} logo`} 
              className="h-8 w-auto"
            />
          </div>
          
          {/* Center - MealFlow Logo */}
          <div className="hidden md:block">
            <div className="text-xl font-semibold text-emerald-600 dark:text-emerald-500">
              MealFlow
            </div>
          </div>
          
          {/* Right side - User profile & actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button 
              className="relative rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                3
              </span>
            </button>
            
            {/* Toggle Theme - Dekstop*/}
            <button
              className="hidden rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 md:block"
              onClick={toggleTheme}
              aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
            >
              {mode === 'dark' ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            {/* Mobile menu button */}
            <button
              className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            {/* User profile - Desktop */}
            <div className="relative hidden md:block">
              <button
                className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={toggleUserMenu}
                aria-label="User menu"
              >
                <img
                  src={user?.avatar || "https://i.pravatar.cc/150?img=68"}
                  alt="User avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-300 md:block">
                  {user?.name || 'User'}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
              
              {/* User dropdown menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
                  <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => navigate('/profile')}
                    >
                      <User className="mr-3 h-4 w-4" />
                      Profile
                    </button>
                    <button
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={toggleTheme}
                    >
                      {mode === 'dark' ? (
                        <>
                          <svg className="mr-3 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          Light Mode
                        </>
                      ) : (
                        <>
                          <svg className="mr-3 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                          </svg>
                          Dark Mode
                        </>
                      )}
                    </button>
                    <button
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => navigate('/settings')}
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </button>
                    <button
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => navigate('/help')}
                    >
                      <HelpCircle className="mr-3 h-4 w-4" />
                      Help & Support
                    </button>
                  </div>
                  <div className="border-t border-gray-100 dark:border-gray-700">
                    <button
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Navigation Bar */}
        <nav className="hidden border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:block">
          <div className="flex h-12 items-center space-x-1 px-4 md:px-6">
            {/* Dashboard - Always visible */}
            <button
              className="flex h-full items-center rounded-md px-3 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => navigate('/dashboard')}
            >
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </button>
            
            {/* Dynamic modules */}
            {modules.map((module: Module) => (
              <div key={module.id} className="relative">
                <button
                  className={`flex h-full items-center rounded-md px-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    activeDropdown === module.id 
                      ? 'border-b-2 border-emerald-600 text-emerald-600 dark:border-emerald-500 dark:text-emerald-500' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => toggleDropdown(module.id)}
                  aria-expanded={activeDropdown === module.id}
                >
                  <span className="mr-2" dangerouslySetInnerHTML={{ __html: module.icon }} />
                  {module.name}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {/* Dropdown for submodules */}
                {activeDropdown === module.id && module.submodules.length > 0 && (
                  <div className="absolute left-0 top-full z-10 mt-1 w-56 rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
                    {module.submodules.filter(sm => sm.licensed).map((submodule) => (
                      <button
                        key={submodule.id}
                        className="flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        onClick={() => {
                          navigate(`${module.path}${submodule.path}`);
                          setActiveDropdown(null);
                        }}
                      >
                        {submodule.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Settings - Always at the end */}
            <div className="ml-auto">
              <button
                className={`flex h-full items-center rounded-md px-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  activeDropdown === 'settings' 
                    ? 'border-b-2 border-emerald-600 text-emerald-600 dark:border-emerald-500 dark:text-emerald-500' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => toggleDropdown('settings')}
                aria-expanded={activeDropdown === 'settings'}
              >
                <Settings className="mr-2 h-5 w-5" />
                Settings
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {/* Settings dropdown */}
              {activeDropdown === 'settings' && (
                <div className="absolute right-4 z-10 mt-1 w-56 rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
                  <button
                    className="flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => {
                      navigate('/settings/general');
                      setActiveDropdown(null);
                    }}
                  >
                    General Settings
                  </button>
                  <button
                    className="flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => {
                      navigate('/settings/users');
                      setActiveDropdown(null);
                    }}
                  >
                    User Management
                  </button>
                  <button
                    className="flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => {
                      navigate('/settings/permissions');
                      setActiveDropdown(null);
                    }}
                  >
                    Permissions
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 md:hidden">
          <div className="absolute right-0 h-full w-64 bg-white p-4 dark:bg-gray-900">
            <div className="mb-8 flex items-center justify-between">
              <div className="text-xl font-semibold text-emerald-600 dark:text-emerald-500">
                MealFlow
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* User info for mobile */}
            <div className="mb-6 border-b border-gray-200 pb-6 dark:border-gray-700">
              <div className="flex items-center">
                <img
                  src={user?.avatar || "https://i.pravatar.cc/150?img=68"}
                  alt="User avatar"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col space-y-2">
                <button
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => {
                    navigate('/profile');
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="mr-3 h-5 w-5" />
                  Profile
                </button>
                <button
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => {
                    toggleTheme();
                  }}
                >
                  {mode === 'dark' ? (
                    <>
                      <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Light Mode
                    </>
                  ) : (
                    <>
                      <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                      Dark Mode
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* Navigation items */}
            <div className="flex flex-col space-y-1">
              <button
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={() => {
                  navigate('/dashboard');
                  setMobileMenuOpen(false);
                }}
              >
                <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </button>
              
              {/* Modules in mobile menu */}
              {modules.map((module: Module) => (
                <div key={module.id}>
                  <button
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    onClick={() => toggleDropdown(module.id)}
                  >
                    <div className="flex items-center">
                      <span className="mr-3" dangerouslySetInnerHTML={{ __html: module.icon }} />
                      {module.name}
                    </div>
                    <ChevronDown className={`h-4 w-4 transform transition-transform ${activeDropdown === module.id ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Mobile submodules */}
                  {activeDropdown === module.id && module.submodules.length > 0 && (
                    <div className="ml-8 mt-1 space-y-1">
                      {module.submodules.filter(sm => sm.licensed).map((submodule) => (
                        <button
                          key={submodule.id}
                          className="flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          onClick={() => {
                            navigate(`${module.path}${submodule.path}`);
                            setMobileMenuOpen(false);
                          }}
                        >
                          {submodule.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Settings in mobile menu */}
              <div>
                <button
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => toggleDropdown('settings')}
                >
                  <div className="flex items-center">
                    <Settings className="mr-3 h-5 w-5" />
                    Settings
                  </div>
                  <ChevronDown className={`h-4 w-4 transform transition-transform ${activeDropdown === 'settings' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'settings' && (
                  <div className="ml-8 mt-1 space-y-1">
                    <button
                      className="flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => {
                        navigate('/settings/general');
                        setMobileMenuOpen(false);
                      }}
                    >
                      General Settings
                    </button>
                    <button
                      className="flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => {
                        navigate('/settings/users');
                        setMobileMenuOpen(false);
                      }}
                    >
                      User Management
                    </button>
                    <button
                      className="flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => {
                        navigate('/settings/permissions');
                        setMobileMenuOpen(false);
                      }}
                    >
                      Permissions
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Logout for mobile */}
            <div className="absolute bottom-4 left-0 w-full border-t border-gray-200 px-4 pt-4 dark:border-gray-700">
              <button
                className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-800"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};