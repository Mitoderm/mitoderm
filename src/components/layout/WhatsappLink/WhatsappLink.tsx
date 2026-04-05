'use client';
import { FC } from 'react';
import styles from './WhatsappLink.module.scss';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

interface Props {
  phone?: string;
  customClassName?: string;
}

const WhatsappLink: FC<Props> = ({ phone, customClassName }) => {
  const locale = useLocale();
  const ilonaPhone = '972547621889';
  const pathname = usePathname();

  function normalizePhone(phone: string) {
    return phone.replace(/[-\s]/g, '').replace(/^0/, '972');
  }

  const messages: Record<string, string> = {
    en: phone ? 'Hi' : 'Hello, can I get information about exosomes?',
    he: phone ? 'שלום' : 'שלום, אפשר לקבל מידע לגבי אקסוזומים?',
    ru: phone
      ? 'Здравствуйте'
      : 'Здравствуйте, можно получить информацию об экзосомах?',
  };

  const whatsappUrl = `https://wa.me/${
    phone ? normalizePhone(phone) : ilonaPhone
  }?text=${encodeURIComponent(messages[locale] || messages.en)}`;

  const isAdminPage = pathname.includes('admin');

  return (
    <>
      {isAdminPage ? null : (
        <a
          className={
            customClassName
              ? customClassName
              : `${styles.link} ${locale === 'he' && styles.he} ${styles.class}`
          }
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/icons/whatsappIcon.svg" alt="WhatsApp" />
        </a>
      )}
    </>
  );
};

export default WhatsappLink;
