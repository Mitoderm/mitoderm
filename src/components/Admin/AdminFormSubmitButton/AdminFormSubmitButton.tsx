import { FC } from 'react';
import styles from './AdminFormSubmitButton.module.scss';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface Props {
  isSubmitting: boolean;
  isEditing: boolean;
}

const AdminFormSubmitButton: FC<Props> = ({ isSubmitting, isEditing }) => {
  const t = useTranslations();
  return (
    <motion.button
      type="submit"
      disabled={isSubmitting}
      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      className={`${styles.submitBtn} ${isSubmitting && styles.submitBtnDisabled}`}
    >
      {isSubmitting ? (
        <>
          <div className={styles.spinner} />
          <span>{t('admin.sending')}</span>
        </>
      ) : (
        <>
          <span>{isEditing ? t('admin.update') : t('admin.send')}</span>
          <Image
            src="/images/icons/submitAdminPage.svg"
            width={16}
            height={16}
            alt="admin arrow right"
            className={styles.submitIcon}
          />
        </>
      )}
    </motion.button>
  );
};

export default AdminFormSubmitButton;
