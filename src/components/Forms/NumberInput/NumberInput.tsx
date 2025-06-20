'use client';
import { FC, useEffect } from 'react';
import styles from './NumberInput.module.scss';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import useAppStore from '@/store/store';

const NumberInput: FC = () => {
  const t = useTranslations();
  const { numberOfTickets, setNumberOfTickets } = useAppStore((state) => state);

  const handleChange = (arg: 'inc' | 'dec') => {
    if (arg === 'dec') {
      setNumberOfTickets(numberOfTickets <= 1 ? 1 : numberOfTickets - 1);
    }
    if (arg === 'inc') {
      setNumberOfTickets(numberOfTickets + 1);
    }
  };

  useEffect(() => {
    setNumberOfTickets(1);
  }, []);

  return (
    <div className={styles.container}>
      <span>{t('form.numberTickets')}</span>
      <div className={styles.inputContainer}>
        <button type='button' onClick={() => handleChange('dec')}>
          -
        </button>
        <input type='number' readOnly value={numberOfTickets} min={1} />
        <button type='button' onClick={() => handleChange('inc')}>
          +
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
