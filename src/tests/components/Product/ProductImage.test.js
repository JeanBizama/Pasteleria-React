/* eslint-env jasmine */
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductImage from '../../../components/Product/ProductImage.js';

describe('ProductImage', () => {
  it('renderiza la imagen con src y alt', () => {
    const dataSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBA==';
    render(<ProductImage src={dataSrc} alt="Producto prueba" />);
    const img = screen.getByAltText('Producto prueba');
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toContain('data:image');
  });
});
