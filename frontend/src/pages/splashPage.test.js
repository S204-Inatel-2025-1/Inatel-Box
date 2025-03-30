// path: src/pages/splashPage.test.js

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import SplashPage from './splashPage';

describe('SplashPage', () => {
  it('should render the title "Inatel Box"', () => {
    // Renderiza a SplashPage com um MemoryRouter para poder usar o hook useNavigate
    render(
      <MemoryRouter initialEntries={['/']}>
        <SplashPage />
      </MemoryRouter>
    );

    // Verifica se o título está presente na tela
    const titleElement = screen.getByText(/Inatel Box/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('should navigate to the login page after 1 second', async () => {
    jest.useFakeTimers(); // Usar timers falsos para simular o tempo

    // Renderiza o componente com a navegação para a rota /login
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Avança o tempo para que o timer de 1 segundo passe
    act(() => {
      jest.advanceTimersByTime(1000); // Avança o timer em 1 segundo
    });

    // Verifica se o componente de login foi renderizado após a navegação
    await waitFor(() => {
      expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
    });

    jest.useRealTimers(); // Restaura os timers reais após o teste
  });
});
