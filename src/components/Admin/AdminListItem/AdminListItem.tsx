import { FC } from 'react';
import styles from './AdminListItem.module.scss';
import Image from 'next/image';

interface Props {
  children: React.ReactNode;
  onEdit: () => void;
  onDelete: () => void;
}

const AdminListItem: FC<Props> = ({ children, onEdit, onDelete }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeaderRow}>
        <div className={styles.cardBodyMain}>{children}</div>
        <div className={styles.cardActions}>
          <button type="button" className={styles.editButton} onClick={onEdit}>
            <Image
              src="/images/icons/edit.svg"
              className={styles.iconActionButton}
              alt="Edit"
              width={16}
              height={16}
            />
          </button>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={onDelete}
          >
            <Image
              src="/images/icons/delete.svg"
              className={styles.iconActionButton}
              alt="Delete"
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminListItem;
