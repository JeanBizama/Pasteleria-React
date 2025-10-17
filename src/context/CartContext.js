import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }){
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const { user } = useAuth();

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);

  function getCart(){ return cart; }

  function saveCart(next){ setCart(next); }

  function addToCart(name, price, image = ''){
    if (!user) throw new Error('Debe iniciar sesión');
    setCart(prev => {
      const found = prev.find(i => i.name === name);
      if (found) return prev.map(i => i.name === name ? { ...i, quantity: (i.quantity || 1) + 1 } : i);
      return [...prev, { name, price: Number(price), quantity: 1, image }];
    });
  }

  function removeFromCart(name){ setCart(prev => prev.filter(i => i.name !== name)); }

  function updateQuantity(name, quantity){
    setCart(prev => prev.map(i => i.name === name ? { ...i, quantity: Math.max(0, Number(quantity)) } : i).filter(i => i.quantity > 0));
  }

  function clearCart(){ setCart([]); }

  function totalItems(){ return cart.reduce((s, it) => s + (it.quantity || 0), 0); }

  function checkout(){
    if (cart.length === 0) throw new Error('Carrito vacío');
    // apply discounts using user info if available
    const subtotal = cart.reduce((s, it) => s + it.price * it.quantity, 0);
    let discountPercent = 0;
    if (user) {
      const { descuento } = (user && user.descuento !== undefined) ? { descuento: user.descuento } : { descuento: 0 };
      discountPercent = descuento || 0;
    }
    const discountAmount = Math.round(subtotal * discountPercent / 100);
    const total = subtotal - discountAmount;
    // simulate purchase
    clearCart();
    return { subtotal, discountPercent, discountAmount, total };
  }

  return (
    <CartContext.Provider value={{ cart, getCart, saveCart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, checkout }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(){ return useContext(CartContext); }

export default CartContext;
