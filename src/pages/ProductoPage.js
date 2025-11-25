import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import '../styles/style.css';
import '../styles/style_productos.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductImage from '../components/Product/ProductImage';
import QuantityInput from '../components/Cart/QuantityInput';
import Button from '../components/UI/Button';
import PriceDisplay from '../components/UI/PriceDisplay';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductsContext';

export default function ProductoPage() {
  const { id: productId } = useParams();
  const { getProductById } = useProducts();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();


useEffect(() => {
        setIsLoading(true);
        const foundProduct = getProductById(productId);
        
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
           
            setProduct(null);
        }
        setIsLoading(false);
}, [productId, getProductById]);

  if (isLoading) return (
        <div>
             <Header />
             <main><Container className="text-center py-5">Cargando detalles del producto...</Container></main>
        </div>
  );

  
  
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
  
  const { 
        nombre: name, 
        precio: price, 
        imagenUrl: image, 
        descripcion: description 
  } = product;

  const nombre = name || product.id;
  const precio = Number(price || 0);
  const imagen = image || '';
  const descripcion = description || '';

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
                            for(let i=0;i<qty;i++) addToCart(product.nombre, product.precio, product.imagenUrl);
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
