import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AtSign, Lock, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

interface LoginPageProps {
  isAdmin?: boolean;
}

export const LoginPage: React.FC<LoginPageProps> = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!email) {
      setFormError('Email é obrigatório');
      return;
    }
    
    if (!password) {
      setFormError('Palavra-passe é obrigatória');
      return;
    }
    
    try {
      await login(email, password);
      navigate(isAdmin ? '/admin/dashboard' : '/dashboard');
    } catch (err) {
      // Error is already handled in the auth context
    }
  };

  // For demo purposes only
  const handleDemoLogin = async () => {
    setEmail('admin@example.com');
    setPassword('password');
    try {
      await login('admin@example.com', 'password');
      navigate(isAdmin ? '/admin/dashboard' : '/dashboard');
    } catch (err) {
      // Error is already handled in the auth context
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      {/* Branding Side - Only show for tenant login */}
      {!isAdmin && (
        <div className="relative hidden w-0 flex-1 lg:block">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-emerald-600 to-emerald-800">
            <div className="flex h-full flex-col items-center justify-center p-12">
              <div className="mb-8">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M9.25 11.5L4.75 14L12 18.25L19.25 14L14.6722 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <h1 className="mb-4 text-4xl font-bold text-white">MealFlow</h1>
              <p className="mb-8 text-center text-xl text-white/90">
                A plataforma completa para gestão integrada de refeitórios
              </p>
              <div className="grid w-full max-w-lg grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <h3 className="mb-2 font-semibold text-white">Reserva de Refeições</h3>
                  <p className="text-sm text-white/90">Planeamento e gestão eficiente de opções e reservas de refeições</p>
                </div>
                <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <h3 className="mb-2 font-semibold text-white">Monitorização de Cozinha</h3>
                  <p className="text-sm text-white/90">Acompanhamento em tempo real da produção e painéis operacionais</p>
                </div>
                <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <h3 className="mb-2 font-semibold text-white">Gestão de Consumidores</h3>
                  <p className="text-sm text-white/90">Perfis completos com preferências e restrições alimentares</p>
                </div>
                <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <h3 className="mb-2 font-semibold text-white">Análise de Dados</h3>
                  <p className="text-sm text-white/90">Insights acionáveis para otimização de operações e redução de desperdício</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Form Side */}
      <div className="flex w-full items-center justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <img
              className="mx-auto h-16 w-auto"
              src="/images/tenant-logo.svg"
              alt="Logo do Tenant"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
              {isAdmin ? 'Administração MealFlow' : 'Entre na sua conta'}
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {isAdmin 
                ? 'Acesso restrito a administradores do sistema'
                : 'Insira suas credenciais para aceder ao sistema'}
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md">
              <div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Endereço de email"
                  leftElement={<AtSign className="h-5 w-5" />}
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Palavra-passe"
                  leftElement={<Lock className="h-5 w-5" />}
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {(error || formError) && (
              <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                      {error || formError}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            {!isAdmin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    Lembrar-me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400">
                    Esqueceu a palavra-passe?
                  </a>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Button 
                type="submit" 
                fullWidth
                isLoading={isLoading}
                disabled={isLoading}
              >
                Entrar
              </Button>
              
              {!isAdmin && (
                <Button 
                  type="button" 
                  variant="secondary" 
                  fullWidth
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                >
                  Demo Login
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};