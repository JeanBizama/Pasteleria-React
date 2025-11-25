import React from 'react';

const ProductImage = ({ src, alt, className = '', ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`product-image img-fluid ${className}`}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: '8px',
        ...props.style
      }}
      {...props}
    />
  );
};

export default ProductImage;