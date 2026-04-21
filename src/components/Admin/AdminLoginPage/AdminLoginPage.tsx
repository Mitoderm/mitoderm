'use client';

import { FC, useState } from 'react';
import styles from './AdminLoginPage.module.scss';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const AdminLoginPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      setLoading(false);

      if (result?.error) {
        setError(result.error);
      } else {
        router.refresh();
      }
    } catch (err: any) {
      setLoading(false);
      setError('Login failed');
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.leftPanel}>
        <div>
          <h1 className={styles.brandTitle}>MITODERM</h1>
          <p className={styles.brandTagline}>{t('admin.adminPanel')}</p>
        </div>
        <div>
          <p className={styles.hero}>
            {t('admin.managePrograms')}
            <br />
            {t('admin.content')}
            <br />
            <span className={styles.heroAccent}>{t('admin.inOnePlace')}.</span>
          </p>
        </div>
        <p className={styles.footerNote}>
          &copy; 2026 MitoDerm. All rights reserved.
        </p>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.formWrap}>
          <div className={styles.mobileBrand}>
            <h1 className={styles.mobileTitle}>MITODERM</h1>
            <p className={styles.mobileTagline}>{t('admin.adminPanel')}</p>
          </div>

          <h2 className={styles.welcome}>{t('admin.welcomeBack')}</h2>
          <p className={styles.welcomeSub}>{t('admin.signInToYourAccount')}</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <label className={styles.fieldLabel} htmlFor="admin-email">
                {t('admin.email')}
              </label>
              <div className={styles.inputWrap}>
                <Image
                  src="/images/icons/adminMail.svg"
                  width={16}
                  height={16}
                  alt="admin mail"
                  className={styles.inputIcon}
                  aria-hidden
                />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mitoderm.com"
                  className={styles.input}
                />
              </div>
            </div>

            <div>
              <label className={styles.fieldLabel} htmlFor="admin-password">
                {t('admin.password')}
              </label>
              <div className={styles.inputWrap}>
                <Image
                  src="/images/icons/adminLock.svg"
                  width={16}
                  height={16}
                  alt="admin lock"
                  className={styles.inputIcon}
                  aria-hidden
                />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`${styles.input} ${styles.inputWithToggle}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.togglePw}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <Image
                      src="/images/icons/eye.svg"
                      width={16}
                      height={16}
                      alt="eye off"
                      className={styles.toggleIcon}
                    />
                  ) : (
                    <Image
                      src="/images/icons/eyeOff.svg"
                      width={16}
                      height={16}
                      alt="eye"
                      className={styles.toggleIcon}
                    />
                  )}
                </button>
              </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" disabled={loading} className={styles.submit}>
              {loading ? (
                <div className={styles.spinner} />
              ) : (
                <>
                  {t('admin.signIn')}
                  <Image
                    src="/images/icons/adminArrowRight.svg"
                    width={16}
                    height={16}
                    alt="admin arrow right"
                    className={styles.submitIcon}
                  />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
