'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './Benefit.module.scss';
import useHydratedMediaQuery from '@/hooks/useHydratedMediaQuery';
import useAppStore from '@/store/store';

const Benefit: FC = () => {
  const isTabletOrMobile = useHydratedMediaQuery({ query: '(max-width: 1224px)' });
  const { courseVariant } = useAppStore((state) => state);
  const t = useTranslations();
  const items = t(`v${courseVariant}.benefits`).split('|');
  const icons = [
    <Image
      className={styles.icon}
      src="/images/icons/award.svg"
      width={24}
      height={24}
      alt="award medal icon"
    />,
    <Image
      className={styles.icon}
      src="/images/icons/users.svg"
      width={24}
      height={24}
      alt="users icon"
    />,
    <Image
      className={styles.icon}
      src="/images/icons/trophy.svg"
      width={24}
      height={24}
      alt="trophy icon"
    />,
    <Image
      className={styles.icon}
      src="/images/icons/target.svg"
      width={24}
      height={24}
      alt="target icon"
    />,
    <Image
      className={styles.icon}
      src="/images/icons/zap.svg"
      width={24}
      height={24}
      alt="zap icon"
    />,
  ];
  return (
    <section className={styles.benefits}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.sectionHead}
        >
          <h2>{t('benefits.heading')}</h2>
          <p>{t('benefits.subtitle')}</p>
        </motion.div>

        <div className={styles.grid}>
          {items.map((item, i) => {
            const icon = icons[i % icons.length];
            return (
              <motion.div
                key={i}
                whileTap={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={isTabletOrMobile ? {} : { y: -8, scale: 1.02 }}
                className={`${styles.item} ${isTabletOrMobile ? styles.itemUncolored : ''}`}
              >
                <div className={styles.itemBg}>
                  <div className={styles.itemBgInner} />
                </div>
                <div className={styles.itemContent}>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={styles.iconWrap}
                  >
                    {icon}
                  </motion.div>
                  <p className={styles.text}>{item}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefit;
