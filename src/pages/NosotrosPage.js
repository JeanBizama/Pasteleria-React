import React from 'react';
import '../styles/style.css';
import Header from '../components/Header';

export default function NosotrosPage() {
  return (
    <div>
      <Header />

      <main className="nosotros-main-content">
        <div className="nosotros-container">
          <section className="about-section">
            <h1>Sobre Nuestra Historia</h1>
            <p>
              Pastelería Mil Sabores celebra su 50 aniversario como un referente en la repostería chilena. Famosa por su participación en un récord Guinness en 1995, cuando colaboró en la creación de la torta más grande del mundo, la pastelería busca renovar su sistema de ventas online para ofrecer una experiencia de compra moderna y accesible para sus clientes.
            </p>
            <img src="https://mastershosteleria.com/wp-content/uploads/tipos-de-pasteles.jpg" alt="Nosotros" />
          </section>

          <section className="mission-vision-section">
            <div className="mission-card">
              <h2>Nuestra Misión</h2>
              <p>
                Ofrecer una experiencia dulce y memorable a nuestros clientes, proporcionando tortas y productos de repostería de alta calidad para todas las ocasiones, mientras celebramos nuestras raíces históricas y fomentamos la creatividad en la repostería.
              </p>
            </div>
            <div className="vision-card">
              <h2>Nuestra Visión</h2>
              <p>
                Convertirnos en la tienda online líder de productos de repostería en Chile, conocida por nuestra innovación, calidad y el impacto positivo en la comunidad, especialmente en la formación de nuevos talentos en gastronomía.
              </p>
            </div>
          </section>
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
