import React from 'react';
import PriceDisplay from '../UI/PriceDisplay';
import ProductImage from '../Product/ProductImage';
import Button from '../UI/Button';
import QuantityInput from './QuantityInput';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleRemove = () => {
    if (window.confirm(`Eliminar ${item.name}?`)) {
      onRemove(item.name);
    }
  };

  return (
    <li className="cart-item" style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        {item.image && (
          <ProductImage 
            src={item.image} 
            alt={item.name} 
            style={{width:60, height:60}} 
          />
        )}
        <div>
          <strong>{item.name}</strong>
          <div>
            <PriceDisplay price={item.price} /> x 
            <QuantityInput 
              value={item.quantity} 
              onChange={(value) => onUpdateQuantity(item.name, value)} 
            />
          </div>
          <div>
            Subtotal: <PriceDisplay price={item.price * item.quantity} />
          </div>
        </div>
      </div>
      <div>
        <Button onClick={handleRemove}>Eliminar</Button>
      </div>
    </li>
  );
};

export default CartItem;