import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  glow = false,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -3, transition: { duration: 0.2, ease: 'easeOut' } } : undefined}
      className={`relative bg-white/90 dark:bg-[#0f1626]/85 backdrop-blur-md border border-neutral-200/80 dark:border-white/10 rounded-2xl transition-all duration-200 ${
        glow ? 'shadow-[0_8px_30px_rgb(99,102,241,0.08)] dark:shadow-[0_8px_30px_rgb(99,102,241,0.12)]' : ''
      } ${
        hoverEffect
          ? 'hover:border-indigo-400/50 dark:hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/5'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
