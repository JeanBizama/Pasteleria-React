import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ProductsProvider } from './context/ProductsContext';
import { CartProvider } from './context/CartContext';

test('renderiza la app envuelta en providers y muestra la marca', () => {
  render(
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
  // Verifica el logo de marca en el Header (alt="Mil Sabores")
  expect(screen.getByRole('img', { name: /Mil Sabores/i })).toBeInTheDocument();
});
