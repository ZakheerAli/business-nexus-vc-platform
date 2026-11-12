import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-neutral-400">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full h-10 px-3 text-sm bg-white dark:bg-neutral-900 border rounded-lg transition-colors placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:bg-neutral-50 dark:disabled:bg-neutral-950 ${
            leftIcon ? 'pl-9' : ''
          } ${rightIcon ? 'pr-9' : ''} ${
            error
              ? 'border-red-500 text-red-900 dark:text-red-300 focus:ring-red-500'
              : 'border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100'
          } ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 flex items-center pointer-events-none text-neutral-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
      {!error && helperText && (
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{helperText}</p>
      )}
    </div>
  );
};

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  rows = 3,
  ...props
}) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={`w-full px-3 py-2 text-sm bg-white dark:bg-neutral-900 border rounded-lg transition-colors placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 ${
          error
            ? 'border-red-500 text-red-900 dark:text-red-300 focus:ring-red-500'
            : 'border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
      {!error && helperText && (
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{helperText}</p>
      )}
    </div>
  );
};
