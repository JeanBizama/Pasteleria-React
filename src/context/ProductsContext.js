import React, { createContext, useContext, useEffect, useState } from 'react';

const ProductsContext = createContext();

const API_URL = 'http://localhost:8080/api/productos';

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchProducts() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Error al cargar productos: ${response.statusText}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (e) {
      console.error("Fallo al obtener productos:", e);
      setError("No se pudieron cargar los productos desde el servidor.");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  function saveProducts(list) {
    setProducts(list);
  }

  async function addProduct(productData) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`Error al agregar producto: ${response.statusText}`);
      }

      // Asumiendo que el backend de Spring Boot devuelve el producto creado (incluyendo su ID)
      const newProduct = await response.json();
      
      // Actualizar el estado local con el nuevo producto
      setProducts(prev => [...prev, newProduct]);
      return newProduct;

    } catch (e) {
      console.error("Fallo al agregar producto:", e);
      // Podrías manejar el error mostrando un mensaje al usuario
    }
  }

  function getProductById(id) {
    // El ID que viene de la URL es un string, lo comparamos con los IDs del producto
    return products.find(p => String(p.id) === String(id));
  }

  async function updateProduct(productId, updatedData) {
    try {
      const response = await fetch(`${API_URL}/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar producto: ${response.statusText}`);
      }
      
      const updatedProduct = await response.json();
      
      setProducts(prev => prev.map(p => 
        p.id === productId ? updatedProduct : p
      ));
      console.log(`Producto ${productId} actualizado con éxito.`, updatedProduct);
      return updatedProduct

    } catch (e) {
      console.error("Fallo al actualizar producto:", e);
    }
  }

  async function removeProduct(productId) {
    try {
      const response = await fetch(`${API_URL}/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        // En un DELETE exitoso, la respuesta.ok es true, incluso si no devuelve body (204 No Content).
        // Sin embargo, manejamos un error si el status es 4xx o 5xx.
        throw new Error(`Error al eliminar producto: ${response.statusText}`);
      }
      
      // Si la eliminación fue exitosa, actualiza el estado local
      setProducts(prev => prev.filter(p => p.id !== productId));

    } catch (e) {
      console.error("Fallo al eliminar producto:", e);
    }
  }
  return (
    <ProductsContext.Provider value={{ 
      products, 
      isLoading,
      error,
      setProducts: saveProducts, 
      addProduct, 
      getProductById,
      updateProduct, 
      removeProduct, 
      fetchProducts
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts(){ 
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}

export default ProductsContext;