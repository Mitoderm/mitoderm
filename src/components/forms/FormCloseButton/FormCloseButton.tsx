import { Dispatch, FC, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import styles from './FormCloseButton.module.scss';

interface Props {
  onClick?: Dispatch<SetStateAction<boolean>>;
  style?: React.CSSProperties;
}

const FormCloseButton: FC<Props> = ({ onClick, style }) => {
  const router = useRouter();
  const locale = useLocale();
  const handleGoBack = () => {
    onClick ? onClick(false) : router.back();
  };
  return (
    <button
      style={style}
      onClick={handleGoBack}
      className={`${styles.button} ${locale === 'he' && styles.he}`}
    >
      <img
        src="/images/icons/crossYellow.svg"
        alt="yellow cross icon for button"
      />
    </button>
  );
};

export default FormCloseButton;
