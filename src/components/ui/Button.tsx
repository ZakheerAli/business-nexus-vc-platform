import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap shrink-0 cursor-pointer select-none overflow-hidden';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 h-8.5',
    md: 'text-sm px-4.5 py-2 gap-2 h-10',
    lg: 'text-base px-6 py-2.5 gap-2.5 h-12'
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/25 hover:shadow-lg hover:shadow-indigo-600/35 hover:brightness-110 active:scale-[0.98]',
    gradient:
      'bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-cyan-500/30 hover:brightness-110 active:scale-[0.98]',
    secondary:
      'bg-neutral-100 hover:bg-neutral-200/80 text-neutral-900 dark:bg-neutral-800/80 dark:hover:bg-neutral-700/80 dark:text-neutral-100 border border-neutral-200/60 dark:border-white/10 backdrop-blur-xs',
    outline:
      'border border-neutral-300 dark:border-white/15 hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-800 dark:text-neutral-200',
    ghost:
      'hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-700 dark:text-neutral-300',
    danger:
      'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-sm shadow-red-500/20'
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-0.5 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </motion.button>
  );
};
