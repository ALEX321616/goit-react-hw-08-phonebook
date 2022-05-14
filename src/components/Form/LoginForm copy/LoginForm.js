import { useNavigate } from 'react-router-dom';
import { useGetLogInUserMutation } from 'ApiService/UserApi';
import { setToken, setLoggedIn } from 'redux/auth-slice';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import s from './LoginForm.module.css';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [getLogInUser] = useGetLogInUserMutation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const { email, password } = values;
      if (![email, password].every(Boolean)) return;

      try {
        const {
          data: { token },
        } = await getLogInUser(values);
        await dispatch(setToken(token));
        await dispatch(setLoggedIn());
        await navigate('/contacts', {
          replace: true,
        });
        toast.success(`Добро пожаловать`);
      } catch (err) {
        toast.error(`
Не правильный пароль или логин`);
      }
      resetForm({});
    },
  });

  return (
    <>
      <form className={s.loginForm} onSubmit={formik.handleSubmit}>
        <label className={s.loginLabel} htmlFor="email">
          Email
        </label>
        <input
          className={s.loginInput}
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          required
        />

        <label className={s.loginLabel} htmlFor="Password">
          Password
        </label>
        <input
          className={s.loginInput}
          id="Password"
          name="password"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.password}
          required
        />

        <button type="submit">Войти</button>
      </form>
    </>
  );
};
