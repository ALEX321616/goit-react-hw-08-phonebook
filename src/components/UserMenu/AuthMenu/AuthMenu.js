import { NavLink } from 'react-router-dom';
export default function AuthMenu() {
  return (
    <>
      <NavLink
        to="/contacts"
        // className={({ isActive }) => (isActive ? s.active : s.link)}
      >
        Contacts
      </NavLink>
      ;
    </>
  );
}
