'use client';

import { FC } from 'react';
import styles from './EventUnique.module.scss';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import useAppStore from '@/store/store';

const UniqueSection: FC = () => {
  const { courseVariant } = useAppStore((state) => state);
  const t = useTranslations();

  return (
    <section className={styles.unique} id="mission">
      <div className={styles.container}>
        <div className={styles.grid}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={styles.imageCard}
          >
            <div className={styles.imageWrap}>
              <Image
                src="/images/unique.png"
                alt="Golden Beauty"
                fill
                className={styles.image}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={styles.content}
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className={styles.title}
            >
              <span>{t(`v${courseVariant}.unique.title1`)}</span>
              <span className={styles.titleAccent}>
                {t(`v${courseVariant}.unique.titleAccent`)}
              </span>
              <span>{t(`v${courseVariant}.unique.title2`)}</span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={styles.body}
            >
              <span>{t(`v${courseVariant}.unique.body1`)}</span>
              <span className={styles.bodyAccent}>
                {t(`v${courseVariant}.unique.bodyAccent`)}
              </span>
              <span>{t(`v${courseVariant}.unique.bodyEnd`)}</span>
            </motion.p>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={styles.divider}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UniqueSection;
