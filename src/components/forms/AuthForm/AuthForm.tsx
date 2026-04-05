'use client';

import { useState, FC, Dispatch, SetStateAction, useEffect } from 'react';
import styles from './AuthForm.module.scss';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FormCloseButton from '@/components/forms/FormCloseButton/FormCloseButton';
import Button from '@/components/sharedUI/Button/Button';

interface AuthFormProps {
  setIsAuthFormOpen: Dispatch<SetStateAction<boolean>>;
}

const AuthForm: FC<AuthFormProps> = ({ setIsAuthFormOpen }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      // const result = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, password }),
      // }).then((res) => res.json());

      setLoading(false);

      if (result?.error) {
        setError(result.error);
      } else {
        router.refresh();
        setIsAuthFormOpen(false);
      }
    } catch (err: any) {
      setLoading(false);
      setError('Login failed');
    }
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (error) console.log(error);
    timeout = setTimeout(() => {
      setError(null);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.overlay} />
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="auth_email"
          id="auth_email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className=""
        />
        <input
          name="auth_password"
          id="auth_password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className=""
        />
        {/* <button type="submit" disabled={loading} className="">
          {loading ? 'Logging in...' : 'Login'}
        </button> */}
        {error && <p className={styles.error}>{error}</p>}
        <Button
          submit
          disabled={loading}
          style={{ width: 300, marginTop: 30 }}
          text={loading ? 'Logging in...' : 'Login'}
        />
        <FormCloseButton onClick={setIsAuthFormOpen} />
      </form>
    </div>
  );
};

export default AuthForm;
