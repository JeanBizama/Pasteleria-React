import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/style.css';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Header(){
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  function handleLogout(){
    logout();
    setOpen(false);
    navigate('/');
  }

  useEffect(()=>{
    function onDocClick(e){
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return ()=> document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <header>
      <div className="nav-links">
        <div className="left-header">
          <p>&#9724; Pasteleria Mil Sabores</p>
        </div>
        <div className="middle-header">
          <nav>
            <Link to="/">Inicio</Link>
            <Link to="/productos">Productos</Link>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/blogs">Blogs</Link>
            <Link to="/contacto">Contacto</Link>
          </nav>
        </div>
        <div className="user-header" id="userHeader" style={{display:'flex', alignItems:'center', gap:10}}>
          <Link to="/carrito" className="no-sep" style={{marginRight:8, display:'inline-flex', alignItems:'center', position:'relative'}}>
            <span className="material-symbols-outlined">shopping_cart</span>
            {totalItems() > 0 && <span id="cartBadge" style={{position:'absolute', top:-6, right:-6, background:'#e74c3c', color:'#fff', borderRadius:10, padding:'2px 6px', fontSize:12}}>{totalItems()}</span>}
          </Link>

          {user ? (
            <div style={{position:'relative'}} ref={dropdownRef}>
              <button className="dropdown" onClick={()=>setOpen(o=>!o)}>{`Hola, ${user.username}`} ▼</button>
              {open && (
                <div className="dropdown-content" style={{display:'block'}}>
                  {user.rol === 'admin' ? (
                    <button onClick={()=>{ navigate('/admin'); setOpen(false); }}>Administración</button>
                  ) : (
                    <button onClick={()=>{ navigate('/perfil'); setOpen(false); }}>Perfil</button>
                  )}
                  <button id="logout" onClick={handleLogout}>Cerrar sesión</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">Iniciar sesión</Link> {" | "}
              <Link to="/registro">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
