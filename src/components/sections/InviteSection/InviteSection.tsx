'use client';

import { FC } from 'react';
import { motion } from 'motion/react';
import styles from './InviteSection.module.scss';
import { useTranslations } from 'next-intl';
import type { WorkshopVariant } from '@/types';
import InviteBullets from './InviteBullets/InviteBullets';
import useAppStore from '@/store/store';

interface InviteSectionProps {
  variant: WorkshopVariant;
}

const InviteSection: FC = () => {
  const { courseVariant } = useAppStore((state) => state);
  const t = useTranslations();

  return (
    <section className={styles.invite}>
      <InviteBullets />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={styles.card}
      >
        <div className={styles.bg}>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className={styles.blur1}
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className={styles.blur2}
          />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className={styles.title}
        >
          <span>{t(`v${courseVariant}.invite.title`)}</span>
          <span className={styles.titleAccent}>
            {t(`v${courseVariant}.invite.titleAccent`)}
          </span>
          <span>{t(`v${courseVariant}.invite.titleEnd`)}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className={styles.body}
        >
          <span>{t(`v${courseVariant}.invite.body`)}</span>
          <span className={styles.bodyAccent}>
            {t(`v${courseVariant}.invite.bodyAccent`)}
          </span>
          <span>{t(`v${courseVariant}.invite.bodyEnd`)}</span>
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0, duration: 0.3 }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 20px 50px rgba(252, 211, 132, 0.4)',
          }}
          whileTap={{ scale: 0.95 }}
          href="#contact"
          className={styles.cta}
        >
          <span>{t(`v${courseVariant}.invite.cta`)}</span>
          <span className={styles.ctaIcon}>&#x2B95;</span>
        </motion.a>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className={styles.line}
        />
      </motion.div>
    </section>
  );
};

export default InviteSection;
