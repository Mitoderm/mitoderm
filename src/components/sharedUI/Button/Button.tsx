'use client';
import { CSSProperties, FC } from 'react';
import styles from './Button.module.scss';
import { useRouter } from '@/i18n/routing';

interface Props {
  text: string;
  style?: CSSProperties;
  colored?: boolean;
  submit?: boolean;
  disabled?: boolean;
  onClick?: () => any;
  formPage?: 'main' | 'event';
}

const Button: FC<Props> = ({
  text,
  style,
  colored,
  submit,
  disabled = false,
  onClick,
  formPage,
}) => {
  const router = useRouter();

  const openForm = (page: 'event' | 'main') => {
    if (page === 'event') router.push(`/event/form`);
    if (page === 'main') router.push(`/form`);
  };

  const handleClick = () => {
    formPage ? openForm(formPage) : onClick ? onClick() : null;
  };

  return (
    <button
      type={submit ? 'submit' : 'button'}
      style={style}
      onClick={handleClick}
      disabled={disabled}
      className={`${colored ? styles.buttonColored : styles.button} ${
        disabled ? styles.disabled : ''
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
