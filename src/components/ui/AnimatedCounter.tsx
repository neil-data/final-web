'use client';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import CountUp from 'react-countup';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  color?: 'blue' | 'red' | 'green' | 'yellow';
  className?: string;
}

const colorMap = {
  blue: 'text-g-blue',
  red: 'text-g-red',
  green: 'text-g-green',
  yellow: 'text-g-yellow',
};

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  color = 'blue',
  className,
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={cn('flex flex-col items-center', className)}>
      <div className={cn('stat-number text-4xl md:text-5xl lg:text-6xl font-bold', colorMap[color])}>
        {prefix}
        {isInView ? (
          <CountUp end={value} duration={2.5} separator="," />
        ) : (
          '0'
        )}
        {suffix}
      </div>
      <div className="mt-2 text-white/40 text-sm font-mono uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
