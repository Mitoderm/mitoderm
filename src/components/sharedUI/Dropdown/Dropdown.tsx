'use client';
import { FC, useState } from 'react';
import styles from './Dropdown.module.scss';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FaqItemProps, CenterItemData } from '@/types';
import { usePathname } from '@/i18n/routing';

interface Props {
  data: FaqItemProps | CenterItemData[];
}

const isFaqItem = (
  data: FaqItemProps | CenterItemData[]
): data is FaqItemProps => {
  return (data as FaqItemProps).item !== undefined;
};

const Dropdown: FC<Props> = ({ data }) => {
  const pathname = usePathname();
  const isEventPage = pathname.includes('event');
  const t = useTranslations();
  const [isShown, setIsShown] = useState<boolean>(false);
  return (
    <div
      className={`${styles.container} ${isEventPage && styles.whiteBG}`}
      onClick={() => setIsShown((state) => !state)}
    >
      <div className={styles.label}>
        <Image
          className={`${styles.image} ${isShown ? styles.active : ''}`}
          src='/images/arrowDown.svg'
          alt='arrow icon'
          width={26}
          height={15}
        />
        {isFaqItem(data) ? (
          <span className={styles.title}>
            {data.time ? (
              <span className={styles.time}>{t(`${data.item}.time`)}</span>
            ) : null}
            {t(`${data.item}.title`)}
          </span>
        ) : (
          <span className={styles.title}> {t('faq.center')}</span>
        )}
      </div>
      {isShown && isFaqItem(data) ? (
        <p className={styles.text}>{t(`${data.item}.text`)}</p>
      ) : null}
      {isShown && !isFaqItem(data)
        ? data.map((item: CenterItemData) => (
            <div className={styles.centerDataRow}>
              <div className={styles.centerDataColumn}>
                <span>{t('faq.name')}</span>
                <span>{t(`${item.name}`)}</span>
              </div>
              <div className={styles.centerDataColumn}>
                <span>{t('faq.city')}</span>
                <span>{t(`${item.city}`)}</span>
              </div>
              <div className={styles.centerDataColumn}>
                <span>{t('faq.contact')}</span>
                <span>{t(`${item.contact}`)}</span>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default Dropdown;
