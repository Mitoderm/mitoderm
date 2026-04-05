'use client';

import { FC } from 'react';
import styles from './EventExosomes.module.scss';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import useAppStore from '@/store/store';

const EventExosomes: FC = () => {
  const { courseVariant } = useAppStore((state) => state);
  const t = useTranslations();

  const cards = [
    {
      title: t('exosomes.card1Title'),
      body: t('exosomes.card1Body'),
    },
    {
      title: t('exosomes.card2Title'),
      body: t('exosomes.card2Body'),
    },
    {
      title: t('exosomes.card3Title'),
      body: t('exosomes.card3Body'),
    },
  ];

  return (
    <section className={styles.exosomes}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.sectionHead}
        >
          <h2>{t('exosomes.heading')}</h2>
          <p>{t('exosomes.subheading')}</p>
        </motion.div>

        <div className={styles.grid}>
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={styles.card}
            >
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p style={{ lineHeight: 1.625, color: 'rgba(255,255,255,0.9)' }}>
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className={styles.footer}
        >
          {t('exosomes.footer')}
        </motion.p>
      </div>
    </section>
  );
};

export default EventExosomes;
