import React from 'react';
import { useFormik } from 'formik';
import { useGetAddContactMutation } from './ApiService/UserApi';

export const ContactForm = () => {
  const [GetAddContact] = useGetAddContactMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    onSubmit: async (values, { resetForm }) => {
      await GetAddContact(values);
      await resetForm({});
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="Name"> Name</label>
      <input
        id="Name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
      />

      <label htmlFor="Number">Number</label>
      <input
        id="Number"
        name="number"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.number}
      />

      <button type="submit">Submit</button>
    </form>
  );
};
