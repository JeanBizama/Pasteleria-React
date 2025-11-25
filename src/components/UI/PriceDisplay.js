import React from 'react';

const PriceDisplay = ({ price, currency = 'CLP' }) => {
  const formattedPrice = typeof price === 'number' 
    ? price.toLocaleString('es-CL')
    : price;

  return (
    <span className="price-display">
      ${formattedPrice}
    </span>
  );
};

export default PriceDisplay;