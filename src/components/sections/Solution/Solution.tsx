'use client';
import { FC } from 'react';
import styles from './Solution.module.scss';
import { useLocale, useTranslations } from 'next-intl';
import Button from '../../sharedUI/Button/Button';
import { solutionItems } from '@/constants';
import { combinedArray } from '@/utils/helpers';
import { SolutionItem as SolutionItemType } from '@/types';
import SolutionItem from './SolutionItem/SolutionItem';
// import ArrowButton from '../Shared/ArrowButton/ArrowButton';
// import MobileButtons from '../Shared/MobileButtons/MobileButtons';

const Solution: FC = () => {
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const t = useTranslations();
  const locale = useLocale();
  // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  // const handleScroll = (arg: 1 | 2) => {
  //   setCurrentPage(arg);
  //   const currentScroll = document.getElementById(`block${arg}`);
  //   currentScroll?.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'nearest',
  //     inline: 'center',
  //   });
  // };

  const solutionBlocks = combinedArray(solutionItems);
  return (
    <>
      <section id='solution' className={styles.section}>
        <p className={styles.title}>{t('solution.title')}</p>
        <span className={styles.subtitle}>{t('solution.subtitle')}</span>
        <div className={styles.sliderContainer}>
          {/*
        For now this element is hidden

        {!isTabletOrMobile ? (
          <ArrowButton
            disabled={currentPage === 1}
            colored
            reversed={locale === 'he' ? false : true}
            onClick={() => handleScroll(1)}
          />
        ) : null} */}
          <div className={styles.slider}>
            {solutionBlocks.map((block: SolutionItemType[], index: number) => (
              <div
                id={`block${index + 1}`}
                className={styles.solutionBlock}
                key={index}
              >
                <SolutionItem item={block[0]} withLabel />
                <SolutionItem item={block[1]} />
              </div>
            ))}
          </div>
          {/* 
        For now this element is hidden
        
        {!isTabletOrMobile ? (
          <ArrowButton
            disabled={currentPage === 2}
            colored
            onClick={() => handleScroll(2)}
            reversed={locale === 'he'}
          />
        ) : null} */}
        </div>
        {/* 
      For now this element is hidden

      {isTabletOrMobile ? (
        <MobileButtons
          disabledLeft={currentPage === 1}
          disabledRight={currentPage === 2}
          onClickLeft={() => handleScroll(1)}
          onClickRight={() => handleScroll(2)}
        />
      ) : null} */}
        <Button
          style={{ margin: '40px auto' }}
          colored
          text={t('buttons.contactForPrice')}
          formPage='main'
        />
      </section>
      <section className={styles.solutionLabelsContainer}>
        <div className={styles.discrontLabel}>
          <span dir='ltr' className={styles.discountLabelTitle}>
            1 + 1 = 3
          </span>
          <span>{t('solution.discountLabelText1')}</span>
          <span>{t('solution.discountLabelText2')}</span>
        </div>
        <div className={styles.bundleContainer}>
          <div className={styles.bundleTextContainer}>
            <span className={styles.bundleTitle}>
              {t('solution.bundleTitle')}
            </span>
            <span className={styles.bundleText}>
              {t('solution.bundleText1')}
            </span>
            <span className={styles.bundleText}>
              {t('solution.bundleText2')}
            </span>
          </div>
          <img
            src='/images/solution/solutionVTech.png'
            alt='bundle explanation'
          />
        </div>
        <Button
          style={{ margin: '40px auto' }}
          colored
          text={t('buttons.contactForPrice')}
          formPage='main'
        />
      </section>
    </>
  );
};

export default Solution;
