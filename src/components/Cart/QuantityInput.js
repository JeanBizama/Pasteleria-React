import React from 'react';

const QuantityInput = ({ value, onChange, min = 1 }) => {
  const handleChange = (e) => {
    const newValue = Math.max(min, Number(e.target.value) || min);
    onChange(newValue);
  };

  return (
    <input
      type="number"
      min={min}
      value={value}
      onChange={handleChange}
      style={{
        width: 70,
        padding: '4px 8px',
        borderRadius: 4,
        border: '1px solid #ccc'
      }}
    />
  );
};

export default QuantityInput;