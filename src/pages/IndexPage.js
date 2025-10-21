import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/UI/Button';

export default function IndexPage() {
  return (
    <div>
      <Header />

      <main className="home-main-content">
  <Container fluid className="hero py-5 mb-4">
          <Row className="align-items-center">
            <Col xs={12} lg={6} className="mb-4 mb-lg-0">
              <div className="hero-text px-3 px-md-4">
                <h1 style={{fontFamily: 'Pacifico, cursive', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)'}}>
                  🍰 50 Años Endulzando Momentos
                </h1>
                <p className="lead">
                  Pastelería <b>1000 Sabores</b> celebra su aniversario como un referente en la repostería chilena.  
                  Famosa por su récord Guinness en 1995, buscamos renovar nuestra tienda online para entregarte  
                  una <b>experiencia de compra moderna, fácil y deliciosa</b>.
                </p>

                <ul className="benefits list-unstyled">
                  <li className="mb-2">✔️ Envíos a todo Chile</li>
                  <li className="mb-2">✔️ Productos frescos y artesanales</li>
                  <li className="mb-2">✔️ Compra rápida y segura</li>
                </ul>

                <Button as={Link} to="/productos" size="lg" className="mt-3">
                  Ver productos
                </Button>
              </div>
            </Col>

            <Col xs={12} lg={6}>
              <div className="hero-img">
                <img 
                  src="https://antojosalpaladar.com.ve/wp-content/uploads/2024/11/Que-es-la-pasteleria.webp" 
                  alt="Pasteleria" 
                  className="img-fluid rounded shadow"
                />
              </div>
            </Col>
          </Row>
        </Container>

        <section className="products-grid-section">
          <h2 className="text-center" style={{marginTop: '2rem'}}>Productos</h2>
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

      <Footer />
    </div>
  );
}
