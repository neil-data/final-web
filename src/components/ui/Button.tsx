'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  skewed?: boolean;
  isLoading?: boolean;
  as?: 'button' | 'a';
  href?: string;
}

const variants = {
  primary: 'bg-g-blue text-white border border-g-blue hover:bg-g-blue/80',
  secondary: 'bg-transparent text-white border border-white/20 hover:border-g-blue/60 hover:bg-g-blue/10',
  ghost: 'bg-transparent text-white/70 border border-transparent hover:text-white hover:bg-white/5',
  danger: 'bg-g-red text-white border border-g-red hover:bg-g-red/80',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-sm',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  skewed = false,
  isLoading = false,
  className,
  as: Tag = 'button',
  href,
  ...props
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center gap-2 rounded font-mono uppercase tracking-widest',
    'transition-all duration-200 cursor-pointer select-none',
    variants[variant],
    sizes[size],
    skewed && 'btn-skew',
    className
  );

  const content = skewed ? <span>{isLoading ? 'Loading...' : children}</span> : (isLoading ? 'Loading...' : children);

  if (Tag === 'a') {
    return (
      <motion.a
        href={href}
        className={base}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={base}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...(props as Record<string, unknown>)}
    >
      {content}
    </motion.button>
  );
}
