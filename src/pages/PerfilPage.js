import React, { useState, useEffect } from 'react';
import '../styles/style.css';
import '../styles/style_login.css';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

export default function PerfilPage(){
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ username:'', email:'', fechaNacimiento:'', cupon:'', beneficio:'' });

  function formatDateDisplay(value){
    if(!value) return '';
    if(/^\d{4}-\d{2}-\d{2}$/.test(value)){
      const [y,m,d] = value.split('-');
      return `${d}-${m}-${y}`;
    }
    return value;
  }

  useEffect(()=>{
    if (user) setForm({ username: user.username, email: user.email, fechaNacimiento: user.fechaNacimiento, cupon: user.cupon || '', beneficio: user.beneficio || '' });
  }, [user]);

  function onSubmit(e){
    e.preventDefault();
    try{
      const updated = updateProfile({ username: form.username, email: form.email, cupon: form.cupon });
      alert('Datos actualizados con éxito');
      setForm({...form, beneficio: updated.beneficio});
    }catch(err){ alert(err.message); }
  }

  if (!user) return (
    <div>
      <Header />
      <main><div style={{maxWidth:700, margin:'40px auto', padding:20}}>Debes iniciar sesión para acceder al perfil.</div></main>
    </div>
  );

  return (
    <div>
      <Header />

      <main className="login-main-content">
        <div className="login-form-container">
          <form id="FormularioPerfil" method="post" onSubmit={onSubmit}>
            <h1>Perfil</h1>
            <p id="beneficioTexto">{form.beneficio}</p>
            <label htmlFor="usernamePerfil">Nombre de usuario</label>
            <input type="text" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} required />
            <label htmlFor="emailPerfil">Correo electronico</label>
            <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
            <label htmlFor="fechaNacimientoPerfil">Fecha de nacimiento</label>
            <input
              type="text"
              value={formatDateDisplay(form.fechaNacimiento)}
              placeholder="dd-mm-aaaa"
              readOnly
            />
            <label htmlFor="cuponPerfil">Cupon de descuento</label>
            <input type="text" value={form.cupon} onChange={e=>setForm({...form, cupon:e.target.value})} />
            <button className="login-button" type="submit">Guardar cambios</button>
          </form>
        </div>
      </main>
    </div>
  );
}
