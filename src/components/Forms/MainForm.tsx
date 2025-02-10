'use client';
import { FC, FormEvent, useState, useEffect, useRef } from 'react';
import styles from './Form.module.scss';
import Image from 'next/image';
import Button from '../Shared/Button/Button';
import { useLocale, useTranslations } from 'next-intl';
import FormInput from './FormInput/FormInput';
import { useMediaQuery } from 'react-responsive';
import type { MainFormDataType, NameTypeEvent, NameTypeMain } from '@/types';
import { sendDataOnMail } from '@/utils/sendEmailData';
import { sendDataToCRM } from '@/utils/sendCRMData';
import Loader from '../Shared/Loader/Loader';
import { usePathname } from 'next/navigation';
import {
  validateName,
  validateEmail,
  validatePhone,
  validateProfession,
} from '@/utils/validateFormFields';

const MainForm: FC = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const isEventPage = pathname.includes('event');
  const locale = useLocale();
  const formRef = useRef<HTMLDivElement>(null);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [formData, setFormData] = useState<MainFormDataType>({
    name: { value: '', isValid: false },
    email: { value: '', isValid: false },
    phone: { value: '', isValid: false },
    profession: { value: '', isValid: false },
  });
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);

  const handleData = (
    data: string,
    name: NameTypeMain | NameTypeEvent,
    isValid: boolean
  ) => {
    setFormData({ ...formData, [name]: { value: data, isValid } });
  };

  const onSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    setIsSending(true);

    Promise.all([
      sendDataOnMail(formData)
        .then()
        .catch((err) => console.log(err)),
      sendDataToCRM(formData)
        .then()
        .catch((err) => console.log(err)),
    ]).then((values: any) => {
      (values[0] || values[1]) && setIsSent(true);
    });
    return;
  };

  const onEnterHit = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      isButtonDisabled ? null : onSubmit();
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', onEnterHit);
    return () => window.removeEventListener('keypress', onEnterHit);
  }, [isButtonDisabled]);

  const validateMainPageForm = () => {
    !formData.email.isValid ||
    !formData.name.isValid ||
    !formData.profession.isValid ||
    !formData.phone.isValid ||
    !isChecked
      ? setIsButtonDisabled(true)
      : setIsButtonDisabled(false);
  };

  useEffect(() => {
    validateMainPageForm();
  }, [formData, isChecked]);

  return (
    <div className={styles.container}>
      <div ref={formRef} className={styles.formContainer}>
        {isSent ? (
          <>
            {isTabletOrMobile ? (
              <span className={styles.isSentTitle}>
                {t('form.sent.mobTitle')}
              </span>
            ) : null}
            <p className={styles.formSubmitted}>
              {t('form.sent.text')}
              <span>{t('form.sent.textColored')}</span>
            </p>
          </>
        ) : isSending ? (
          <Loader />
        ) : (
          <>
            <h2>
              {t('form.titleP1')}
              <br />
              <span>{t('form.titleP2')}</span>
              {t('form.titleP3')}
            </h2>
            <p>{t('form.subtitle')}</p>
            <form
              noValidate
              className={styles.form}
              onSubmit={onSubmit}
              action='submit'
            >
              <FormInput
                label={t('form.placeholderInputName')}
                setFormData={handleData}
                type='text'
                name='name'
                placeholder='Aaron Smith'
                validator={validateName}
              />
              <FormInput
                label={t('form.placeholderEmailName')}
                setFormData={handleData}
                type='email'
                name='email'
                placeholder='mitoderm@mail.com'
                validator={validateEmail}
              />
              <FormInput
                label={t('form.placeholderPhoneName')}
                setFormData={handleData}
                type='tel'
                name='phone'
                placeholder='586 412 924'
                validator={validatePhone}
              />
              <FormInput
                label={t('form.placeholderProfession')}
                setFormData={handleData}
                type='text'
                name='profession'
                placeholder={t('form.placeholderProfession')}
                validator={validateProfession}
              />
              <label
                className={`${styles.checkboxLabel} ${
                  locale === 'he' ? styles.he : ''
                }`}
              >
                {t('form.checkboxLabel')}
                <input
                  checked={isChecked}
                  onChange={() => setIsChecked((state) => !state)}
                  name='approve'
                  type='checkbox'
                  required
                />
                <div className={styles.customCheckbox} />
              </label>
              <Button
                disabled={isButtonDisabled}
                submit
                colored
                text={t(
                  isEventPage
                    ? 'buttons.reserveSeat'
                    : 'buttons.requestCallback'
                )}
              />
              <div
                className={`${styles.row} ${locale === 'he' ? styles.he : ''}`}
              >
                <Image
                  src='/images/lockIcon.svg'
                  width={14}
                  height={14}
                  alt='lock icon'
                />
                <p>{t('form.sharing')}</p>
              </div>
            </form>
          </>
        )}
      </div>
      {isTabletOrMobile ? null : isSent ? null : (
        <div className={styles.formImageContainer}>
          <Image
            className={styles.desktopImage}
            fill
            src='/images/formImage.png'
            alt='background with exosome'
          />
        </div>
      )}
    </div>
  );
};

export default MainForm;
