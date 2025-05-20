import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { AppLayout } from './components/layout/AppLayout';

// Protected route wrapper
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
    // Check if we're on admin domain
    const isAdminDomain = window.location.hostname === 'root.mealflow.net';
    return <Navigate to={isAdminDomain ? "/admin/login" : "/login"} replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  // Determine the current domain type
  const hostname = window.location.hostname;
  const isAdminDomain = hostname === 'root.mealflow.net';
  const isTenantDomain = hostname.includes('.mealflow.net') && !isAdminDomain;

  if (isAdminDomain) {
    return (
      <Router>
        <Routes>
          {/* Admin SaaS routes */}
          <Route path="/admin/login" element={<LoginPage isAdmin />} />
          
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AppLayout isAdmin />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage isAdmin />} />
            <Route path="tenants" element={<div>Tenant Management</div>} />
            <Route path="modules" element={<div>Module Management</div>} />
            <Route path="support" element={<div>Support Dashboard</div>} />
            <Route path="audit" element={<div>Audit Logs</div>} />
          </Route>
          
          {/* Redirect root to admin dashboard */}
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
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
            path="/"
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
        <Route path="/" element={<div>MealFlow Landing Page</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

function App() {
  // Set page title based on domain
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