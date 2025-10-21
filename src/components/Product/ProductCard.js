import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PriceDisplay from '../UI/PriceDisplay';
import ProductImage from './ProductImage';

const ProductCard = ({ product }) => {
  const { name, image, price } = product;

  const handleProductSelect = () => {
    localStorage.setItem('productoSeleccionado', JSON.stringify(product));
  };

  return (
    <Card
      className="product-card h-100 shadow-sm d-flex"
      data-category={(product.categories || []).join(',')}
      data-testid="product-card"
    >
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title as="h3" className="text-center product-card-title" style={{fontFamily: 'Pacifico, cursive', color: '#5D4037'}}>
          {name}
        </Card.Title>
        <div className="product-image-wrap mb-3 w-100">
          <ProductImage src={image} alt={name} style={{height:'100%', width:'100%', objectFit:'cover'}} />
        </div>
        <Card.Text className="text-center">
          Precio: <PriceDisplay price={price} />
        </Card.Text>
        <Link
          to="/producto"
          onClick={handleProductSelect}
          className="text-decoration-none mt-auto w-100"
        >
          <Button variant="primary" className="w-100" style={{backgroundColor: '#E9897E', borderColor: '#E9897E'}}>
            Ver Detalle
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;