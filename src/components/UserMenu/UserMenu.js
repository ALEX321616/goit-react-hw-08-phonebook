import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from './UserMenu.module.css';
import {
  useGetUserQuery,
  useGetLogOutUserMutation,
} from 'components/ApiService/UserApi';
import { setToken, setLoggedOut } from 'redux/auth-slice';

export default function UserMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user } = useGetUserQuery();
  const [getLogOutUser] = useGetLogOutUserMutation();
  const LogOut = async token => {
    await getLogOutUser(token);
    await dispatch(setToken(''));
    await dispatch(setLoggedOut());
    await navigate('/login', {
      replace: true,
    });
  };

  return (
    <>
      {user && (
        <div className="controlBox">
          <p> Вход выполнен , {user?.name} !</p>
          <button type="button" onClick={LogOut}>
            Выйти
          </button>
        </div>
      )}
    </>
  );
}
