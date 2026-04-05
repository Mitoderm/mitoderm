'use client';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import styles from './DoctorForm.module.scss';
import { useRouter } from 'next/navigation';
import { DoctorType } from '@/types';
import Button from '@/components/sharedUI/Button/Button';
import FormCloseButton from '../FormCloseButton/FormCloseButton';

interface Props {
  doctor: DoctorType;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DoctorForm: FC<Props> = ({ doctor, setIsOpen }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<DoctorType>(doctor);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    const { _id, ...doctorData } = formData;
    const res = await fetch('/api/doctors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doctorData),
    });
    const data = await res.json();
    data && router.refresh();
  };

  const handleEdit = async () => {
    const res = await fetch('/api/doctors', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    router.refresh();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData._id.length) {
      handleEdit();
    } else handleAdd();
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.overlay} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          id="username"
          name="name"
          type="text"
          placeholder="Full name"
          required
          onChange={handleChange}
          aria-required="true"
          defaultValue={doctor?.name || ''}
        />
        <input
          id="city"
          name="city"
          type="text"
          placeholder="City"
          required
          onChange={handleChange}
          aria-required="true"
          defaultValue={doctor?.city || ''}
        />
        <input
          id="contact"
          name="contact"
          type="tel"
          placeholder="Phone number"
          required
          onChange={handleChange}
          aria-required="true"
          defaultValue={doctor?.contact || ''}
        />
        <select
          id="profession"
          name="profession"
          required
          onChange={handleChange}
          aria-required="true"
          defaultValue={doctor?.profession || '1'}
        >
          <option value="" disabled>
            Select Expertise
          </option>
          <option value="1">Facial treatments</option>
          <option value="2">Hair treatments</option>
          <option value="3">Facial & Hair Treatments</option>
        </select>
        <select
          id="area"
          name="area"
          required
          onChange={handleChange}
          aria-required="true"
        >
          <option value="" disabled>
            Select area
          </option>
          <option value="צפון">North</option>
          <option value="מרכז">Center</option>
          <option value="דרום">South</option>
        </select>
        <input
          id="instagram"
          name="instagram"
          type="text"
          placeholder="Instagram"
          onChange={handleChange}
          aria-required="true"
          defaultValue={doctor?.instagram || ''}
        />
        <Button submit text="Submit" style={{ marginTop: 20, width: 250 }} />
        <FormCloseButton onClick={handleClose} />
      </form>
    </div>
  );
};

export default DoctorForm;
