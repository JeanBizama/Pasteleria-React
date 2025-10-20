import React from 'react';

const ProductImage = ({ src, alt, className = '', ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`product-image img-fluid ${className}`}
      style={{
        maxWidth: '100%',
        objectFit: 'cover',
        borderRadius: '8px',
        ...props.style
      }}
      {...props}
    />
  );
};

export default ProductImage;