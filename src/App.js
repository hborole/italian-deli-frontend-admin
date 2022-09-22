import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Layout from './pages/Layout';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
