import React, { useState } from 'react';
import '../styles/style.css';
import '../styles/style_login.css';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage(){
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email:'', password:'' });

  function onSubmit(e){
    e.preventDefault();
    try{
      login(form.email.trim(), form.password);
      alert('Bienvenido');
      navigate('/');
    }catch(err){ alert(err.message); }
  }

  return (
    <div>
      <Header />

      <main className="login-main-content">
        <div className="login-form-container">
          <form onSubmit={onSubmit} id="FormularioInicio">
            <h1>Iniciar sesión</h1>
            <label htmlFor="email">Correo electronico</label>
            <input type="text" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
            <label htmlFor="password">Contraseña</label>
            <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
            <button className="login-button" type="submit">Iniciar sesion</button>

            <p>Olvidaste tu contraseña? <a href="/recuperar">recuperala aqui</a></p>
            <a href="/registro">Registrate aqui</a>
          </form>
        </div>
      </main>
    </div>
  );
}
