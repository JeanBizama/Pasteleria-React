import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import ProductosPage from './pages/ProductosPage';
import ProductoPage from './pages/ProductoPage';
import ContactoPage from './pages/ContactoPage';
import NosotrosPage from './pages/NosotrosPage';
import BlogsPage from './pages/BlogsPage';
import RegistroPage from './pages/RegistroPage';
import LoginPage from './pages/LoginPage';
import CarritoPage from './pages/CarritoPage';
import PerfilPage from './pages/PerfilPage';
import RecuperarPage from './pages/RecuperarPage';
import AdminPage from './pages/AdminPage';
import './styles/style.css';
import { useAuth } from './context/AuthContext';

function App(){

  const { isAuthChecking } = useAuth();

    if (isAuthChecking) {
        return (
            <div style={{ padding: '50px', textAlign: 'center' }}>
                Cargando sesión... Por favor, espera.
            </div>
        );
    }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage/>} />
        <Route path="/productos" element={<ProductosPage/>} />
        <Route path="/producto/:id" element={<ProductoPage/>} />
        <Route path="/contacto" element={<ContactoPage/>} />
        <Route path="/nosotros" element={<NosotrosPage/>} />
        <Route path="/blogs" element={<BlogsPage/>} />
        <Route path="/registro" element={<RegistroPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/carrito" element={<CarritoPage/>} />
        <Route path="/perfil" element={<PerfilPage/>} />
        <Route path="/recuperar" element={<RecuperarPage/>} />
  <Route path="/admin" element={<AdminPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
