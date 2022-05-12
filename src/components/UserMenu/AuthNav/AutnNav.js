import { NavLink } from 'react-router-dom';
export default function AuthNav() {
  return (
    <>
      <NavLink
        to="/register"
        // className={({ isActive }) => (isActive ? s.active : s.link)}
      >
        Register
      </NavLink>
      <NavLink
        to="/login"
        // className={({ isActive }) => (isActive ? s.active : s.link)}
      >
        Login in
      </NavLink>
    </>
  );
}
