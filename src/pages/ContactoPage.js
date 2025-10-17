import React from 'react';
import '../styles/style.css';
import Header from '../components/Header';

export default function ContactoPage() {
  return (
    <div>
      <Header />

      <main className="contact-main-content">
        <div className="contact-form-container">
          <h2>CONTÁCTANOS</h2>
          <form onSubmit={(e) => { e.preventDefault(); alert('Su solicitud de contacto ha sido enviada exitosamente'); }}>
            <label htmlFor="name">NOMBRE</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">CORREO</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="subject">ASUNTO</label>
            <input type="text" id="SUBJECT" name="SUBJECT" required />

            <label htmlFor="message">MENSAJE</label>
            <textarea id="message" rows={5} required></textarea>

            <button type="submit" className="contact-button">ENVIAR</button>
          </form>
        </div>
      </main>

      <footer>
        <div className="nav-links">
          <div className="left-footer">
            <p>Pasteleria Mil Sabores</p>  
          </div>
          <div className="middle-footer">
            <p>© 2025 - Todos los derechos reservados</p>
          </div>
          <div className="right-footer">
            <p>Contacto: info@milSabores.cl</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
