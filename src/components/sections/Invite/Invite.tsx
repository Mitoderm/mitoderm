import { FC } from 'react';
import styles from './Invite.module.scss';
import { useTranslations } from 'next-intl';
import Button from '../../sharedUI/Button/Button';

const Invite: FC = () => {
  const t = useTranslations();
  return (
    <section className={styles.container}>
      <div className={styles.containerInner}>
        <img
          className={styles.image1}
          src='/images/invite1.svg'
          alt='v-tech box'
        />
        <div className={styles.textBox}>
          <h3>
            {t('invite.titleP1')}
            <span>{t('invite.titleP2')}</span>
            {t('invite.titleP3')}
          </h3>
          <p>{t('invite.text')}</p>
          <Button formPage='main' text={t('buttons.contactForPrice')} />
        </div>
        <img
          className={styles.image2}
          src='/images/invite2.svg'
          alt='two v-tech boxes'
        />
      </div>
    </section>
  );
};

export default Invite;
