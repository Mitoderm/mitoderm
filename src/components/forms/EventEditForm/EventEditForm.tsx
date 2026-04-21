import { FC, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import styles from './EventEditForm.module.scss';
import AdminFormSubmitButton from '@/components/Admin/AdminFormSubmitButton/AdminFormSubmitButton';
import { WorkshopVariant, Event } from '@/types';
import { DayPicker } from 'react-day-picker';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface FormData {
  type: WorkshopVariant;
  city: string;
  date: string;
  from: string;
  to: string;
  isAvailable: boolean;
}

interface Props {
  editingProgram: Event | null;
  setEditingProgram: (program: Event | null) => void;
  isOpen: boolean;
  onClose: () => void;
}

const datePickerVariants = {
  hidden: { height: 0, overflow: 'hidden' },
  visible: { height: 'auto' },
  transition: {
    duration: 0.3,
    ease: 'easeInOut',
  },
};

const tomorrow = new Date(new Date().setHours(0, 0, 0, 0));
tomorrow.setDate(tomorrow.getDate() + 1);

const initialFormData: FormData = {
  type: '990',
  city: '',
  date: '',
  from: '',
  to: '',
  isAvailable: true,
};

const EventEditForm: FC<Props> = ({
  editingProgram,
  setEditingProgram,
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const t = useTranslations();
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const router = useRouter();
  const getCategoryText = (category: number | string) => {
    switch (parseInt(category.toString())) {
      case 990:
        return t('stickyBar.workshop');
      case 480:
        return t('stickyBar.hours480');
      case 180:
        return t('stickyBar.hours180');
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
      setErrors({});
      setEditingProgram(null);
      setIsDatePickerOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!editingProgram) {
      setFormData(initialFormData);
      return;
    }

    const [from = '', to = ''] = editingProgram.time.split('-');

    setFormData({
      type: String(editingProgram.category) as WorkshopVariant,
      city: editingProgram.city,
      date: editingProgram.date,
      from,
      to,
      isAvailable: editingProgram.isAvailable,
    });
  }, [editingProgram]);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    const timeToMinutes = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const isValidTimeRange = (from: string, to: string) => {
      return timeToMinutes(from) < timeToMinutes(to);
    };

    if (!formData.city.trim()) {
      newErrors.city = t('admin.cityRequired');
    }

    if (!formData.date.trim()) {
      newErrors.date = t('admin.dateRequired');
    }

    if (!formData.from.trim()) {
      newErrors.from = t('admin.timeRequired');
    } else if (!isValidTimeRange(formData.from, formData.to)) {
      newErrors.from = t('admin.incorrectTimeRange');
      newErrors.to = ' ';
    }

    if (!formData.to.trim()) {
      newErrors.to = t('admin.timeRequired');
    } else if (!isValidTimeRange(formData.from, formData.to)) {
      newErrors.from = t('admin.incorrectTimeRange');
      newErrors.to = ' ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    const timeRange = `${formData.from}-${formData.to}`;

    const response = await fetch('/api/events', {
      method: editingProgram ? 'PUT' : 'POST',
      body: JSON.stringify({
        _id: editingProgram?.id,
        category: formData.type,
        city: formData.city,
        date: formData.date,
        time: timeRange,
        expireAt: formData.date,
      }),
    });
    const data = await response.json();

    setIsSubmitting(false);

    setFormData(initialFormData);

    setEditingProgram(null);

    router.refresh();
    onClose();
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>
          <span>{t('admin.type')}</span>
        </label>
        <select
          value={formData.type}
          onChange={(e) => handleChange('type', e.target.value)}
          className={`${styles.input} ${styles.select} ${errors.type && styles.inputError}`}
        >
          <option value="990">{getCategoryText(990)}</option>
          <option value="180">{getCategoryText(180)}</option>
          <option value="480">{getCategoryText(480)}</option>
        </select>
        {errors.type && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.errorText}
          >
            {errors.type}
          </motion.p>
        )}
      </div>
      <div className={styles.field}>
        <label className={styles.label}>
          <span>{t('admin.city')}</span>
        </label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => handleChange('city', e.target.value)}
          className={`${styles.input} ${errors.city && styles.inputError}`}
          placeholder={t('admin.enterCity')}
        />
        {errors.city && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.errorText}
          >
            {errors.city}
          </motion.p>
        )}
      </div>

      <div className={styles.field}>
        <span className={styles.label}>
          <span>{t('admin.date')}</span>
        </span>
        <span
          id="date"
          onClick={() => setIsDatePickerOpen((state) => !state)}
          className={`${styles.input} ${styles.dateInput} ${errors.date && styles.inputError}`}
        >
          {formData.date.length
            ? new Date(formData.date).toLocaleDateString('he-IL')
            : ''}
        </span>
        <motion.div
          variants={datePickerVariants}
          initial="hidden"
          animate={isDatePickerOpen ? 'visible' : 'hidden'}
        >
          <DayPicker
            disabled={{ before: tomorrow }}
            fixedWeeks
            animate
            mode="single"
            selected={
              formData.date.length ? new Date(formData.date) : undefined
            }
            onSelect={(date) => {
              if (!date) return;

              const formatted =
                date.getFullYear() +
                '-' +
                String(date.getMonth() + 1).padStart(2, '0') +
                '-' +
                String(date.getDate()).padStart(2, '0');
              handleChange('date', formatted);
            }}
            className={styles.dayPicker}
          />
        </motion.div>
        {errors.date && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.errorText}
          >
            {errors.date}
          </motion.p>
        )}
      </div>
      <div className={styles.timeRow}>
        <div className={styles.field}>
          <label htmlFor="from" className={styles.label}>
            <span>{t('admin.from')}</span>
          </label>
          <input
            name="from"
            id="from"
            type="time"
            step={900}
            value={formData.from}
            onChange={(e) => handleChange('from', e.target.value)}
            className={`${styles.input} ${errors.from && styles.inputError}`}
          />
          {errors.from && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.errorText}
            >
              {errors.from}
            </motion.p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="to" className={styles.label}>
            <span>{t('admin.to')}</span>
          </label>
          <input
            name="to"
            id="to"
            type="time"
            step={900}
            value={formData.to}
            onChange={(e) => handleChange('to', e.target.value)}
            className={`${styles.input} ${errors.to && styles.inputError}`}
          />
          {errors.to && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.errorText}
            >
              {errors.to}
            </motion.p>
          )}
        </div>
      </div>

      <AdminFormSubmitButton
        isSubmitting={isSubmitting}
        isEditing={!!editingProgram}
      />
    </form>
  );
};

export default EventEditForm;
