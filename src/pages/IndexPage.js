import React from 'react';
import '../styles/style.css';
import Header from '../components/Header';

export default function IndexPage() {
  return (
    <div>
      <Header />

      <main className="home-main-content">
        <section className="hero">
          <div className="hero-text">
            <h1>🍰 50 Años Endulzando Momentos</h1>
            <p>
              Pastelería <b>1000 Sabores</b> celebra su aniversario como un referente en la repostería chilena.  
              Famosa por su récord Guinness en 1995, buscamos renovar nuestra tienda online para entregarte  
              una <b>experiencia de compra moderna, fácil y deliciosa</b>.
            </p>

            <ul className="benefits">
              <li>✔️ Envíos a todo Chile</li>
              <li>✔️ Productos frescos y artesanales</li>
              <li>✔️ Compra rápida y segura</li>
            </ul>

            <a href="/productos" className="cta">Ver productos</a>
          </div>

          <div className="hero-img">
            <img src="https://antojosalpaladar.com.ve/wp-content/uploads/2024/11/Que-es-la-pasteleria.webp" alt="Pasteleria" width="1000" />
          </div>
        </section>

        <section className="products-grid-section">
          <h2>Productos</h2>
          <div className="products-container">
            <div className="product-item">
              <img src="https://glutendence.com/wp-content/uploads/2023/10/barritas-de-pan-sin-gluten.jpg" alt="Pan sin gluten" />
              <div className="product-info">
                <h3 className="product-title">Pan Sin Gluten</h3>
                <span className="product-attributes">Rico y Denso</span>
                <span className="product-price">$3.500</span>
              </div>
            </div>
            <div className="product-item">
              <img src="https://www.recetasnestle.com.ec/sites/default/files/srh_recipes/4f40dbe76e4ef2833262f0269d9548e5.jpg" alt="Mousse de chocolate" />
              <div className="product-info">
                <h3 className="product-title">Mousse de Chocolate</h3>
                <span className="product-attributes">Cremoso y Suave</span>
                <span className="product-price">$5.000</span>
              </div>
            </div>
            <div className="product-item">
              <img src="https://recipesblob.oetker.es/assets/c104e75b79384f3b94873bd15cdfe66c/1272x764/tarta-de-santiago.webp" alt="Tarta de Santiago" />
              <div className="product-info">
                <h3 className="product-title">Tarta de Santiago</h3>
                <span className="product-attributes">Tradicional Tarta Española</span>
                <span className="product-price">$6.000</span>
              </div>
            </div>
            <div className="product-item">
              <img src="https://luciacomparada.com/wp-content/uploads/2024/01/galletas-de-avena-veganas-05.jpg" alt="Galletas de avena" />
              <div className="product-info">
                <h3 className="product-title">Galletas Veganas de Avena</h3>
                <span className="product-attributes">Crujientes y Sabrosas</span>
                <span className="product-price">$4.500</span>
              </div>
            </div>
            <div className="product-item">
              <img src="https://brigams.pe/wp-content/uploads/chocolate-2.jpg" alt="Torta cuadrada de chocolate" />
              <div className="product-info">
                <h3 className="product-title">Torta Cuadrada de Chocolate</h3>
                <span className="product-attributes">Con Capas de Ganache y Toque de Avellanas</span>
                <span className="product-price">$45.000</span>
              </div>
            </div>
            <div className="product-item">
              <img src="https://www.clarin.com/img/2022/04/19/2dLW3_B8e_1200x0__1.jpg" alt="Torta de Cumpleanos" />
              <div className="product-info">
                <h3 className="product-title">Torta Especial de Cumpleaños</h3>
                <span className="product-attributes">Diseñada Para Celebraciones</span>
                <span className="product-price">$55.000</span>
              </div>
            </div>
            <div className="product-item">
              <img src="https://www.recetasnestle.com.ec/sites/default/files/styles/recipe_detail_desktop_new/public/srh_recipes/7f9ebeaceea909a80306da27f0495c59.jpg?itok=_Xp6MoSe" alt="CheeseCake" />
              <div className="product-info">
                <h3 className="product-title">CheeseCake sin Azucar</h3>
                <span className="product-attributes">Suave y Cremoso</span>
                <span className="product-price">$47.000</span>
              </div>
            </div>
            <div className="product-item">
              <img src="https://cdn0.matrimonio.com.co/article/9533/3_2/1280/jpg/3359-pastel-adornado-con-flores.jpeg" alt="Torta de bodas" />
              <div className="product-info">
                <h3 className="product-title">Torta Especial de Boda</h3>
                <span className="product-attributes">Elegante y Deliciosa</span>
                <span className="product-price">$60.000</span>
              </div>
            </div>
          </div>
        </section>
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
