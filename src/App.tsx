import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import AppLayout from './layouts/AppLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';

// App Pages
import DashboardPage from './pages/dashboard/DashboardPage';
import MealsPage from './pages/reserve/MealsPage';
import MicroSitePage from './pages/reserve/MicroSitePage';

// Sample tenant data
const tenantData = {
  name: 'FoodService',
  logo: 'https://images.unsplash.com/photo-1563694983011-6f4d90358083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<AuthLayout tenantLogo={tenantData.logo} tenantName={tenantData.name} />}>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        
        {/* App Routes */}
        <Route path="/" element={<AppLayout tenantLogo={tenantData.logo} tenantName={tenantData.name} />}>
          <Route path="dashboard" element={<DashboardPage />} />
          
          {/* Reserves Module */}
          <Route path="reserve_meals" element={<MealsPage />} />
          <Route path="reserve_microsites" element={<MicroSitePage />} />
          
          {/* Redirect to dashboard if no route matches */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
