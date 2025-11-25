import React from 'react';
import { Form } from 'react-bootstrap';

const QuantityInput = ({ value, onChange, min = 1 }) => {
  const handleChange = (e) => {
    const newValue = Math.max(min, Number(e.target.value) || min);
    onChange(newValue);
  };

  return (
    <Form.Control
      type="number"
      min={min}
      value={value}
      onChange={handleChange}
      style={{
        width: 70,
        padding: '4px 8px'
      }}
      size="sm"
    />
  );
};

export default QuantityInput;