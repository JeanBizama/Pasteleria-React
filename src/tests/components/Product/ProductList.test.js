/* eslint-env jasmine */
import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductList from '../../../components/Product/ProductList.js';
import { ProductsProvider, useProducts } from '../../../context/ProductsContext.js';

function TestApp() {
  const { products } = useProducts();
  const sample = (products || []).slice(0, 3);
  return <ProductList products={sample} />;
}

describe('ProductList (integrado con ProductsProvider)', () => {
  beforeEach(() => {
    try { localStorage.removeItem('productoSeleccionado'); } catch(e) {}
  });

  it('renderiza productos del seed y guarda producto seleccionado en localStorage', async () => {
    const setItemSpy = spyOn(Storage.prototype, 'setItem');

    render(
      <ProductsProvider>
        <MemoryRouter>
          <TestApp />
        </MemoryRouter>
      </ProductsProvider>
    );

    // espera a que aparezcan productos conocidos del seed
    await screen.findByText('Torta de Chocolate');
    await screen.findByText('Postre Individual de Frutilla');

    // encuentra la tarjeta (por testid) que contiene el heading solicitado
    const cards = screen.getAllByTestId('product-card');
    const targetCard = cards.find(card => card.textContent.includes('Torta de Chocolate'));
    expect(targetCard).toBeTruthy();

    // dentro de esa tarjeta, busca el link Ver Detalle y haz click
  const link = within(targetCard).getByRole('link', { name: /Ver Detalle/i });
  fireEvent.click(link);

    expect(setItemSpy).toHaveBeenCalled();
    const last = setItemSpy.calls.mostRecent().args;
    expect(last[0]).toBe('productoSeleccionado');
    const saved = JSON.parse(last[1]);
    expect(saved.name).toBe('Torta de Chocolate');
  });
});
