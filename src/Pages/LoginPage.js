// import { useNavigate } from 'react-router-dom';
// import { useGetLogInUserMutation } from 'ApiService/UserApi';
// import { setToken, setLoggedIn } from 'redux/auth-slice';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { LoginForm } from 'components/Form/LoginForm copy/LoginForm';

export default function LoginPage() {
  // const navigate = useNavigate();
  // const [getLogInUser] = useGetLogInUserMutation();
  // const dispatch = useDispatch();
  // const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');
  // const handleChange = e => {
  //   const { name, value } = e.target;
  //   switch (name) {
  //     case 'password':
  //       setPassword(value.trim());
  //       break;
  //     case 'email':
  //       setEmail(value);
  //       break;
  //     default:
  //       return;
  //   }
  // };
  // const reset = () => {
  //   setEmail('');
  //   setPassword('');
  // };
  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const { data, error } = await getLogInUser({ email, password });
  //   if (data) {
  //     await dispatch(setToken(data?.token));
  //     await dispatch(setLoggedIn());
  //     await navigate('/contacts', {
  //       replace: true,
  //     });
  //   }
  //   if (error) {
  //     alert('Не правильный пароль или логин!');
  //   }
  //   reset();
  // };
  return (
    <>
      <h1>LoginPage </h1>
      <LoginForm />
    </>
  );
}
