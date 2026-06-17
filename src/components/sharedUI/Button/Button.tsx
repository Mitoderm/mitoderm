'use client';
import { CSSProperties, FC } from 'react';
import styles from './Button.module.scss';
import { useRouter } from '@/i18n/routing';

interface Props {
  text: string;
  style?: CSSProperties;
  submit?: boolean;
  disabled?: boolean;
  onClick?: () => any;
  formPage?: 'main' | 'event';
}

const Button: FC<Props> = ({
  text,
  style,
  submit,
  disabled = false,
  onClick,
  formPage,
}) => {
  const router = useRouter();

  const openForm = (page: 'event' | 'main') => {
    if (page === 'event') router.push(`/form`);
    if (page === 'main') router.push(`/v_tech/form`);
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
      className={`${styles.button} ${disabled ? styles.disabled : ''}`}
    >
      {text}
    </button>
  );
};

export default Button;
