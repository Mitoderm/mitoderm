import { FC } from 'react';
import { Event } from '@/types';
import { motion } from 'motion/react';
import styles from './MobileRow.module.scss';
import Image from 'next/image';
import CourseDatesCheckbox from '../CourseDatesCheckbox/CourseDatesCheckbox';

interface Props {
  c: Event;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}
const MobileRow: FC<Props> = ({ c, isSelected, onSelect, index }) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      dir="rtl"
      className={`${styles.mobileRow} ${
        isSelected ? styles.mobileRowSelected : styles.mobileRowDefault
      }`}
    >
      <div className={styles.cityLine}>
        <div className={styles.cityLineLeft}>
          <div
            className={`${styles.pinBoxSm} ${
              isSelected ? styles.pinBoxSelected : styles.pinBoxDefault
            }`}
          >
            <Image
              src="/images/icons/courseDatePin.svg"
              className={styles.pinIconSm}
              width={12}
              height={12}
              alt="pin icon"
            />
          </div>
          <span className={styles.cityNameSm}>{c.city}</span>
        </div>
        <CourseDatesCheckbox isSelected={isSelected} size={20} />
      </div>

      <div className={styles.metaBar}>
        <div className={styles.metaBarInner}>
          <Image
            src="/images/icons/courseDateCalendar.svg"
            className={styles.metaIconSm}
            width={12}
            height={12}
            alt="calendar icon"
          />
          <span className={styles.metaTextSm}>
            {new Date(c.date).toLocaleDateString('he-IL')}
          </span>
        </div>
        <div className={styles.dividerSm} />
        <div className={styles.metaBarInner}>
          {c.time.length ? (
            <>
              <Image
                src="/images/icons/courseDateClock.svg"
                className={styles.metaIconSm}
                width={12}
                height={12}
                alt="clock icon"
              />
              <span className={styles.metaTextSm}>{c.time}</span>
            </>
          ) : null}
        </div>
      </div>
    </motion.button>
  );
};

export default MobileRow;
