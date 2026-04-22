'use client';

import { FC } from 'react';
import styles from './DoctorListPagination.module.scss';
import { useTranslations } from 'next-intl';
import { useMediaQuery } from 'react-responsive';

type Props = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const DoctorListPagination: FC<Props> = ({
  currentPage,
  totalPages,
  onChange,
}) => {
  const t = useTranslations();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const handlePrev = () => {
    if (currentPage > 1) onChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onChange(currentPage + 1);
  };

  const generatePages = () => {
    if (totalPages <= 1) return [1];

    const pages: (number | string)[] = [];
    const delta = isMobile ? 0 : 1;

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);

    if (left > 2) pages.push('left-ellipsis');

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) pages.push('right-ellipsis');

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className={styles.container}>
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={styles.button}
      >
        {isMobile ? '<' : t('doctorList.pagination.previous')}
      </button>

      {generatePages().map((page) =>
        typeof page === 'string' ? (
          <span key={page} className={styles.ellipsis}>
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onChange(page)}
            disabled={currentPage === page}
            className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={styles.button}
      >
        {isMobile ? '>' : t('doctorList.pagination.next')}
      </button>
    </div>
  );
};

export default DoctorListPagination;
