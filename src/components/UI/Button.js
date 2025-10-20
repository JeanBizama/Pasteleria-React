import React from 'react';

const Button = ({ children, onClick, className = '', variant = 'primary', ...props }) => {
  return (
    <button
      className={`products-button ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;