// path: frontend/src/pages/errorPage.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorPage from './errorPage';

describe('ErrorPage', () => {
  it('should render the 404 Page Not Found message', () => {
    // Renderiza o componente ErrorPage
    render(<ErrorPage />);

    // Verifica se a mensagem "404 Page Not Found" está sendo exibida
    const errorMessage = screen.getByText(/404 Page Not Found/i);

    // Assegura que a mensagem está no documento
    expect(errorMessage).toBeInTheDocument();
  });
});
