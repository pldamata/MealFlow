import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AtSign, Lock, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage: React.FC = () => {
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
      navigate('/admin/dashboard');
    } catch (err) {
      // Error is already handled in the auth context
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      <div className="flex w-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
              Administração MealFlow
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Acesso restrito a administradores do sistema
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

            <Button 
              type="submit" 
              fullWidth
              isLoading={isLoading}
              disabled={isLoading}
            >
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};