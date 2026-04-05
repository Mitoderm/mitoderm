import { FC, ReactNode } from 'react';
import styles from './ModalContentWrapper.module.scss';
import Image from 'next/image';
import useAppStore from '@/store/store';

interface Props {
  children: ReactNode;
}

const ModalContentWrapper: FC<Props> = ({ children }) => {
  const toggleModal = useAppStore((state) => state.toggleModal);

  return (
    <div className={styles.container} role="dialog" aria-modal="true">
      <button onClick={() => toggleModal(false)} className={styles.closeButton}>
        <Image
          src="/images/icons/formCloseButton.svg"
          width={30}
          height={30}
          alt="cross icon"
        />
      </button>
      <div dir="ltr" className={styles.textContainer}>
        {children}
      </div>
    </div>
  );
};

export default ModalContentWrapper;
