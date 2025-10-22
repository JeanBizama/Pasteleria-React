/* eslint-env jasmine */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../../../components/Product/ProductCard.js';

describe('ProductCard', () => {
  const product = {
    id: 'torta-prueba',
    name: 'Torta Prueba',
    image: 'data:image/png;base64,R0lGODlhAQABAIAAAAUEBA==',
    price: 1234,
    categories: ['tortas-cuadradas', 'especiales']
  };

  it('muestra nombre como heading, imagen con alt, precio y data-category', () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { level: 3, name: /Torta Prueba/i });
  expect(heading).toBeInTheDocument();

    const img = screen.getByAltText(/Torta Prueba/i);
  expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toBe(product.image);

    const link = screen.getByRole('link', { name: /Ver Detalle/i });
  expect(link).toBeInTheDocument();

  const root = screen.getByTestId('product-card');
  expect(root).toBeInTheDocument();
  expect(root.getAttribute('data-category')).toBe(product.categories.join(','));
  });

  it('guarda el producto en localStorage al clicar "Ver Detalle"', () => {
    const setItemSpy = spyOn(Storage.prototype, 'setItem');

    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /Ver Detalle/i });
    fireEvent.click(link);

    expect(setItemSpy).toHaveBeenCalledWith('productoSeleccionado', JSON.stringify(product));
  });
});
