import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetRegisterUserMutation } from 'ApiService/UserApi';
import { setToken, setLoggedIn } from 'redux/auth-slice';
import { toast } from 'react-toastify';
import s from './RegisterForm.module.css';
export const RegisterForm = () => {
  const [GetRegisterUser] = useGetRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const { name, password, email } = values;
      if (![name, password, email].every(Boolean)) return;

      try {
        const {
          data: { token },
        } = await GetRegisterUser(values);
        await dispatch(setToken(token));
        await dispatch(setLoggedIn());
        await navigate('/contacts', {
          replace: true,
        });
        toast.success(`New user - "${name} registered `);
      } catch (err) {
        toast.error(`
Registration error`);
      }
      resetForm({});
    },
  });

  return (
    <>
      <form className={s.registerForm} onSubmit={formik.handleSubmit}>
        <label className={s.registerLabel} htmlFor="Name">
          {' '}
          Name
        </label>
        <input
          className={s.registerInput}
          id="Name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          required
        />
        <label className={s.registerLabel} htmlFor="email">
          Email Address
        </label>
        <input
          className={s.registerInput}
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          required
        />

        <label className={s.registerLabel} htmlFor="Password">
          Password
        </label>
        <input
          className={s.registerInput}
          id="Password"
          name="password"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.password}
          required
        />

        <button type="submit">Зарегистрироваться</button>
      </form>
    </>
  );
};
