import { useNavigate } from 'react-router-dom';
import { useGetLogInUserMutation } from 'components/ApiService/UserApi';
import { setToken, setLoggedIn } from 'redux/auth-slice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function LoginPage() {
  const navigate = useNavigate();
  const [getLogInUser] = useGetLogInUserMutation();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'password':
        setPassword(value.trim());
        break;
      case 'email':
        setEmail(value);
        break;
      default:
        return;
    }
  };

  const reset = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { data, error } = await getLogInUser({ email, password });
    if (data) {
      await dispatch(setToken(data?.token));
      await dispatch(setLoggedIn());
      await navigate('/contacts', {
        replace: true,
      });
    }
    if (error) {
      alert('Не правильный пароль или логин!');
    }
    reset();
  };

  return (
    <>
      <h1>LoginPage </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          email
          <input
            // className={s.formInput}
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            // title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label htmlFor="password">
          password
          <input
            // className={s.formInput}
            type="text"
            name="password"
            value={password}
            onChange={handleChange}
            //  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            //  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <button type="submit">Войти</button>
      </form>
    </>
  );
}
