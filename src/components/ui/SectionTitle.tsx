'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  number?: string;
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  center?: boolean;
  className?: string;
}

export function SectionTitle({
  number,
  eyebrow,
  title,
  highlight,
  description,
  center = false,
  className,
}: SectionTitleProps) {
  const titleParts = highlight ? title.split(highlight) : [title];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn('mb-12', center && 'text-center', className)}
    >
      {(number || eyebrow) && (
        <div className={cn('flex items-center gap-3 mb-4', center && 'justify-center')}>
          {number && (
            <span className="section-number">{number} —</span>
          )}
          {eyebrow && (
            <span className="section-number">{eyebrow}</span>
          )}
        </div>
      )}

      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
        {titleParts[0]}
        {highlight && (
          <span className="google-gradient-text">{highlight}</span>
        )}
        {titleParts[1]}
      </h2>

      {description && (
        <p className="mt-4 text-white/50 text-base md:text-lg max-w-2xl leading-relaxed font-light"
           style={{ marginLeft: center ? 'auto' : undefined, marginRight: center ? 'auto' : undefined }}>
          {description}
        </p>
      )}

      <div className={cn('mt-4 h-px w-16 bg-gradient-to-r from-g-blue to-g-green', center && 'mx-auto')} />
    </motion.div>
  );
}
