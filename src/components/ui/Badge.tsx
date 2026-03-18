'use client';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: string;
}

export function Badge({ children, className, variant }: BadgeProps) {
  return (
    <span
      className={cn(
        'badge border',
        variant,
        className
      )}
    >
      {children}
    </span>
  );
}
