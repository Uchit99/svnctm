import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`container-svnctm ${className}`}>
      {children}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  bgColor?: 'primary' | 'secondary' | 'tertiary' | 'white';
  noPadding?: boolean;
}

const bgColors = {
  primary: 'bg-svnctm-white-warm',
  secondary: 'bg-svnctm-pink-light',
  tertiary: 'bg-svnctm-lavender',
  white: 'bg-white',
};

export function Section({
  children,
  className = '',
  bgColor = 'white',
  noPadding = false,
}: SectionProps) {
  const paddingClass = noPadding ? '' : 'section-padding';
  
  return (
    <section className={`${bgColors[bgColor]} ${paddingClass} ${className}`}>
      {children}
    </section>
  );
}
