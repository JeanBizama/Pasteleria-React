import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <div className="no-products">No hay productos disponibles</div>;
  }

  return (
    <section className="products-container container" id="productsList">
      <div className="row">
        {products.map(product => (
          <div className="col-12 col-sm-6 col-md-4 mb-4" key={product.id || product.name}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;