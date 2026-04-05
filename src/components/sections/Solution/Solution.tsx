'use client';
import { FC } from 'react';
import styles from './Solution.module.scss';
import { useTranslations } from 'next-intl';
import Button from '../../sharedUI/Button/Button';
import { solutionItems } from '@/constants';
import { combinedArray } from '@/utils/helpers';
import { SolutionItem as SolutionItemType } from '@/types';
import SolutionItem from './SolutionItem/SolutionItem';
import SolutionProduct from './SolutionProduct/SolutionProduct';

interface Props {
  page: 'main' | 'hair' | 'gel' | 'signal';
}

const Solution: FC<Props> = ({ page }) => {
  const t = useTranslations();

  const solutionBlocks = combinedArray(solutionItems);
  return (
    <>
      <section id="solution" className={styles.section}>
        <p className={styles.title}>{t(`solution.${page}.title`)}</p>
        {page === 'main' && (
          <span className={styles.subtitle}>
            {t(`solution.${page}.subtitle`)}
          </span>
        )}
        <div className={styles.sliderContainer}>
          <div className={styles.slider}>
            {page === 'main' &&
              solutionBlocks.map((block: SolutionItemType[], index: number) => (
                <div
                  id={`block${index + 1}`}
                  className={styles.solutionBlock}
                  key={index}
                >
                  <SolutionItem item={block[0]} withLabel />
                  <SolutionItem item={block[1]} />
                </div>
              ))}
            {page === 'hair' && <SolutionProduct page="hair" />}
            {page === 'gel' && <SolutionProduct page="gel" />}
            {page === 'signal' && <SolutionProduct page="signal" />}
          </div>
        </div>
        <Button
          style={{ margin: '40px auto' }}
          text={t('buttons.contactForPrice')}
          formPage="main"
        />
      </section>
      <section className={styles.solutionLabelsContainer}>
        <div className={styles.discountLabel}>
          <span className={styles.discountLabelTitle}>
            {t(`solution.${page}.discountTitle`)}
          </span>
          <span>{t(`solution.${page}.discountLabelText1`)}</span>
          <span>{t(`solution.${page}.discountLabelText2`)}</span>
        </div>
        <div
          className={
            page === 'main'
              ? styles.bundleContainer
              : styles.bundleProductContainer
          }
        >
          <div
            className={`${
              page === 'main'
                ? styles.bundleTextContainer
                : styles.bundleProductTextContainer
            } ${page === 'gel' && styles.bundleGelTextContainer}`}
          >
            {page === 'main' ? (
              <>
                <span className={styles.bundleTitle}>
                  {t(`solution.${page}.bundleTitle`)}
                </span>
                <span className={styles.bundleText}>
                  {t(`solution.${page}.bundleText1`)}
                </span>
                <span className={styles.bundleText}>
                  {t(`solution.${page}.bundleText2`)}
                </span>
              </>
            ) : (
              <>
                <span className={styles.bundleTitle}>
                  {t(`solution.${page}.bundleTitle`)}
                </span>
                {page === 'signal' && (
                  <>
                    <span className={styles.bundleProductText}>
                      &bull; {t(`solution.${page}.bundleText1`)}
                    </span>
                    <span className={styles.bundleProductText}>
                      &bull; {t(`solution.${page}.bundleText2`)}
                    </span>
                    <span className={styles.bundleProductText}>
                      &bull; {t(`solution.${page}.bundleText3`)}
                    </span>
                    <span className={styles.bundleProductText}>
                      &bull; {t(`solution.${page}.bundleText4`)}
                    </span>
                  </>
                )}
                {page === 'gel' && (
                  <>
                    <span className={styles.bundleProductText}>
                      {t(`solution.${page}.bundleText1`)}
                    </span>
                    <span className={styles.bundleTitle}>
                      {t(`solution.${page}.bundleText2`)}
                    </span>
                    <span className={styles.bundleProductText}>
                      {t(`solution.${page}.bundleText3`)}
                    </span>
                  </>
                )}
                {page === 'hair' && (
                  <>
                    <span
                      className={`${styles.bundleProductText} ${styles.spray}`}
                    >
                      {t(`solution.${page}.bundleText1`)}
                    </span>
                    <span className={styles.bundleProductText}>
                      {t(`solution.${page}.bundleText2`)}
                    </span>
                  </>
                )}
              </>
            )}
          </div>
          <img src={`/images/solution/${page}.png`} alt="bundle explanation" />
        </div>
        <Button
          style={{ margin: '40px auto' }}
          text={t('buttons.contactForPrice1')}
          formPage="main"
        />
      </section>
    </>
  );
};

export default Solution;
