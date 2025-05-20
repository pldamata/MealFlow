import React from 'react';
import { Utensils } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
  color?: 'emerald' | 'white';
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = 'md', 
  variant = 'full',
  color = 'emerald'
}) => {
  const sizes = {
    sm: { icon: 'h-6 w-6', text: 'text-lg' },
    md: { icon: 'h-8 w-8', text: 'text-xl' },
    lg: { icon: 'h-10 w-10', text: 'text-2xl' },
  };

  const colors = {
    emerald: { icon: 'text-emerald-600', text: 'text-emerald-700' },
    white: { icon: 'text-white', text: 'text-white' },
  };

  return (
    <div className={cn('flex items-center', className)}>
      <Utensils className={cn(sizes[size].icon, colors[color].icon)} />
      {variant === 'full' && (
        <span className={cn('ml-2 font-bold tracking-tight', sizes[size].text, colors[color].text)}>
          MealFlow
        </span>
      )}
    </div>
  );
};

export default Logo;
