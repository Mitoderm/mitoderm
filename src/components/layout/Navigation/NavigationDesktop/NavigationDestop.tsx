import { FC } from 'react';
import styles from './NavigationDesktop.module.scss';
import { NavItem } from '@/types';
import NavigationProductButton from '../NavigationProductButton/NavigationProductButton';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { randomString } from '@/utils/helpers';

interface Props {
  navList: NavItem[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFormPage?: boolean;
  isSuccessPage?: boolean;
  isDoctorPage?: boolean;
}
const NavigationDestop: FC<Props> = ({
  navList,
  setIsOpen,
  isFormPage,
  isSuccessPage,
  isDoctorPage,
}) => {
  const t = useTranslations();

  return (
    <nav
      className={`${styles.navigation} ${
        isFormPage || isSuccessPage ? styles.formPage : ''
      } ${isDoctorPage ? styles.doctorPage : ''}`}
    >
      <NavigationProductButton />
      {navList.map((item: NavItem, index: number) => (
        <div
          className={styles.linkContainer}
          key={`item${index + randomString()}`}
        >
          {!item.scrollId && !item.url ? (
            <button
              onClick={() => setIsOpen(false)}
              key={index + randomString()}
              className={styles.button}
            >
              {t(item.text)}
            </button>
          ) : (
            <Link
              href={item.url ? item.url : `#${item.scrollId}`}
              key={index + randomString()}
              className={styles.button}
            >
              {t(item.text)}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default NavigationDestop;
