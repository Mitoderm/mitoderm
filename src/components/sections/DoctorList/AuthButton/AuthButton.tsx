import { Dispatch, FC, SetStateAction } from 'react';
import styles from './AuthButton.module.scss';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

interface Props {
  setIsAuthFormOpen: Dispatch<SetStateAction<boolean>>;
}

const AuthButton: FC<Props> = ({ setIsAuthFormOpen }) => {
  const session = useSession();
  const loggedIn = session.status === 'authenticated';
  return (
    <button
      onClick={loggedIn ? () => signOut() : () => setIsAuthFormOpen(true)}
      className={styles.authButton}
    >
      <Image
        src={loggedIn ? '/images/icons/logout.svg' : '/images/icons/login.svg'}
        width={25}
        height={25}
        alt="authentication icon"
      />
    </button>
  );
};

export default AuthButton;
