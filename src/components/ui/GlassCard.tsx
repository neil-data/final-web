'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glowColor?: 'blue' | 'red' | 'green' | 'yellow' | 'none';
  animate?: boolean;
  delay?: number;
}

const glowMap = {
  blue: 'hover:border-g-blue/40 hover:shadow-blue-glow',
  red: 'hover:border-g-red/40 hover:shadow-red-glow',
  green: 'hover:border-g-green/40 hover:shadow-green-glow',
  yellow: 'hover:border-g-yellow/40 hover:shadow-yellow-glow',
  none: '',
};

export function GlassCard({
  children,
  className,
  hover = true,
  glowColor = 'blue',
  animate = true,
  delay = 0,
}: GlassCardProps) {
  const card = (
    <div
      className={cn(
        'glass-card rounded-xl p-6 transition-all duration-300',
        hover && 'hover:-translate-y-1 cursor-default',
        hover && glowColor !== 'none' && glowMap[glowColor],
        className
      )}
    >
      {children}
    </div>
  );

  if (!animate) return card;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {card}
    </motion.div>
  );
}
