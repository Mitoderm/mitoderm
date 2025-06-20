import { FC } from 'react';
import styles from './SolutionItem.module.scss';
import { SolutionItem as SolutionItemType } from '@/types';
import { useLocale, useTranslations } from 'next-intl';
import RoundLabel from '@/components/sharedUI/RoundLabel/RoundLabel';

interface Props {
  item: SolutionItemType;
  withLabel?: boolean;
}

function splitArray<T>(arr: T[]): [T[], T[]] {
  const firstHalf = arr.slice(0, 2);
  const secondHalf = arr.slice(2);
  console.log('fitst', firstHalf);
  console.log('second', secondHalf);
  return [firstHalf, secondHalf];
}

const SolutionItem: FC<Props> = ({ item, withLabel }) => {
  const t = useTranslations();
  const locale = useLocale();
  const { column, imageUrl, title, text } = item;
  const bulletsArray = splitArray(text);
  return (
    <div className={styles.container}>
      <img src={imageUrl} alt='medicine image' />
      <p className={styles.title}>{t(title)}</p>
      {!column ? (
        <div className={styles.textContainer}>
          {
            <>
              <div
                className={`${styles.firstColumn} ${
                  locale === 'he' ? styles.he : ''
                }`}
              >
                {bulletsArray[0].map((el: string, i: number) => (
                  <span key={i} className={styles.text}>
                    {t(el)}
                  </span>
                ))}
              </div>
              <div className={styles.secondColumn}>
                {bulletsArray[1].map((el: string, i: number) => (
                  <span key={i} className={styles.text}>
                    {t(el)}
                  </span>
                ))}
              </div>
            </>
          }
        </div>
      ) : (
        text.map((item: string, index: number) => (
          <span key={index} className={styles.text}>
            {t(item)}
          </span>
        ))
      )}
      {withLabel ? <RoundLabel text='+' /> : null}
    </div>
  );
};

export default SolutionItem;
