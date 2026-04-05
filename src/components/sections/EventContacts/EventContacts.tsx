'use client';

import { FC } from 'react';
import styles from './EventContacts.module.scss';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';

const EventContacts: FC = () => {
  const t = useTranslations('contact');
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const contactItems = [
    {
      icon: '/images/icons/phone.svg',
      label: t('phoneLabel'),
      value: t('phoneValue'),
    },
    {
      icon: '/images/icons/mapPin.svg',
      label: t('addressLabel'),
      value: t('addressValue'),
    },
    {
      icon: '/images/icons/mail.svg',
      label: t('emailLabel'),
      value: t('emailValue'),
    },
  ];

  const socialLinks = [
    {
      icon: '/images/icons/facebook.svg',
      href: 'https://www.facebook.com/mitoderm',
      label: 'Facebook',
    },
    {
      icon: '/images/icons/instagram.svg',
      href: 'https://www.instagram.com/mitoderm', //www.instagram.com/mitoderm',/',
      label: 'Instagram',
    },
    {
      icon: '/images/icons/tiktok.svg',
      href: 'https://www.tiktok.com/@mitoderm',
      label: 'LinkedIn',
    },
  ];

  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.heading}
        >
          {t('heading')}
        </motion.h2>
        <div className={styles.prefixLine} />
        <div className={styles.grid}>
          {contactItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={isTabletOrMobile ? undefined : { y: -5, scale: 1.02 }}
              className={styles.item}
            >
              <div className={styles.iconWrap}>
                <Image
                  src={item.icon}
                  className={styles.icon}
                  width={24}
                  height={24}
                  alt={item.label}
                />
              </div>
              <p className={styles.label}>{item.label}</p>
              <p className={styles.value}>{item.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className={styles.socialWrap}
        >
          <p className={styles.socialLabel}>{t('follow')}</p>
          <div className={styles.socialLinks}>
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={styles.socialLink}
                aria-label={social.label}
              >
                <Image
                  src={social.icon}
                  className={styles.socialIcon}
                  width={24}
                  height={24}
                  alt={social.label}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventContacts;
