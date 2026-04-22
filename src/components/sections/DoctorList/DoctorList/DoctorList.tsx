'use client';
import { FC, useState, useEffect, useMemo } from 'react';
import styles from './DoctorList.module.scss';
import DoctorItem from '../DoctorItem/DoctorItem';
import { DoctorType } from '@/types';
import DoctorListFilter from '../DoctorListFilter/DoctorListFilter';
import DoctorListPagination from '../DoctorListPagination/DoctorListPagination';
import { useMediaQuery } from 'react-responsive';
import { useTranslations } from 'next-intl';

export type AreaType = 'צפון' | 'מרכז' | 'דרום' | 'גוש דן' | 'all';
export type ProfessionType = '1' | '2' | '3' | 'all';

interface Props {
  doctors: DoctorType[];
}

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [areaFilter, setAreaFilter] = useState<AreaType>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [professionFilter, setProfessionFilter] =
    useState<ProfessionType>('all');
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const t = useTranslations();

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
  }, [filteredDoctors, currentPage]);

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
