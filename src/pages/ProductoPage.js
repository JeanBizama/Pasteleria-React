import React, { useEffect, useState } from 'react';
import '../styles/style.css';
import '../styles/style_productos.css';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';

export default function ProductoPage() {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const raw = localStorage.getItem('productoSeleccionado');
    if (raw) {
      try { setProduct(JSON.parse(raw)); } catch(e){ setProduct(null); }
    }
  }, []);

  if (!product) return (
    <div>
      <Header />
      <main><div style={{maxWidth:900, margin:'40px auto', padding:20}}>Producto no encontrado. Vuelve a <a href="/productos">Productos</a>.</div></main>
    </div>
  );

  const nombre = product.name || product.id;
  const precio = Number(product.price || product.precio || 0);
  const imagen = product.image || product.imagen || '';
  const descripcion = product.description || product.descripcion || '';

  return (
    <div>
      <Header />

  <main className="product-page-main">
  <section className="product-detail-container" style={{ maxWidth: 900, margin: '40px auto 40px', padding: 20 }}>
          <div style={{display:'flex', gap:20, alignItems:'flex-start', flexWrap:'wrap'}}>
            <div style={{flex:1, minWidth:260, maxWidth:380}}>
              <img src={imagen} alt={nombre} style={{width:'100%', borderRadius:12, objectFit:'cover'}} />
            </div>
            <div style={{flex:1, minWidth:260}}>
              <h2 style={{marginTop:0}}>{nombre}</h2>
              <p id="productDescription">{descripcion}</p>
              <p><strong>Precio:</strong> ${precio.toLocaleString('es-CL')}</p>
              <div style={{display:'flex', gap:10, alignItems:'center', marginTop:10}}>
                <input id="qtyInput" type="number" min="1" value={qty} onChange={(e)=>setQty(Math.max(1, Number(e.target.value)||1))} style={{width:80, padding:6, borderRadius:6, border:'1px solid #ccc'}} />
                <button className="products-button" onClick={()=>{
                  try{
                    for(let i=0;i<qty;i++) addToCart(nombre, precio, imagen);
                    alert(`${nombre} añadido al carrito`);
                  }catch(err){
                    // when user is not logged in, CartContext.addToCart throws
                    alert('Se debe iniciar sesion para poder añadir producto');
                    // do nothing else; remain on the same page
                  }
                }}>Añadir al carrito</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="nav-links">
          <div className="left-footer">
            <p>Pastaleria Mil Sabores</p>
          </div>
          <div className="middle-footer">
            <p>© 2025 - Todos los derechos reservados</p>
          </div>
          <div className="right-footer">
            <p>Contacto: info@milSabores.cl</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
