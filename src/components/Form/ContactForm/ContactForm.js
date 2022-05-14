import React from 'react';
import { useFormik } from 'formik';
import { useGetAddContactMutation } from '../../../ApiService/UserApi';
// import { toast } from 'react-toastify';
import s from './ContactsForm.module.css';
export const ContactForm = () => {
  const [GetAddContact] = useGetAddContactMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const { name, number } = values;
      if (![name, number].every(Boolean)) return;
      await GetAddContact(values);
      await resetForm({});
    },
  });

  return (
    <form className={s.registerForm} onSubmit={formik.handleSubmit}>
      <label htmlFor="Name">Name</label>
      <input
        id="Name"
        name="name"
        type="text"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        onChange={formik.handleChange}
        value={formik.values.name}
        required
      />

      <label htmlFor="Number">Number</label>
      <input
        id="Number"
        name="number"
        type="tel"
        onChange={formik.handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        value={formik.values.number}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};
