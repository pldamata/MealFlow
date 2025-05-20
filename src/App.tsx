import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { AppLayout } from './components/layout/AppLayout';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }
  
  if (!user) {
    const isAdminDomain = window.location.hostname === 'root.mealflow.net';
    return <Navigate to={isAdminDomain ? "/login" : "/login"} replace />;
  }
  
  return <>{children}</>;
};

const LandingPage = () => (
  <div className="flex min-h-screen flex-col bg-white">
    {/* Hero Section */}
    <header className="bg-gradient-to-r from-emerald-600 to-emerald-800 py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <img src="/images/mealflow-logo.png" alt="MealFlow" className="mb-8 h-24" />
          <p className="mb-8 text-xl">A solução completa para gestão de refeitórios</p>
          <div className="flex gap-4">
            <a href="https://root.mealflow.net/login" className="rounded-lg bg-white px-6 py-3 font-semibold text-emerald-600 transition hover:bg-gray-100">
              Acesso Administração
            </a>
            <a href="https://demo.mealflow.net/login" className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              Demo Tenant
            </a>
          </div>
        </div>
      </div>
    </header>

    {/* Features Section */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Recursos Principais</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold text-emerald-600">Gestão de Refeições</h3>
            <p className="text-gray-600">Planejamento eficiente de cardápios e controle de reservas</p>
          </div>
          <div className="rounded-lg p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold text-emerald-600">Controle de Estoque</h3>
            <p className="text-gray-600">Gestão completa de inventário e fornecedores</p>
          </div>
          <div className="rounded-lg p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold text-emerald-600">Análise de Dados</h3>
            <p className="text-gray-600">Relatórios detalhados e insights para tomada de decisão</p>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="mt-auto bg-gray-900 py-8 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>© 2025 MealFlow. Todos os direitos reservados.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-emerald-400">Sobre</a>
            <a href="#" className="hover:text-emerald-400">Contato</a>
            <a href="#" className="hover:text-emerald-400">Termos</a>
            <a href="#" className="hover:text-emerald-400">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

const AppRoutes = () => {
  const hostname = window.location.hostname;
  const isAdminDomain = hostname === 'root.mealflow.net';
  const isTenantDomain = hostname.includes('.mealflow.net') && !isAdminDomain;
  const isMainDomain = !isAdminDomain && !isTenantDomain;

  if (isAdminDomain) {
    return (
      <Router>
        <Routes>
          {/* Admin SaaS routes */}
          <Route path="/login" element={<LoginPage isAdmin />} />
          
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AppLayout isAdmin />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage isAdmin />} />
            <Route path="tenants" element={<div>Tenant Management</div>} />
            <Route path="modules" element={<div>Module Management</div>} />
            <Route path="support" element={<div>Support Dashboard</div>} />
            <Route path="audit" element={<div>Audit Logs</div>} />
          </Route>
        </Routes>
      </Router>
    );
  }

  if (isTenantDomain) {
    return (
      <Router>
        <Routes>
          {/* Tenant routes */}
          <Route path="/login" element={<LoginPage />} />
          
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            
            {/* Reserves module routes */}
            <Route path="reserves">
              <Route path="meals" element={<div>Meal Management</div>} />
              <Route path="plans" element={<div>Menu Planning</div>} />
              <Route path="maps" element={<div>Reservation Map</div>} />
              <Route path="consumers" element={<div>Consumers</div>} />
              <Route path="microsites" element={<div>MicroSite</div>} />
              <Route path="kiosks" element={<div>Kiosks</div>} />
              <Route path="monitor" element={<div>Kitchen Monitor</div>} />
            </Route>
            
            {/* Settings routes */}
            <Route path="settings">
              <Route path="general" element={<div>General Settings</div>} />
              <Route path="users" element={<div>User Management</div>} />
              <Route path="permissions" element={<div>Permissions</div>} />
            </Route>
          </Route>
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    );
  }

  // Main domain (www.mealflow.net) - Landing page
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

function App() {
  useEffect(() => {
    const hostname = window.location.hostname;
    if (hostname === 'root.mealflow.net') {
      document.title = 'MealFlow - Administration';
    } else if (hostname.includes('.mealflow.net')) {
      document.title = 'MealFlow - Tenant Management';
    } else {
      document.title = 'MealFlow - Integrated Refeitório Management';
    }
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;