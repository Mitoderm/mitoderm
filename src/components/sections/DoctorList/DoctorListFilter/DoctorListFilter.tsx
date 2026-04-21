import { FC } from 'react';
import { DoctorType } from '@/types';
import styles from './DoctorListFilter.module.scss';
import Image from 'next/image';
import { AreaType, ProfessionType } from '../DoctorList/DoctorList';
import { useTranslations, useLocale } from 'next-intl';

interface Props {
  doctors: DoctorType[];
  areaFilter: AreaType;
  cityFilter: string;
  professionFilter: ProfessionType;
  setAreaFilter: (area: AreaType) => void;
  setCityFilter: (city: string) => void;
  setProfessionFilter: (profession: ProfessionType) => void;
  resetFilters: () => void;
}

const DoctorListFilter: FC<Props> = ({
  doctors,
  areaFilter,
  cityFilter,
  professionFilter,
  setAreaFilter,
  setCityFilter,
  setProfessionFilter,
  resetFilters,
}) => {
  const t = useTranslations();
  const locale = useLocale();

  const cities = Array.from(
    new Set(
      doctors
        .filter((el) => el.city && el.city.length > 0)
        .map((el) => el.city),
    ),
  );

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="profession-select">
        {t('doctorList.filters.filterByExpertise')}
        <select
          onChange={(e) =>
            setProfessionFilter(e.target.value as ProfessionType)
          }
          value={professionFilter}
          name="profession-select"
          id="profession-select"
          className={styles.select}
        >
          <option value="" disabled>
            {t('doctorList.filters.filterByExpertise')}
          </option>
          <option value="1">{t('doctorList.filters.facialTreatments')}</option>
          <option value="2">{t('doctorList.filters.hairTreatments')}</option>
          <option value="3">
            {t('doctorList.filters.facialAndHairTreatments')}
          </option>
          <option value="all">{t('doctorList.filters.all')}</option>
        </select>
      </label>
      <label className={styles.label} htmlFor="area-select">
        {t('doctorList.filters.selectArea')}
        <select
          onChange={(e) => setAreaFilter(e.target.value as AreaType)}
          value={areaFilter}
          name="area-select"
          id="area-select"
          className={styles.select}
        >
          <option value="" disabled>
            {t('doctorList.filters.selectArea')}
          </option>
          <option value="צפון">{t('doctorList.filters.north')}</option>
          <option value="מרכז">{t('doctorList.filters.center')}</option>
          <option value="דרום">{t('doctorList.filters.south')}</option>
          <option value="גוש דן">{t('doctorList.filters.gushDan')}</option>
          <option value="all">{t('doctorList.filters.all')}</option>
        </select>
      </label>
      <label className={styles.label} htmlFor="city-select">
        {t('doctorList.filters.selectCity')}
        <select
          onChange={(e) => setCityFilter(e.target.value as string)}
          value={cityFilter}
          name="city-select"
          id="city-select"
          disabled={areaFilter === 'all'}
          className={styles.select}
        >
          <option value="" disabled>
            {t('doctorList.filters.selectCity')}
          </option>
          {cities.map((el: string) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
          <option value="all">{t('doctorList.filters.all')}</option>
        </select>
      </label>
      <button
        onClick={resetFilters}
        className={`${styles.resetButton} ${locale === 'he' ? styles.rtl : ''}`}
      >
        <span>{t('doctorList.filters.resetAllFilters')}</span>
        <Image
          src="/images/icons/filterReset.svg"
          width={20}
          height={20}
          alt="round arrow icon"
        />
      </button>
    </div>
  );
};

export default DoctorListFilter;
