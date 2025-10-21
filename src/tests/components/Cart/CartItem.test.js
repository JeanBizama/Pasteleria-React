import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '../../../components/Cart/CartItem.js';

describe('CartItem', () => {
  const item = { name: 'Torta', price: 12.5, quantity: 2, image: 'data:image/png;base64,R0lGODlhAQABAIAAAAUEBA==' };

  it('renderiza nombre, precio y el input de cantidad', () => {
      render(<CartItem item={item} onUpdateQuantity={() => {}} onRemove={() => {}} />);
    expect(screen.getByText('Torta')).toBeInTheDocument();
      expect(screen.getByText(/Subtotal/i)).toBeInTheDocument();
      const qtyInput = screen.getByRole('spinbutton');
      expect(qtyInput).toBeInTheDocument();
  });

  it('llama onRemove con item.name cuando se confirma eliminación', () => {
    const onRemove = jest.fn();
    jest.spyOn(window, 'confirm').mockReturnValue(true);
    render(<CartItem item={item} onUpdateQuantity={() => {}} onRemove={onRemove} />);
    const btn = screen.getByText(/eliminar/i);
    fireEvent.click(btn);
    expect(onRemove).toHaveBeenCalledWith(item.name);
  });

  it('llama onUpdateQuantity(itemName, value) al cambiar la cantidad', () => {
    const onUpdateQuantity = jest.fn();
      render(<CartItem item={item} onUpdateQuantity={onUpdateQuantity} onRemove={() => {}} />);
      const qtyInput = screen.getByRole('spinbutton');
      fireEvent.change(qtyInput, { target: { value: '3' } });
      expect(onUpdateQuantity).toHaveBeenCalled();
      const args = onUpdateQuantity.mock.calls.at(-1);
      expect(args[0]).toBe(item.name);
      expect(['3', 3]).toContain(args[1]);
  });
});
