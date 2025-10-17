import React from 'react';
import '../styles/style.css';
import Header from '../components/Header';

export default function RecuperarPage(){
  return (
    <div>
      <Header />

      <main className="recuperar-main-content">
        <div className="recuperar-form-container">
          <form method="post" id="FormularioRecuperar">
            <h1>Recuperar Contraseña</h1>
            <label htmlFor="email_reset">Ingresar Correo electronico</label>
            <input type="email" name="email_reset" id="email_reset" required />
            <button className="recuperar-button" type="submit">Restablecer contraseña</button>
          </form>
        </div>
      </main>
    </div>
  );
}
