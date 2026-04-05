'use client';

import { FC } from 'react';
import styles from './EventStats.module.scss';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import StatCard from './StatCard/StatCard';
import { stats } from '@/constants';

const EventStats: FC = () => {
  const t = useTranslations('stats');
  return (
    <section className={styles.stats}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.sectionHead}
        >
          <h2>{t('heading')}</h2>
          <p>{t('subtitle')}</p>
        </motion.div>

        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              stat={stat}
              delay={i * 0.1}
              label={t(stat.labelKey)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventStats;
