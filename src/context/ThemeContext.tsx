import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  setMode: () => {},
  isDark: false,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const { user } = useAuth();
  const [mode, setMode] = useState<ThemeMode>(user?.preferences.theme || 'light');
  const [isDark, setIsDark] = useState<boolean>(false);

  // Update theme when user preferences change
  useEffect(() => {
    if (user?.preferences.theme) {
      setMode(user.preferences.theme);
    }
  }, [user?.preferences.theme]);

  // Apply theme based on mode
  useEffect(() => {
    const applyTheme = (dark: boolean) => {
      if (dark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      setIsDark(dark);
    };

    if (mode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark);

      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => applyTheme(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      applyTheme(mode === 'dark');
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};