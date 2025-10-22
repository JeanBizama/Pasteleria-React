/* eslint-env jasmine */
/* eslint-disable jest/no-jasmine-globals */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import QuantityInput from '../../../components/Cart/QuantityInput.js';

describe('QuantityInput', () => {
  it('renderiza un input tipo number con el valor inicial', () => {
    render(<QuantityInput value={2} onChange={() => {}} />);
    const input = screen.getByRole('spinbutton');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('2');
  });

  it('llama onChange con el número parseado cuando el valor es válido', () => {
    const onChange = jasmine.createSpy('onChange');
    render(<QuantityInput value={2} onChange={onChange} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '5' } });
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('aplica el mínimo (min) cuando se introduce 0, vacío o valor no numérico', () => {
  const onChange = jasmine.createSpy('onChange');
    render(<QuantityInput value={2} onChange={onChange} min={2} />);
    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '0' } });
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.change(input, { target: { value: 'abc' } });

    const lastCallArg = onChange.calls.mostRecent().args[0];
    expect(lastCallArg).toBe(2);

    const calledWithMin = onChange.calls.allArgs().some(args => args[0] === 2);
    expect(calledWithMin).toBe(true);
  });
});
