import { FC } from 'react';
import styles from './EventBulletList.module.scss';
import BulletList from '@/components/sharedUI/BulletsList/BulletList';
import { eventBulletsItemList } from '@/constants';

const EventBulletList: FC = () => {
  return (
    <section className={styles.container}>
      <BulletList data={eventBulletsItemList} />
    </section>
  );
};

export default EventBulletList;
