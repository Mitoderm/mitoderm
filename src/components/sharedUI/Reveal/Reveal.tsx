'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Direction = 'left' | 'right' | 'up' | 'none';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  distance?: number;
  direction?: Direction;
  once?: boolean;
}

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  once = true,
  distance = 40,
}: RevealProps) {
  const getInitial = () => {
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -distance };
      case 'right':
        return { opacity: 0, x: distance };
      case 'up':
        return { opacity: 0, y: distance };
      case 'none':
        return { opacity: 0 };
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: 'easeOut',
      }}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
}
