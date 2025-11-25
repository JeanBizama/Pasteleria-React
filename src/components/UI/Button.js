import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

const Button = ({ children, onClick, className = '', variant = 'primary', ...props }) => {
  return (
    <BootstrapButton
      variant={variant}
      className={className}
      onClick={onClick}
      style={{backgroundColor: '#E9897E', borderColor: '#E9897E', ...props.style}}
      {...props}
    >
      {children}
    </BootstrapButton>
  );
};

export default Button;