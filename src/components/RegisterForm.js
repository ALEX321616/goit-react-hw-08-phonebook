import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetRegisterUserMutation } from 'components/ApiService/UserApi';
import { setToken, setLoggedIn } from 'redux/auth-slice';

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
      try {
        const {
          data: { token },
        } = await GetRegisterUser(values);
        await dispatch(setToken(token));
        await dispatch(setLoggedIn());
        await navigate('/contacts', {
          replace: true,
        });
      } catch (err) {}
      resetForm({});
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="Name"> Name</label>
        <input
          id="Name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <label htmlFor="Password">Password</label>
        <input
          id="Password"
          name="password"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};
