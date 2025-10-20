import React, { useEffect, useMemo, useState } from 'react';
import '../styles/style.css';
import '../styles/style_productos.css';
import Header from '../components/Header';
import { useProducts } from '../context/ProductsContext';
import ProductList from '../components/Product/ProductList';
import CategoryFilter from '../components/Product/CategoryFilter';

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
      <CategoryFilter 
        categories={categories}
        activeFilter={filter}
        onFilterChange={setFilter}
      />
      <main>
          <ProductList products={displayed} />
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
