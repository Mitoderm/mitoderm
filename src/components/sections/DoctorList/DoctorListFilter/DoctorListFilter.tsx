import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { DoctorType } from '@/types';
import styles from './DoctorListFilter.module.scss';
import Image from 'next/image';
import AuthButton from '../AuthButton/AuthButton';
import { useSession } from 'next-auth/react';
import { initialState } from '../DoctorList/DoctorList';

type AreaType = 'צפון' | 'מרכז' | 'דרום' | 'all';
type ProfessionType = '1' | '2' | '3' | 'all';

interface Props {
  doctors: DoctorType[];
  setFilteredList: Dispatch<SetStateAction<DoctorType[]>>;
  setIsAuthFormOpen: Dispatch<SetStateAction<boolean>>;
  setIsDoctorFormOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentDoctor: Dispatch<SetStateAction<DoctorType>>;
}

const DoctorListFilter: FC<Props> = ({
  doctors,
  setFilteredList,
  setIsAuthFormOpen,
  setIsDoctorFormOpen,
  setCurrentDoctor,
}) => {
  const [areaFilter, setAreaFilter] = useState<AreaType>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [professionFilter, setProfessionFilter] =
    useState<ProfessionType>('all');
  const session = useSession();
  const loggedIn = session.status === 'authenticated';
  const cities = Array.from(
    new Set(
      doctors.filter((el) => el.city && el.city.length > 0).map((el) => el.city)
    )
  );

  const handleOpen = () => {
    setCurrentDoctor(initialState);
    setIsDoctorFormOpen(true);
  };

  const handleReset = () => {
    setAreaFilter('all');
    setCityFilter('all');
    setProfessionFilter('all');
  };

  useEffect(() => {
    let result = doctors;

    if (areaFilter !== 'all') {
      result = result.filter((el) => el.area === areaFilter);
    }

    if (cityFilter !== 'all') {
      result = result.filter((el) => el.city === cityFilter);
    }

    if (professionFilter !== 'all') {
      result = result.filter(
        (el) => el.profession === professionFilter || el.profession === '3'
      );
    }

    setFilteredList(result);
  }, [areaFilter, cityFilter, professionFilter, doctors]);

  return (
    <div className={styles.container}>
      <select
        onChange={(e) => setAreaFilter(e.target.value as AreaType)}
        value={areaFilter}
        name="area-select"
        id="area-select"
      >
        <option value="" disabled>
          Select area
        </option>
        <option value="צפון">North</option>
        <option value="מרכז">Center</option>
        <option value="דרום">South</option>
        <option value="all">All</option>
      </select>
      <select
        onChange={(e) => setProfessionFilter(e.target.value as ProfessionType)}
        value={professionFilter}
        name="profession-select"
        id="profession-select"
      >
        <option value="" disabled>
          Filter by Expertise
        </option>
        <option value="1">Facial treatments</option>
        <option value="2">Hair treatments</option>
        <option value="3">Facial & Hair Treatments</option>
        <option value="all">All</option>
      </select>
      <select
        onChange={(e) => setCityFilter(e.target.value as string)}
        value={cityFilter}
        name="city-select"
        id="city-select"
      >
        <option value="" disabled>
          Select city
        </option>
        {cities.map((el: string) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
        <option value="all">All</option>
      </select>
      <button onClick={handleReset} className={styles.resetButton}>
        <Image
          src="/images/icons/reset.svg"
          width={25}
          height={25}
          alt="round arrow icon"
        />
      </button>
      {loggedIn ? (
        <button className={styles.addButton} onClick={handleOpen}>
          <Image
            src="/images/icons/plus.svg"
            width={25}
            height={25}
            alt="plus icon"
          />
        </button>
      ) : null}
      <AuthButton setIsAuthFormOpen={setIsAuthFormOpen} />
    </div>
  );
};

export default DoctorListFilter;
