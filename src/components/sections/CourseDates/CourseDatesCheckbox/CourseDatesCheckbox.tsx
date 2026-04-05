import { FC } from 'react';
import styles from './CourseDatesCheckbox.module.scss';
import Image from 'next/image';

interface Props {
  isSelected: boolean;
  size?: number;
}

const CourseDatesCheckbox: FC<Props> = ({ isSelected, size = 22 }) => {
  return (
    <div
      className={`${styles.checkbox} ${
        isSelected ? styles.checkboxSelected : styles.checkboxUnselected
      }`}
      style={{ width: size, height: size }}
    >
      {isSelected && (
        <Image
          src="/images/icons/courseDateCheck.svg"
          className={styles.checkIcon}
          width={12}
          height={12}
          alt="check icon"
        />
      )}
    </div>
  );
};

export default CourseDatesCheckbox;
