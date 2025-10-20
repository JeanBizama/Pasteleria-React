import React from 'react';
import { Link } from 'react-router-dom';
import PriceDisplay from '../UI/PriceDisplay';
import ProductImage from './ProductImage';
import Button from '../UI/Button';

const ProductCard = ({ product }) => {
  const { name, image, price } = product;

  const handleProductSelect = () => {
    localStorage.setItem('productoSeleccionado', JSON.stringify(product));
  };

  return (
    <div className="product-item card h-100" data-category={(product.categories || []).join(',')}>
      <div className="card-body d-flex flex-column align-items-center">
        <h3 className="card-title text-center">{name}</h3>
        <ProductImage src={image} alt={name} className="img-fluid mb-2" style={{maxHeight:'180px'}} />
        <p className="card-text">Precio: <PriceDisplay price={price} /></p>
        <Link
          className="products-button btn btn-primary mt-auto"
          to="/producto"
          onClick={handleProductSelect}
        >
          Ver Detalle
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;