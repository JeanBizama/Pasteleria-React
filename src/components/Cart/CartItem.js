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
        <Row className="align-items-center">
          <Col xs={3} sm={2} md={1}>
            {item.image && (
              <ProductImage 
                src={item.image} 
                alt={item.name} 
                style={{width:'100%', maxWidth:60, height:60, objectFit:'cover'}} 
              />
            )}
          </Col>
          <Col xs={9} sm={5} md={4}>
            <strong>{item.name}</strong>
          </Col>
          <Col xs={6} sm={3} md={3} className="mt-2 mt-sm-0">
            <div className="d-flex align-items-center gap-2">
              <PriceDisplay price={item.price} /> x 
              <QuantityInput 
                value={item.quantity} 
                onChange={(value) => onUpdateQuantity(item.name, value)} 
              />
            </div>
          </Col>
          <Col xs={6} sm={2} md={2} className="mt-2 mt-sm-0 text-end text-sm-start">
            <div>
              <strong>Subtotal:</strong> <PriceDisplay price={item.price * item.quantity} />
            </div>
          </Col>
          <Col xs={12} md={2} className="mt-2 mt-md-0 text-center text-md-end">
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