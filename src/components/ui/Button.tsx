import * as React from 'react';
import { cn } from '@/src/utils/classNames';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'soft';
  size?: 'sm' | 'default' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-50 duration-200',
          {
            'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/10 active:scale-95': variant === 'default',
            'border border-brand-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 text-brand-800': variant === 'outline',
            'hover:bg-brand-50 text-brand-700': variant === 'ghost',
            'bg-brand-100 text-brand-700 hover:bg-brand-200 shadow-sm': variant === 'soft',
            'h-9 px-6 py-2': size === 'default',
            'h-8 rounded-full px-4 text-xs': size === 'sm',
            'h-14 rounded-full px-10 text-lg': size === 'lg',
          },
          className
        )}
        {...props}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
