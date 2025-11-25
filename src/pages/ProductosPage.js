import React, { useMemo, useState } from 'react';
import '../styles/style.css';
import '../styles/style_productos.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useProducts } from '../context/ProductsContext';
import ProductList from '../components/Product/ProductList';
import CategoryFilter from '../components/Product/CategoryFilter';

export default function ProductosPage() {
  const { products, isLoading, error } = useProducts(); 
  const [filter, setFilter] = useState('all');

  const categories = useMemo(() => ['tortas-cuadradas','tortas-circulares','postres-individuales','sin-azúcar','pasteleria-tradicional','sin-gluten','veganos','especiales','all'], []);

  const displayed = useMemo(() => {
    if (filter === 'all') return products;
    return products.filter(p => {
      const productCategoryName = p.categoria && p.categoria.nombre; 
      return productCategoryName === filter;
    });
  }, [products, filter]);

  return (
    <div className="productos-page">
      <Header />
      <CategoryFilter 
        categories={categories}
        activeFilter={filter}
        onFilterChange={setFilter}
      />
      <main>
        {/* Mostrar estados de la API */}
        {error && <p className="error-message">Error al conectar con el servidor: {error}</p>}
        {isLoading ? (
          <p className="loading-message">⏳ Cargando nuestros deliciosos productos...</p>
        ) : (
          // Solo renderizar ProductList cuando los datos hayan cargado
          <ProductList products={displayed} />
        )}
      </main>

      <Footer />
    </div>
  );
}
