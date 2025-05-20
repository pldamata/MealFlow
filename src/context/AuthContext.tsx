import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, UserPreferences } from '../types';

// Default user preferences
const defaultPreferences: UserPreferences = {
  language: 'pt',
  theme: 'light',
  navStyle: 'both',
  navDensity: 'comfortable',
  favoriteModules: [],
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  error: null,
  login: async () => {},
  logout: () => {},
  updateUserPreferences: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Mock login function - in a real app, this would call an API
const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (email === 'admin@example.com' && password === 'password') {
    return {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: UserRole.Admin,
      avatar: 'https://i.pravatar.cc/150?img=68',
      tenant: 'demo',
      preferences: defaultPreferences,
    };
  }
  
  throw new Error('Invalid credentials');
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('mealflow_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        localStorage.removeItem('mealflow_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await mockLogin(email, password);
      setUser(user);
      localStorage.setItem('mealflow_user', JSON.stringify(user));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mealflow_user');
  };

  const updateUserPreferences = (preferences: Partial<UserPreferences>) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        ...preferences,
      },
    };
    
    setUser(updatedUser);
    localStorage.setItem('mealflow_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout, updateUserPreferences }}>
      {children}
    </AuthContext.Provider>
  );
};