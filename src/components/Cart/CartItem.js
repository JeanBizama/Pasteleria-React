import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import PriceDisplay from '../UI/PriceDisplay';
import ProductImage from '../Product/ProductImage';
import Button from '../UI/Button';
import QuantityInput from './QuantityInput';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleRemove = () => {
    if (window.confirm(`Eliminar ${item.name}?`)) {
      onRemove(item.name);
    }
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Row className="align-items-center g-3">
          <Col xs={12} sm={2} md={1} className="text-center text-sm-start">
            {item.image && (
              <ProductImage 
                src={item.image} 
                alt={item.name} 
                style={{width:'100%', maxWidth:60, height:60, objectFit:'cover'}} 
              />
            )}
          </Col>
          <Col xs={12} sm={4} md={3}>
            <strong>{item.name}</strong>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <span><PriceDisplay price={item.price} /></span>
              <span>x</span>
              <QuantityInput 
                value={item.quantity} 
                onChange={(value) => onUpdateQuantity(item.name, value)} 
              />
            </div>
          </Col>
          <Col xs={6} sm={6} md={3}>
            <div className="d-flex align-items-center gap-2">
              <strong>Subtotal:</strong> <PriceDisplay price={item.price * item.quantity} />
            </div>
          </Col>
          <Col xs={6} sm={6} md={2} className="text-center text-md-end">
            <Button onClick={handleRemove} size="sm" variant="danger">
              Eliminar
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CartItem;