import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'flex rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:placeholder:text-gray-400 dark:focus-visible:ring-emerald-500',
  {
    variants: {
      variant: {
        default: '',
        filled: 'bg-gray-100 border-transparent focus:bg-white dark:bg-gray-700 dark:focus:bg-gray-800',
      },
      size: {
        default: 'h-10',
        sm: 'h-8 text-xs px-2.5',
        lg: 'h-12 text-base px-4',
      },
      fullWidth: {
        true: 'w-full',
      },
      error: {
        true: 'border-red-500 focus-visible:ring-red-500 dark:border-red-700 dark:focus-visible:ring-red-700',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
      error: false,
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth, 
    error, 
    errorMessage,
    leftElement,
    rightElement,
    ...props 
  }, ref) => {
    if (leftElement || rightElement) {
      return (
        <div className="relative">
          {leftElement && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {leftElement}
            </div>
          )}
          <input
            className={inputVariants({ 
              variant, 
              size, 
              fullWidth, 
              error: error || !!errorMessage,
              className: [
                className,
                leftElement ? 'pl-10' : '',
                rightElement ? 'pr-10' : '',
              ].join(' ').trim()
            })}
            ref={ref}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {rightElement}
            </div>
          )}
          {errorMessage && (
            <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
          )}
        </div>
      );
    }

    return (
      <div>
        <input
          className={inputVariants({ 
            variant, 
            size, 
            fullWidth, 
            error: error || !!errorMessage,
            className 
          })}
          ref={ref}
          {...props}
        />
        {errorMessage && (
          <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };