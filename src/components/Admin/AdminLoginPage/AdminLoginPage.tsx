'use client';

import { useState } from 'react';
import styles from './AdminLoginPage.module.scss';
import Image from 'next/image';

export function AdminLoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Enter your email');
      return;
    }
    if (!password.trim()) {
      setError('Enter your password');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className={styles.root}>
      <div className={styles.leftPanel}>
        <div>
          <h1 className={styles.brandTitle}>MITODERM</h1>
          <p className={styles.brandTagline}>Admin Panel</p>
        </div>
        <div>
          <p className={styles.hero}>
            Manage your programs,
            <br />
            content & media
            <br />
            <span className={styles.heroAccent}>in one place.</span>
          </p>
          <div className={styles.stats}>
            {[
              { n: '48', l: 'Content items' },
              { n: '4', l: 'Programs' },
              { n: '3', l: 'Languages' },
            ].map((s) => (
              <div key={s.l}>
                <p className={styles.statValue}>{s.n}</p>
                <p className={styles.statLabel}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className={styles.footerNote}>
          &copy; 2026 MitoDerm. All rights reserved.
        </p>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.formWrap}>
          <div className={styles.mobileBrand}>
            <h1 className={styles.mobileTitle}>MITODERM</h1>
            <p className={styles.mobileTagline}>Admin Panel</p>
          </div>

          <h2 className={styles.welcome}>Welcome back</h2>
          <p className={styles.welcomeSub}>Sign in to your admin account</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <label className={styles.fieldLabel} htmlFor="admin-email">
                Email
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
                Password
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
                      src="/images/icons/eyeOff.svg"
                      width={16}
                      height={16}
                      alt="eye off"
                      className={styles.toggleIcon}
                    />
                  ) : (
                    <Image
                      src="/images/icons/eye.svg"
                      width={16}
                      height={16}
                      alt="eye"
                      className={styles.toggleIcon}
                    />
                  )}
                </button>
              </div>
            </div>

            <div className={styles.rowBetween}>
              <label className={styles.rememberLabel}>
                <input type="checkbox" className={styles.checkbox} />
                <span className={styles.rememberText}>Remember me</span>
              </label>
              <button type="button" className={styles.linkForgot}>
                Forgot password?
              </button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" disabled={loading} className={styles.submit}>
              {loading ? (
                <div className={styles.spinner} />
              ) : (
                <>
                  Sign In{' '}
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
}
