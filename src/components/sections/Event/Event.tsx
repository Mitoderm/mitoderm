import { FC } from 'react';
import styles from './Event.module.scss';
import { useTranslations } from 'next-intl';
import Dropdown from '../../sharedUI/Dropdown/Dropdown';
import Button from '../../sharedUI/Button/Button';

const Event: FC = () => {
  const t = useTranslations();
  return (
    <section id='agenda' className={styles.container}>
      <div className={styles.containerInner}>
        <span className={styles.title}>{t('event.title')}</span>
        <div className={styles.itemBox}>
          <Dropdown data={{ item: 'event.item1', time: true }} />
          <Dropdown data={{ item: 'event.item2', time: true }} />
          <Dropdown data={{ item: 'event.item3', time: true }} />
          <Dropdown data={{ item: 'event.item4', time: true }} />
        </div>
      </div>
      <Button formPage='event' colored text={t('buttons.seat')} />
    </section>
  );
};

export default Event;
