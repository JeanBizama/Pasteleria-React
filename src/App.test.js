/* eslint-env jasmine */
import { render, screen } from '@testing-library/react';
import { AuthProvider } from './context/AuthContext';
import { ProductsProvider } from './context/ProductsContext';
import { CartProvider } from './context/CartContext';
import { MemoryRouter } from 'react-router-dom';
import Header from './components/Header';

describe('App', () => {
  it('renderiza la app envuelta en providers y muestra la marca', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthProvider>
          <ProductsProvider>
            <CartProvider>
              <Header />
            </CartProvider>
          </ProductsProvider>
        </AuthProvider>
      </MemoryRouter>
    );
    // Verifica el logo de marca en el Header (alt="Mil Sabores")
    expect(screen.getByRole('img', { name: /Mil Sabores/i })).toBeInTheDocument();
  });
});
