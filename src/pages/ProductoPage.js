import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import '../styles/style_productos.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductImage from '../components/Product/ProductImage';
import QuantityInput from '../components/Cart/QuantityInput';
import Button from '../components/UI/Button';
import PriceDisplay from '../components/UI/PriceDisplay';
import { useCart } from '../context/CartContext';

export default function ProductoPage() {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const raw = localStorage.getItem('productoSeleccionado');
    if (raw) {
      try { setProduct(JSON.parse(raw)); } catch(e){ setProduct(null); }
    }
  }, []);

  if (!product) return (
    <div>
      <Header />
      <main>
        <Container className="text-center py-5">
          <Card className="p-4">
            <Card.Body>
              Producto no encontrado. Vuelve a <Link to="/productos">Productos</Link>.
            </Card.Body>
          </Card>
        </Container>
      </main>
    </div>
  );

  const nombre = product.name || product.id;
  const precio = Number(product.price || product.precio || 0);
  const imagen = product.image || product.imagen || '';
  const descripcion = product.description || product.descripcion || '';

  return (
    <div>
      <Header />

      <main className="product-page-main">
        <Container className="py-5">
          <Card className="shadow-sm product-detail-container">
            <Card.Body>
              <Row className="align-items-start">
                <Col xs={12} md={5} lg={4} className="mb-4 mb-md-0">
                  <ProductImage 
                    src={imagen} 
                    alt={nombre} 
                    style={{width:'100%', borderRadius:12, objectFit:'cover', maxHeight: 400}} 
                  />
                </Col>
                <Col xs={12} md={7} lg={8}>
                  <h2 style={{marginTop:0, fontFamily: 'Pacifico, cursive', color: '#5D4037'}}>{nombre}</h2>
                  <p id="productDescription" className="mb-3">{descripcion}</p>
                  <p className="mb-3"><strong>Precio:</strong> <PriceDisplay price={precio} /></p>
                  <Row className="align-items-center g-2">
                    <Col xs={4} sm={3} md={4} lg={2}>
                      <QuantityInput 
                        value={qty} 
                        onChange={setQty} 
                      />
                    </Col>
                    <Col xs={8} sm={9} md={8} lg={6}>
                      <Button 
                        className="w-100"
                        onClick={()=>{
                          try{
                            for(let i=0;i<qty;i++) addToCart(nombre, precio, imagen);
                            alert(`${nombre} añadido al carrito`);
                          }catch(err){
                            alert('Se debe iniciar sesion para poder añadir producto');
                          }
                        }}
                      >
                        Añadir al carrito
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
