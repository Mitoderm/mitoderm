'use client';
import { FC } from 'react';
import styles from './Dot.module.scss';
import useAppStore from '@/store/store';

type DotProps = {
  index: number;
  active?: boolean;
  colored?: boolean;
  gallery?: boolean;
  intro?: boolean;
  handleIntroSwitch?: (page: number, smooth?: boolean) => void;
};

const Dot: FC<DotProps> = ({
  colored,
  index,
  active,
  gallery,
  handleIntroSwitch,
}) => {
  const { galleryPage, setGalleryPage } = useAppStore((state) => state);

  const handleClick = () => {
    handleIntroSwitch && handleIntroSwitch(index, true);
    gallery && setGalleryPage(index);
  };
  return (
    <button
      aria-current={active}
      type="button"
      name="pagination dot"
      aria-label="pagination dot"
      onClick={handleClick}
      className={`${colored ? styles.colored : ''} ${
        active ? styles.dotActive : styles.dot
      } ${gallery && galleryPage === index ? styles.dotActive : styles.dot}`}
    />
  );
};

export default Dot;
