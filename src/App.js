import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Layout from './pages/Layout';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Signout from './pages/Signout';
import Loading from './pages/Loading';
import './App.scss';
import { getCurrentUser } from './store/auth';
import { useEffect } from 'react';

export default function App() {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const isAuthenticated = async () => {
      await dispatch(getCurrentUser());
    };

    isAuthenticated();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {auth.isAuthenticating && <Route path="*" element={<Loading />} />}
        {!auth.isAuthenticating &&
          (auth.currentUser ? (
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/signout" element={<Signout />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NoPage />} />
            </>
          ))}
      </Routes>
    </BrowserRouter>
  );
}
