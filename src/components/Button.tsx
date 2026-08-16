import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  href,
  type = 'button',
  onClick,
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-brand transition-all duration-300 cursor-pointer';
  
  const variants = {
    primary: 'bg-svnctm-pink text-white hover:opacity-90 disabled:opacity-50',
    secondary: 'bg-transparent border-2 border-svnctm-charcoal text-svnctm-charcoal hover:bg-svnctm-charcoal hover:text-white disabled:opacity-50',
    ghost: 'text-svnctm-charcoal hover:opacity-70 disabled:opacity-50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  const finalClassName = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={finalClassName}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={finalClassName}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
