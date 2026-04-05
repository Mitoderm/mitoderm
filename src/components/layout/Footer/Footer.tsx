'use client';
import { FC } from 'react';
import styles from './Footer.module.scss';
import { useTranslations } from 'next-intl';
import useAppStore from '@/store/store';
import { usePathname } from '@/i18n/routing';
import EventFooter from '../EventFooter/EventFooter';

const Footer: FC = () => {
  const { setModalContent, toggleModal } = useAppStore((state) => state);
  const t = useTranslations();
  const pathname = usePathname();
  const isFormPage = pathname.includes('form');
  const isEventPage = pathname.includes('event') && !pathname.includes('form');
  const isAdminPage = pathname.includes('admin');

  const handlePrivacyClick = () => {
    toggleModal(true);
    setModalContent('privatePolicy');
  };

  const handleAccessibilityClick = () => {
    toggleModal(true);
    setModalContent('accessibility');
  };

  return (
    <>
      {isAdminPage ? null : isEventPage ? (
        <EventFooter />
      ) : (
        <footer
          style={isFormPage ? { padding: '30px 0' } : {}}
          className={styles.footer}
        >
          <div className={styles.content}>
            <span className={styles.copyright}>
              {t('footer.copyright') +
                ' ' +
                new Date().getFullYear() +
                ' ' +
                t('footer.copyrightText')}
            </span>
            <div className={styles.textContainer}>
              <span onClick={handleAccessibilityClick} className={styles.item}>
                {t('footer.accessibility')}
              </span>
              <span onClick={handlePrivacyClick} className={styles.item}>
                {t('footer.privacy')}
              </span>
              <span className={styles.item}>{t('footer.group')}</span>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
