import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter from '../../../components/Product/CategoryFilter.js';
import { ProductsProvider, useProducts } from '../../../context/ProductsContext.js';

function TestApp({ onFilterChange, active = 'all' }) {
  const { products } = useProducts();
  const categories = React.useMemo(() => {
    const set = new Set();
    (products || []).forEach(p => (p.categories || []).forEach(c => set.add(c)));
    return [...set, 'all'];
  }, [products]);

  return (
    <>
      <CategoryFilter categories={categories} activeFilter={active} onFilterChange={onFilterChange} />
      <div data-testid="expected-count" style={{ display: 'none' }}>{categories.length}</div>
    </>
  );
}

describe('CategoryFilter (integration con ProductsProvider)', () => {
  it('renderiza botones y llama onFilterChange al click', () => {
    const onFilterChange = jest.fn();

    render(
      <ProductsProvider>
        <TestApp onFilterChange={onFilterChange} />
      </ProductsProvider>
    );

  const expectedCount = Number(screen.getByTestId('expected-count').textContent);
  const buttons = screen.getAllByRole('button').filter(el => el.hasAttribute('data-category'));
    expect(buttons.length).toBe(expectedCount);

    const btnToClick = buttons.find(b => b.getAttribute('data-category') !== 'all') || buttons[0];
    fireEvent.click(btnToClick);
    expect(onFilterChange).toHaveBeenCalledWith(btnToClick.getAttribute('data-category'));
  });
});
