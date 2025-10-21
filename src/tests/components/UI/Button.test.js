import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../components/UI/Button.js';

describe('Button (UI)', () => {
  it('renderiza children y responde al click (accesible por role)', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Enviar</Button>);
    const btn = screen.getByRole('button', { name: /Enviar/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
  });

  it('no llama onClick cuando está disabled y tiene atributo disabled', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} disabled>Enviar</Button>);
    const btn = screen.getByRole('button', { name: /Enviar/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });
});
