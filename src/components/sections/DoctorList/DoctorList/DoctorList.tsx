'use client';
import { FC, useState, useEffect, useMemo } from 'react';
import styles from './DoctorList.module.scss';
import DoctorItem from '../DoctorItem/DoctorItem';
import { DoctorType } from '@/types';
import DoctorListFilter from '../DoctorListFilter/DoctorListFilter';
import DoctorListPagination from '../DoctorListPagination/DoctorListPagination';
import useHydratedMediaQuery from '@/hooks/useHydratedMediaQuery';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';

export type AreaType = 'צפון' | 'מרכז' | 'דרום' | 'גוש דן' | 'all';
export type ProfessionType = '1' | '2' | '3' | 'all';

interface Props {
  doctors: DoctorType[];
}

const variants = {
  closed: { opacity: 0, height: 0 },
  opened: { opacity: 1, height: 'auto' },
};

export const initialState: DoctorType = {
  _id: '',
  name: '',
  city: '',
  area: 'מרכז',
  profession: '1',
  contact: '',
  instagram: '',
  createdAt: '',
  updatedAt: '',
};

const DoctorList: FC<Props> = ({ doctors }) => {
  const [filterListOpened, setFilterListOpened] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [areaFilter, setAreaFilter] = useState<AreaType>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [professionFilter, setProfessionFilter] =
    useState<ProfessionType>('all');
  const isMobile = useHydratedMediaQuery({ query: '(max-width: 768px)' });
  const t = useTranslations();
  const locale = useLocale();

  const itemsPerPage = isMobile ? 5 : 10;

  const filteredDoctors = useMemo(() => {
    return doctors.filter((el) => {
      if (areaFilter !== 'all' && el.area !== areaFilter) return false;
      if (cityFilter !== 'all' && el.city !== cityFilter) return false;

      if (
        professionFilter !== 'all' &&
        el.profession !== professionFilter &&
        el.profession !== '3'
      )
        return false;

      return true;
    });
  }, [doctors, areaFilter, cityFilter, professionFilter]);

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);

  const paginatedDoctors = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDoctors.slice(start, start + itemsPerPage);
  }, [filteredDoctors, currentPage, itemsPerPage]);

  const resetFilters = () => {
    setAreaFilter('all');
    setCityFilter('all');
    setProfessionFilter('all');
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [areaFilter, cityFilter, professionFilter]);

  return (
    <>
      <span className={styles.title}>{t('faq.centerTitle')}</span>
      <div className={styles.container} id="clinic">
        {isMobile ? (
          <button
            className={`${styles.filterButton} ${locale === 'he' ? styles.rtl : ''}`}
            onClick={() => setFilterListOpened(!filterListOpened)}
          >
            {filterListOpened
              ? t('doctorList.filters.closeFilters')
              : t('doctorList.filters.openFilters')}
            <Image
              src={
                filterListOpened
                  ? '/images/icons/filterListOpened.svg'
                  : '/images/icons/filterListClosed.svg'
              }
              alt="filter"
              width={20}
              height={20}
            />
          </button>
        ) : null}
        {isMobile ? (
          <motion.div
            className={styles.filterList}
            variants={variants}
            initial="closed"
            animate={filterListOpened ? 'opened' : 'closed'}
          >
            <DoctorListFilter
              doctors={filteredDoctors}
              areaFilter={areaFilter}
              cityFilter={cityFilter}
              professionFilter={professionFilter}
              setAreaFilter={setAreaFilter}
              setCityFilter={setCityFilter}
              setProfessionFilter={setProfessionFilter}
              resetFilters={resetFilters}
            />
          </motion.div>
        ) : (
          <DoctorListFilter
            doctors={filteredDoctors}
            areaFilter={areaFilter}
            cityFilter={cityFilter}
            professionFilter={professionFilter}
            setAreaFilter={setAreaFilter}
            setCityFilter={setCityFilter}
            setProfessionFilter={setProfessionFilter}
            resetFilters={resetFilters}
          />
        )}
        {paginatedDoctors.map((el: DoctorType) => (
          <DoctorItem key={el._id} doctor={el} />
        ))}
        <DoctorListPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default DoctorList;
