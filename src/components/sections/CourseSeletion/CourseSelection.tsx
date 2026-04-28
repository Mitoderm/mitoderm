'use client';

import { useEffect, useRef, FC } from 'react';
import styles from './CourseSelection.module.scss';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { courses, variantToIndex, indexToVariant } from '@/constants';
import CardSliderMobile from './CardSliderMobile/CardSliderMobile';
import useHydratedMediaQuery from '@/hooks/useHydratedMediaQuery';
import useAppStore from '@/store/store';
import { Link } from '@/i18n/routing';

const gradientClasses: Record<string, string> = {
  'from-[#c4a764] to-[#a68a4d]': styles.gradient1,
  'from-[#dfba74] to-[#be800c]': styles.gradient2,
  'from-[#be800c] to-[#9a6600]': styles.gradient3,
};

const CourseSelection: FC = () => {
  const t = useTranslations('courses');
  const { courseVariant, setCourseVariant, setShowStickyBar } = useAppStore(
    (state) => state,
  );
  const selectedCourse = variantToIndex[courseVariant];
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useHydratedMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (setShowStickyBar) setShowStickyBar(!entry.isIntersecting);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.courses} id="about">
      <div className={styles.bg1} />
      <div className={styles.bg2} />
      <div className={styles.inner}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.headingWrap}
        >
          <h2 className={styles.heading}>{t('heading')}</h2>
          <p className={styles.headingSubtitle}>{t('headingSubtitle')}</p>
        </motion.div>
        {isMobile ? (
          <CardSliderMobile
            selectedVariant={courseVariant}
            onVisibilityChange={setShowStickyBar}
            onVariantChange={setCourseVariant}
          />
        ) : (
          <div className={styles.list}>
            {courses.map((course, index) => {
              const isSelected = selectedCourse === course.id;
              const courseItems = t(`${course.key}.items`).split('|');
              const gradientClass =
                gradientClasses[course.colorKey] || styles.gradient2;
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setCourseVariant(indexToVariant[course.id])}
                  animate={{
                    scale: isSelected ? 1.02 : 1,
                    zIndex: isSelected ? 3 : 2,
                  }}
                  transition={{
                    opacity: { duration: 0.6, delay: index * 0.15 },
                    y: { duration: 0.6, delay: index * 0.15 },
                    scale: { duration: 0.3 },
                    zIndex: { duration: 0 },
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
                    <p className={styles.subtitle}>
                      {t(`${course.key}.subtitle`)}
                    </p>
                    <div className={styles.items}>
                      {courseItems.map((item, i) => (
                        <div key={i} className={styles.item}>
                          <span className={styles.itemDot} />
                          <p className={styles.itemText}>{item}</p>
                        </div>
                      ))}
                    </div>

                    <Link
                      className={styles.registerBtnLink}
                      href={'#course-dates'}
                    >
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
        )}
      </div>
    </section>
  );
};

export default CourseSelection;
