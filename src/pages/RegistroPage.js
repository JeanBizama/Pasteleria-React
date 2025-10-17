import React, { useState } from 'react';
import '../styles/style.css';
import '../styles/style_login.css';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RegistroPage(){
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email:'', username:'', fechaNacimiento:'', password:'', confirm_password:'', cupon:'' });

  async function onSubmit(e){
    e.preventDefault();
    if (form.password !== form.confirm_password) return alert('Las contraseñas no coinciden');
    const nuevo = { email: form.email, username: form.username, fechaNacimiento: form.fechaNacimiento, password: form.password, cupon: form.cupon };
    register(nuevo);
    alert('Usuario registrado con éxito');
    navigate('/login');
  }

  return (
    <div>
      <Header />

      <main className="login-main-content">
        <div className="login-form-container">
          <form onSubmit={onSubmit} id="FormularioRegistro">
            <h1>Registro</h1>
            <label htmlFor="email">Correo electronico</label>
            <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
            <label htmlFor="username">Nombre</label>
            <input type="text" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} required />
            <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
            <input type="date" value={form.fechaNacimiento} onChange={e=>setForm({...form, fechaNacimiento:e.target.value})} required />
            <label htmlFor="password">Contraseña</label>
            <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
            <label htmlFor="confirm_password">Confimar contraseña</label>
            <input type="password" value={form.confirm_password} onChange={e=>setForm({...form, confirm_password:e.target.value})} required />
            <label htmlFor="cupon">Codigo de descuento (Opcional)</label>
            <input type="text" value={form.cupon} onChange={e=>setForm({...form, cupon:e.target.value})} />
            <button className="login-button" type="submit">Registrarse</button>
            <p>Ya tienes una cuenta? <a href="/login">Inicia aqui</a></p>
          </form>
        </div>
      </main>
    </div>
  );
}
