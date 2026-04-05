'use client';

import { useRef, useState, useEffect, FC } from 'react';
import styles from './CardSliderMobile.module.scss';
import { courses, variantToIndex, indexToVariant } from '@/constants';
import { motion } from 'motion/react';
import { WorkshopVariant } from '@/types';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

const gradientClasses: Record<string, string> = {
  'from-[#c4a764] to-[#a68a4d]': styles.gradient1,
  'from-[#dfba74] to-[#be800c]': styles.gradient2,
  'from-[#be800c] to-[#9a6600]': styles.gradient3,
};

interface Props {
  onVisibilityChange: (isVisible: boolean) => void;
  selectedVariant: WorkshopVariant;
  onVariantChange: (variant: WorkshopVariant) => void;
}

const CardSliderMobile: FC<Props> = ({ selectedVariant, onVariantChange }) => {
  const [activeIndex, setActiveIndex] = useState<0 | 1 | 2>(0);
  const t = useTranslations('courses');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const selectedCourse = variantToIndex[selectedVariant];

  useEffect(() => {
    scrollToCard(selectedCourse);
  }, [selectedCourse]);

  const scrollToCard = (index: number) => {
    const container = containerRef.current;
    const card = cardRefs.current[index];

    if (!container || !card) return;

    const offset =
      card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;

    container.scrollTo({
      left: offset,
      behavior: 'instant',
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const children = Array.from(container.children);
        let closestIndex = 0;
        let minDistance = Infinity;

        const containerCenter =
          container.getBoundingClientRect().left + container.offsetWidth / 2;

        children.forEach((child, index) => {
          const rect = (child as HTMLElement).getBoundingClientRect();
          const center = rect.left + rect.width / 2;
          const distance = Math.abs(containerCenter - center);

          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        });

        if (closestIndex !== activeIndex) {
          setActiveIndex(closestIndex as 0 | 1 | 2);
          onVariantChange(indexToVariant[closestIndex]);
        }
      }, 50);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [activeIndex]);

  return (
    <div className={styles.wrapper}>
      <div ref={containerRef} className={styles.list}>
        {courses.map((course, index) => {
          const isSelected = selectedCourse === course.id;
          const courseItems = t(`${course.key}.items`).split('|');
          const gradientClass =
            gradientClasses[course.colorKey] || styles.gradient2;
          return (
            <motion.div
              key={course.id}
              animate={{
                scale: isSelected ? 1.02 : 1,
                zIndex: isSelected ? 3 : 2,
              }}
              transition={{
                scale: { duration: 0.3 },
              }}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
            >
              <div className={`${styles.cardOverlay} ${gradientClass}`} />
              <div className={styles.imageWrap}>
                <Image
                  src={course.image}
                  alt={t(`${course.key}.title`)}
                  fill
                  className={styles.image}
                  style={{ objectPosition: 'center 20%' }}
                />
              </div>
              <div className={styles.body}>
                <span className={styles.prefix}>{t('prefix')}</span>
                <div className={styles.prefixLine} />
                <h3 className={styles.title}>{t(`${course.key}.title`)}</h3>
                <p className={styles.subtitle}>{t(`${course.key}.subtitle`)}</p>
                <div className={styles.items}>
                  {courseItems.map((item, i) => (
                    <div key={i} className={styles.item}>
                      <span className={styles.itemDot} />
                      <p className={styles.itemText}>{item}</p>
                    </div>
                  ))}
                </div>

                <Link className={styles.registerBtnLink} href={'#course-dates'}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`${styles.registerBtn} ${selectedCourse === course.id ? gradientClass : ''}`}
                  >
                    {t('register')}
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CardSliderMobile;
