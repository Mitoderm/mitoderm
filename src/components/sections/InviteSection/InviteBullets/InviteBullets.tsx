import { FC } from 'react';
import styles from './InviteBullets.module.scss';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { inviteBulletsItemList } from '@/constants';
import Image from 'next/image';

const InviteBullets: FC = () => {
  const t = useTranslations('inviteEventSection');
  const items = inviteBulletsItemList;

  return (
    <div className={styles.grid}>
      {items.map((item, i) => {
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={styles.item}
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
                <Image
                  className={styles.icon}
                  src={item.imagePath}
                  width={24}
                  height={24}
                  alt={item.alt}
                />
              </motion.div>
              <p className={styles.title}>{t(`item${i + 1}.title`)}</p>
              <p className={styles.text}>{t(`item${i + 1}.text`)}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default InviteBullets;
