// path: frontend/src/components/navbar.test.js

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Navbar from './navbar';

test('renders the Navbar and checks for the Start link', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  
  // Verifica se o link "Start" está presente
  const startLink = screen.getByText(/Start/i);
  expect(startLink).toBeInTheDocument();
  
  // Verifica se o link possui o atributo href correto
  expect(startLink).toHaveAttribute('href', '/');
});
