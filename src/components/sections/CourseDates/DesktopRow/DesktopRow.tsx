import { FC } from 'react';
import styles from './DesktopRow.module.scss';
import { Event } from '@/types';
import { motion } from 'motion/react';
import Image from 'next/image';
import CourseDatesCheckbox from '../CourseDatesCheckbox/CourseDatesCheckbox';

interface Props {
  c: Event;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

const DesktopRow: FC<Props> = ({ c, isSelected, onSelect, index }) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onSelect}
      dir="rtl"
      className={`${styles.desktopRow} ${
        isSelected ? styles.desktopRowSelected : styles.desktopRowDefault
      }`}
    >
      <div className={styles.cityBlock}>
        <div
          className={`${styles.pinBox} ${
            isSelected ? styles.pinBoxSelected : styles.pinBoxDefault
          }`}
        >
          <Image
            src="/images/icons/courseDatePin.svg"
            className={styles.pinIcon}
            width={14}
            height={14}
            alt="pin icon"
          />
        </div>
        <span className={styles.cityName}>{c.city}</span>
      </div>

      <div className={styles.divider} />

      <div className={styles.metaRow}>
        <Image
          src="/images/icons/courseDateCalendar.svg"
          className={styles.calendarIcon}
          width={12}
          height={12}
          alt="calendar icon"
        />
        <span className={styles.metaText}>
          {new Date(c.date).toLocaleDateString('he-IL')}
        </span>
      </div>

      <div className={styles.divider} />

      <div className={styles.metaRow}>
        {c.time.length ? (
          <>
            <Image
              src="/images/icons/courseDateClock.svg"
              className={styles.clockIcon}
              width={12}
              height={12}
              alt="clock icon"
            />
            <span className={styles.metaText}>{c.time}</span>
          </>
        ) : null}
      </div>
      <CourseDatesCheckbox isSelected={isSelected} />
    </motion.button>
  );
};

export default DesktopRow;
