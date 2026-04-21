import { FC } from 'react';
import Image from 'next/image';
import styles from './AdminAddButton.module.scss';

interface Props {
  onClick: () => void;
  text: string;
}

const AdminAddButton: FC<Props> = ({ onClick, text }) => {
  return (
    <button type="button" className={styles.addButton} onClick={onClick}>
      <Image
        src="/images/icons/plus.svg"
        alt="Add Program"
        width={16}
        height={16}
      />
      {text}
    </button>
  );
};

export default AdminAddButton;
