import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import '../styles/style.css';
import '../styles/style_login.css';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

export default function PerfilPage(){
  const { user, updateProfile, isLoading } = useAuth();
  const [form, setForm] = useState({ username:'', email:'', fechaNacimiento:'', cupon:'', beneficio:'' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  function formatDateDisplay(value){
    if(!value) return '';
    if(/^\d{4}-\d{2}-\d{2}$/.test(value)){
      const [y,m,d] = value.split('-');
      return `${d}-${m}-${y}`;
    }
    return value;
  }

  useEffect(()=>{
        if (user) {
            setForm({ 
                nombre: user.nombre,
                email: user.email, 
                fechaNacimiento: user.fechaNacimiento,
                cupon: user.cupon || '', 
                beneficio: user.beneficio || '' 
            });
        }
    }, [user]);

async function onSubmit(e){
        e.preventDefault();
        setError(null);
        setSuccess(false);
        try{
            const updatedData = await updateProfile({ 
                nombre: form.nombre, 
                cupon: form.cupon 
            });
            setSuccess(true);
            setForm(prevForm => ({...prevForm, beneficio: updatedData.beneficio})); 
            setTimeout(() => setSuccess(false), 3000);
          }catch(err){ 
          setError(err.message || 'Error al guardar los cambios.'); 
        }
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
                        {success && <Alert variant="success">✅ Datos actualizados con éxito.</Alert>}
                        {error && <Alert variant="danger">❌ {error}</Alert>}
                        <p id="beneficioTexto">{form.beneficio}</p>
                                                <label htmlFor="nombrePerfil">Nombre de usuario</label>
                        <input 
                            type="text" 
                            value={form.nombre}
                            onChange={e=>setForm({...form, nombre:e.target.value})} 
                            required 
                        />
                        
                        <label htmlFor="emailPerfil">Correo electrónico</label>
                        <input 
                            type="email" 
                            value={form.email} 
                            readOnly 
                            disabled 
                        />     
                        <label htmlFor="fechaNacimientoPerfil">Fecha de nacimiento</label>
                        <input
                            type="text"
                            value={formatDateDisplay(form.fechaNacimiento)}
                            placeholder="dd-mm-aaaa"
                            readOnly
                        />
                        
                        <label htmlFor="cuponPerfil">Cupón de descuento</label>
                        <input 
                            type="text" 
                            value={form.cupon} 
                            onChange={e=>setForm({...form, cupon:e.target.value})} 
                        />
                        
                        <button className="login-button" type="submit" disabled={isLoading}>
                            {isLoading ? 'Guardando...' : 'Guardar cambios'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
