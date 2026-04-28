import { FC } from 'react';
import styles from './DoctorSocialLink.module.scss';
import Image from 'next/image';

interface Props {
  url: string;
}

const DoctorSocialLink: FC<Props> = ({ url }) => {
  const icon = (() => {
    switch (true) {
      case url.includes('instagram'):
        return '/images/icons/instagram.svg';
      case url.includes('facebook'):
        return '/images/icons/facebook.svg';
      case url.includes('linkedin'):
        return '/images/icons/linkedin.svg';
      case url.includes('tiktok'):
        return '/images/icons/tiktok.svg';
      case url.includes('whatsapp'):
        return '/images/icons/whatsapp.svg';
    }
    return null;
  })();

  return (
    <a href={url} target="_blank">
      {icon ? (
        <Image
          className={styles.icon}
          src={icon}
          alt="social icon"
          width={18}
          height={18}
        />
      ) : null}
    </a>
  );
};

export default DoctorSocialLink;
