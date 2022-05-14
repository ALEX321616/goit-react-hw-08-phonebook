import { Route, Routes, Navigate } from 'react-router-dom';
import React, { lazy, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import PrivateRoute from './UserMenu/PrivateRoute';
import { setLoggedIn } from 'redux/auth-slice';
const Navigation = lazy(() => import('./UserMenu/Navigation'));
const HomePage = lazy(() => import('../Pages/HomePage'));
const LoginPage = lazy(() => import('../Pages/LoginPage'));
const RegisterPage = lazy(() => import('../Pages/RegisterPage'));
const ContactsPage = lazy(() => import('../Pages/ContactsPage'));
const NotFoundPage = lazy(() => import('../Pages/NotFoundPage'));

export const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(setLoggedIn());
  }, [dispatch, token]);

  return (
    <>
        <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <Suspense fallback={<p>Loading</p>}>
        <Routes>
          <Route element={<Navigation />}>
            <Route path="/" index element={<HomePage />} />
            <Route
              path="register/"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace={true} />
                ) : (
                  <RegisterPage />
                )
              }
            />
            <Route
              path="contacts/"
              element={
                isLoggedIn ? (
                  <ContactsPage />
                ) : (
                  <Navigate to="/login" replace={true} />
                )
              }
            />
            <Route
              path="login/"
              element={
                !isLoggedIn ? <LoginPage /> : <Navigate to="/" replace={true} />
              }
            />
            <Route path="*" element={ !isLoggedIn ? <NotFoundPage/> : <Navigate to="/contacts" replace={true} />
              } />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
