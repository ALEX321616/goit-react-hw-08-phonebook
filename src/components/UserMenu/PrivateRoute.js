// import { Route, Routes, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// export default function PrivateRoute({ children, ...routeProps }) {
//   const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
//   const navigate = useNavigate();
//   console.log(isLoggedIn);
//   return (
//     <>
//       <Routes>
//         <Route {...routeProps}>
//           {isLoggedIn ? children : navigate('/contacts')}
//         </Route>
//       </Routes>
//     </>
//   );
// }
