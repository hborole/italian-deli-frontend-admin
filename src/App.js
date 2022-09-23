import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from './store/auth';
import { useEffect } from 'react';

import './App.scss';

import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import NoPage from './pages/NoPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Signout from './pages/Signout';
import Loading from './pages/Loading';

import Customers from './pages/Customers';

import Categories from './pages/Category/Categories';
import CategoryCreate from './pages/Category/CategoryCreate';
import CategoryEdit from './pages/Category/CategoryEdit';

import Products from './pages/Product/Products';
import ProductCreate from './pages/Product/ProductCreate';
import ProductEdit from './pages/Product/ProductEdit';

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
              <Route index element={<Dashboard />} />

              <Route path="/customers" element={<Customers />} />

              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/new" element={<CategoryCreate />} />
              <Route path="/categories/:id/edit" element={<CategoryEdit />} />

              <Route path="/products" element={<Products />} />
              <Route path="/products/new" element={<ProductCreate />} />
              <Route path="/products/:id/edit" element={<ProductEdit />} />

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
