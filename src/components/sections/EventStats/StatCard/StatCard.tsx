import { FC, useState, useEffect, useRef } from 'react';
import styles from './StatCard.module.scss';
import { StatItem } from '@/types';
import { motion, useInView } from 'motion/react';
import Image from 'next/image';
import useHydratedMediaQuery from '@/hooks/useHydratedMediaQuery';

interface Props {
  stat: StatItem;
  delay: number;
  label: string;
}

const StatCard: FC<Props> = ({ stat, delay, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const isTabletOrMobile = useHydratedMediaQuery({ query: '(max-width: 1224px)' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(stat.value * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(stat.value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={isTabletOrMobile ? undefined : { y: -10, scale: 1.03 }}
      className={styles.card}
    >
      <div className={styles.hoverBg} />
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, type: 'spring', stiffness: 200 }}
        className={styles.iconWrap}
      >
        <Image
          className={styles.cardIcon}
          src={`/images/icons/${stat.icon}`}
          alt="stat icon"
          width={48}
          height={48}
        />
      </motion.div>
      <div className={styles.value}>
        {count}
        <span className={styles.suffix}>{stat.suffix}</span>
      </div>
      <div className={styles.label}>{label}</div>
    </motion.div>
  );
};

export default StatCard;
