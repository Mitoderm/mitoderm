'use client';
import { FC, useEffect } from 'react';
import styles from './Modal.module.scss';
import Form from '@/components/Form/Form';
import useAppStore from '@/store/store';
import PrivatePolicy from '@/components/PrivatePolicy/PrivatePolicy';
import Accessibility from '@/components/Accessibility/Accessibility';

const Modal: FC = () => {
  const { modalIsOpen, toggleModal, modalContent } = useAppStore(
    (state) => state
  );
  const handleClose = (e: MouseEvent) => {
    const { target } = e;
    if ((target as HTMLDivElement).id === 'modal') toggleModal(false);
  };

  useEffect(() => {
    modalIsOpen
      ? window.addEventListener('click', handleClose)
      : window.removeEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, [modalIsOpen]);

  return (
    <div className={styles.container}>
      <div
        id='modal'
        className={`${styles.overlay} ${modalIsOpen ? styles.active : ''}`}
      />
      <div
        className={`${styles.content} ${
          modalIsOpen ? styles.contentActive : ''
        }`}
      >
        {modalIsOpen ? (
          modalContent === 'form' ? (
            <Form />
          ) : modalContent === 'privatePolicy' ? (
            <PrivatePolicy />
          ) : (
            <Accessibility />
          )
        ) : null}
      </div>
    </div>
  );
};

export default Modal;
