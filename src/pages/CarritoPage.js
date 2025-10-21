import React, { useMemo, useState } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import '../styles/style.css';
import '../styles/style_carrito.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartItem from '../components/Cart/CartItem';
import Button from '../components/UI/Button';
import PriceDisplay from '../components/UI/PriceDisplay';
import { useCart } from '../context/CartContext';

export default function CarritoPage(){
  const { cart, updateQuantity, removeFromCart, clearCart, checkout } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  const subtotal = useMemo(()=> cart.reduce((s,it)=> s + (it.price * (it.quantity||0)), 0), [cart]);

  function handleCheckout(){
    try{
      const result = checkout();
      setCheckoutData(result);
      setShowModal(true);
    }catch(e){ alert(e.message); }
  }

  return (
    <div>
      <Header />

      <main>
        <Container className="cart-section mt-5 py-4">
          <h2 className="text-center mb-4">Tu carrito</h2>
          {cart.length === 0 ? (
            <Card className="text-center p-4">
              <Card.Body>El carrito está vacío</Card.Body>
            </Card>
          ) : (
            <>
              {cart.map(item => (
                <CartItem 
                  key={item.name}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
              <Card className="mt-4">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col xs={12} md={6}>
                      <h4><strong>Subtotal:</strong> <PriceDisplay price={subtotal} /></h4>
                    </Col>
                    <Col xs={12} md={6} className="text-md-end mt-3 mt-md-0">
                      <Button onClick={handleCheckout} className="me-2">
                        Finalizar compra
                      </Button>
                      <Button 
                        variant="secondary" 
                        onClick={()=>{ if(window.confirm('Vaciar carrito?')) clearCart(); }}
                        style={{backgroundColor: '#6c757d', borderColor: '#6c757d'}}
                      >
                        Vaciar carrito
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </>
          )}
        </Container>
      </main>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Resumen de compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {checkoutData && (
            <>
              <p>Subtotal: <PriceDisplay price={checkoutData.subtotal} /></p>
              {checkoutData.discountPercent > 0 && (
                <p>Descuento ({checkoutData.discountPercent}%): - <PriceDisplay price={checkoutData.discountAmount} /></p>
              )}
              <p><strong>Total a pagar:</strong> <PriceDisplay price={checkoutData.total} /></p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowModal(false)}
            style={{backgroundColor: '#6c757d', borderColor: '#6c757d'}}
          >
            Cancelar
          </Button>
          <Button onClick={() => { alert('Compra realizada con éxito. ¡Gracias!'); setShowModal(false); }}>
            Confirmar compra
          </Button>
        </Modal.Footer>
      </Modal>
      
      <Footer />
    </div>
  );
}
