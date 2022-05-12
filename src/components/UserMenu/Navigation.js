import { NavLink, Outlet } from 'react-router-dom';
import AuthNav from './AuthNav/AutnNav';
import UserMenu from './UserMenu';
import s from './Navigation.module.css';
import { useSelector } from 'react-redux';

export default function Navigation() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <>
      <header>
        <nav className={s.list}>
          <NavLink
            exact="true"
            to="/"
            className={({ isActive }) => (isActive ? s.active : s.link)}
          >
            Home
          </NavLink>
          <NavLink
            to="/contacts"
            // className={({ isActive }) => (isActive ? s.active : s.link)}
          >
            Contacts
          </NavLink>
          {!isLoggedIn ? <AuthNav /> : <UserMenu />}
        </nav>
        <hr color="#321616" />
      </header>
      <Outlet />
    </>
  );
}
