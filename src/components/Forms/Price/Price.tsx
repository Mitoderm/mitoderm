import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import styles from './Price.module.scss';
import { useLocale, useTranslations } from 'next-intl';
import useAppStore from '@/store/store';

type ErrorMessageType = 'default' | 'error' | 'success';

const initialErrorStatus: ErrorMessageType = 'default';

interface Props {
  total: string;
  setTotal: Dispatch<SetStateAction<string>>;
}

const Price: FC<Props> = ({ total, setTotal }) => {
  const [value, setValue] = useState<string>('');
  const [errorMessage, setErrorMessage] =
    useState<ErrorMessageType>(initialErrorStatus);
  const t = useTranslations();
  const locale = useLocale();
  const currentPrice = process.env.NEXT_PUBLIC_EVENT_PRICE;
  const { numberOfTickets, isDiscounted, setIsDiscounted } = useAppStore(
    (state) => state
  );

  useEffect(() => {
    setValue('');
    setIsDiscounted(false);
    setErrorMessage(initialErrorStatus);
  }, []);

  const handleClick = () => {
    value === process.env.NEXT_PUBLIC_EVENT_PROMOCODE
      ? setErrorMessage('success')
      : setErrorMessage('error');
  };

  useEffect(() => {
    if (errorMessage !== 'default') {
      errorMessage === 'error' && setIsDiscounted(false);
      errorMessage === 'success' && setIsDiscounted(true);
      const timer = setTimeout(() => setErrorMessage(initialErrorStatus), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    const result = parseInt(currentPrice || '1500');
    setTotal(result.toString());
  }, [numberOfTickets]);

  return (
    <div className={styles.container}>
      <div className={styles.totalBox}>
        <span className={styles.total}>{t('form.total')}</span>
        <span
          className={`${styles.amount} ${locale === 'he' ? styles.he : ''}`}
        >
          <span>&#8362; </span>
          {`${(parseInt(total) * numberOfTickets * (isDiscounted ? 0.9 : 1))
            .toFixed(2)
            .replace('.', ',')}`}
        </span>
      </div>
      <div className={styles.promoBox}>
        <span className={styles.promo}>{t('form.promo')}</span>
        <div className={`${styles.inputBox} ${locale === 'he' && styles.he}`}>
          <input
            name='promo'
            placeholder='Promo432'
            type='text'
            value={value}
            onChange={(e) =>
              setValue(
                e.target.value.length <= 15
                  ? e.target.value
                  : e.target.value.substring(0, 10)
              )
            }
          />
          <button onClick={handleClick} type='button'>
            {t('form.apply')}
          </button>
        </div>
        <span
          className={`${styles.message} ${isDiscounted ? styles.success : ''} ${
            errorMessage === 'default'
              ? ''
              : errorMessage === 'error'
              ? styles.error
              : styles.success
          }`}
        >
          {errorMessage === 'default'
            ? isDiscounted && t('form.success')
            : errorMessage === 'error'
            ? t('form.wrongPromo')
            : t('form.success')}
        </span>
      </div>
    </div>
  );
};

export default Price;
