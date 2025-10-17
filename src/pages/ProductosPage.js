import React, { useEffect, useMemo, useState } from 'react';
import '../styles/style.css';
import '../styles/style_productos.css';
import Header from '../components/Header';
import { useProducts } from '../context/ProductsContext';
import { Link } from 'react-router-dom';

export default function ProductosPage() {
  const { products, setProducts } = useProducts();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // try to load from localStorage seed if any
    const stored = localStorage.getItem('productos');
    if (stored) {
      try { setProducts(JSON.parse(stored)); } catch(e){}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = useMemo(() => ['tortas-cuadradas','tortas-circulares','postres-individuales','sin-azúcar','pasteleria-tradicional','sin-gluten','veganos','especiales','all'], []);

  const displayed = useMemo(() => {
    if (filter === 'all') return products;
    return products.filter(p => (p.categories || []).includes(filter));
  }, [products, filter]);

  return (
    <div>
      <Header />

      <nav className="nav-body" id="categoryFilter">
        {categories.map(cat => (
          <button key={cat} onClick={()=> setFilter(cat)} data-category={cat} style={{background:'transparent', border:'none', color:'inherit', fontWeight:600, cursor:'pointer'}}>
            {cat === 'all' ? 'Todos' : cat.replace(/-/g,' ').replace(/\b\w/g, c=>c.toUpperCase())}
          </button>
        ))}
      </nav>

      <main>
        <section className="products-container" id="productsList">
          {displayed && displayed.length ? displayed.map(p => (
            <div className="product-item" key={p.id || p.name} data-category={(p.categories||[]).join(',')}>
              <h3>{p.name}</h3>
              <img src={p.image} alt={p.name} style={{maxWidth:'100%'}} />
              <p>Precio: ${p.price?.toLocaleString?.('es-CL') || p.price}</p>
              <Link className="products-button" to="/producto" onClick={() => {
                localStorage.setItem('productoSeleccionado', JSON.stringify(p));
              }}>Ver Detalle</Link>
            </div>
          )) : <p style={{padding:20}}>No hay productos</p>}
        </section>
      </main>

      <footer>
        <div className="nav-links">
          <div className="left-footer">
            <p>Pasteleria Mil Sabores</p>
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
