import { FC, useState, useEffect } from 'react';
import styles from './DoctorList.module.scss';
import { useSession } from 'next-auth/react';
import DoctorItem from '../DoctorItem/DoctorItem';
import DoctorForm from '../../../forms/DoctorForm/DoctorForm';
import { DoctorType } from '@/types';
import AuthForm from '@/components/forms/AuthForm/AuthForm';
import DoctorListFilter from '../DoctorListFilter/DoctorListFilter';

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
  const session = useSession();
  const [currentDoctor, setCurrentDoctor] = useState<DoctorType>(initialState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAuthFormOpen, setIsAuthFormOpen] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [filteredList, setFilteredList] = useState<DoctorType[]>(doctors);

  useEffect(() => {
    if (session.status === 'authenticated') {
      setLoggedIn(true);
    }
  }, [session]);

  useEffect(() => {
    setFilteredList(doctors);
  }, [doctors]);

  return (
    <div className={styles.container}>
      <DoctorListFilter
        setIsDoctorFormOpen={setIsOpen}
        setCurrentDoctor={setCurrentDoctor}
        doctors={doctors}
        setFilteredList={setFilteredList}
        setIsAuthFormOpen={setIsAuthFormOpen}
      />
      {filteredList.map((el: DoctorType) => (
        <DoctorItem
          loggedIn={loggedIn}
          key={el._id}
          doctor={el}
          setCurrentDoctor={setCurrentDoctor}
          setIsOpen={setIsOpen}
        />
      ))}
      {isOpen && <DoctorForm doctor={currentDoctor} setIsOpen={setIsOpen} />}
      {isAuthFormOpen && <AuthForm setIsAuthFormOpen={setIsAuthFormOpen} />}
    </div>
  );
};

export default DoctorList;
