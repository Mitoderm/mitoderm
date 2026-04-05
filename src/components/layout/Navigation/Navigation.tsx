'use client';
import { FC } from 'react';
import {
  navMainList,
  navEventList,
  navFormList,
  navDoctorList,
} from '@/constants';
import { useMediaQuery } from 'react-responsive';
import { usePathname } from '@/i18n/routing';
import NavigationMobile from './NavigationMobile/NavigationMobile';
import NavigationDestop from './NavigationDesktop/NavigationDestop';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navigation: FC<Props> = ({ isOpen, setIsOpen }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const pathName = usePathname();
  const isFormPage = pathName.includes('form');
  const isSuccessPage = pathName.includes('success');
  const isDoctorPage = pathName.includes('doctors');

  let navList;

  switch (true) {
    case isFormPage || isSuccessPage:
      navList = navFormList;
      break;

    case isDoctorPage:
      navList = navDoctorList;
      break;

    case pathName.includes('event'):
      navList = navEventList;
      break;

    default:
      navList = navMainList;
  }

  return (
    <>
      {isTabletOrMobile ? (
        <NavigationMobile
          navList={navList}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      ) : (
        <NavigationDestop
          navList={navList}
          setIsOpen={setIsOpen}
          isFormPage={isFormPage}
          isSuccessPage={isSuccessPage}
          isDoctorPage={isDoctorPage}
        />
      )}
    </>
  );
};

export default Navigation;
