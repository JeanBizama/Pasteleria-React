import React, { useMemo, useState } from 'react';
import '../styles/style.css';
import '../styles/style_carrito.css';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';

export default function CarritoPage(){
  const { cart, updateQuantity, removeFromCart, clearCart, checkout } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  const subtotal = useMemo(()=> cart.reduce((s,it)=> s + (it.price * (it.quantity||0)), 0), [cart]);

  function handleCheckout(){
    try{
      const result = checkout();
      setCheckoutData(result);
      setShowModal(true);
    }catch(e){ alert(e.message); }
  }

  return (
    <div>
      <Header />

      <main>
        <section className="cart-section" style={{marginTop:40}}>
          <h2>Tu carrito</h2>
          <ul id="cartItems">
            {cart.length === 0 ? <li>El carrito está vacío</li> : cart.map(item => (
              <li key={item.name} className="cart-item" style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
                <div style={{display:'flex', alignItems:'center', gap:12}}>
                  {item.image ? <img src={item.image} alt={item.name} style={{width:60,height:60,objectFit:'cover',borderRadius:6}} /> : null}
                  <div>
                    <strong>{item.name}</strong>
                    <div>${item.price.toLocaleString()} x <input type="number" min="1" value={item.quantity} onChange={(e)=> updateQuantity(item.name, Number(e.target.value) || 1)} style={{width:70}} /></div>
                    <div>Subtotal: ${ (item.price * item.quantity).toLocaleString() }</div>
                  </div>
                </div>
                <div>
                  {/* eslint-disable-next-line no-restricted-globals */}
                  {/* eslint-disable-next-line no-alert */}
                  <button onClick={()=>{ if(!window.confirm(`Eliminar ${item.name}?`)) return; removeFromCart(item.name); }} className="products-button">Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <p><strong>Subtotal:</strong> <span id="cartTotal">${subtotal.toLocaleString()}</span></p>
          <button id="checkoutBtn" className="products-button" onClick={handleCheckout}>Finalizar compra</button>
          {/* eslint-disable-next-line no-restricted-globals */}
          {/* eslint-disable-next-line no-alert */}
          <button style={{marginLeft:8}} onClick={()=>{ if(window.confirm('Vaciar carrito?')) clearCart(); }}>Vaciar carrito</button>
        </section>
      </main>

      {showModal && checkoutData && (
        <div id="checkoutModal" className="modal" style={{position:'fixed', inset:0, zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div className="modal-overlay" style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)'}} onClick={()=>setShowModal(false)}></div>
          <div className="modal-content" style={{position:'relative', background:'#fff', padding:20, borderRadius:10, width:'90%', maxWidth:480, zIndex:2001}}>
            <span onClick={()=>setShowModal(false)} className="close" style={{position:'absolute', right:12, top:8, fontSize:22, cursor:'pointer'}}>&times;</span>
            <h2>Resumen de compra</h2>
            <p>Subtotal: ${checkoutData.subtotal.toLocaleString()}</p>
            {checkoutData.discountPercent > 0 && <p>Descuento ({checkoutData.discountPercent}%): - ${checkoutData.discountAmount.toLocaleString()}</p>}
            <p><strong>Total a pagar:</strong> ${checkoutData.total.toLocaleString()}</p>
            <div style={{display:'flex', gap:10, marginTop:12}}>
              <button onClick={()=>{ alert('Compra realizada con éxito. ¡Gracias!'); setShowModal(false); }} className="products-button">Confirmar compra</button>
              <button onClick={()=>setShowModal(false)} style={{background:'#ccc', color:'#333', border:'none', padding:'8px 12px', borderRadius:8}}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
