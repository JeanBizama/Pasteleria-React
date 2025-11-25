import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <div className="no-products text-center p-4">No hay productos disponibles</div>;
  }

  return (
    <Container fluid className="products-container" id="productsList">
      <Row className="g-3 g-sm-4 justify-content-center">
        {products.map(product => (
          <Col xs={6} sm={6} md={4} lg={3} key={product.id || product.name} className="d-flex">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;