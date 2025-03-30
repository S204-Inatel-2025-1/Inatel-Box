// path: frontend/src/pages/loginPage.test.js

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './loginPage';

test('renders LoginPage and handles login', () => {
  const usuariosMock = [
    { matricula: '123', senha: 'senha123', curso: 'GEC' },
    { matricula: '456', senha: 'senha456', curso: 'GES' }
  ];

  localStorage.setItem('usuarios', JSON.stringify(usuariosMock));

  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  // Verifica se o título da página está correto
  const title = screen.getByText(/Login/i);
  expect(title).toBeInTheDocument();

  // Verifica se os usuários aparecem no select
  const select = screen.getByRole('combobox');
  expect(select).toBeInTheDocument();

  // Seleciona um usuário e preenche a senha
  fireEvent.change(select, { target: { value: '123' } });
  fireEvent.change(screen.getByPlaceholderText(/Senha/i), { target: { value: 'senha123' } });

  // Verifica se o botão de login está presente
  const button = screen.getByText(/Entrar/i);
  expect(button).toBeInTheDocument();

  // Simula o clique no botão de login
  fireEvent.click(button);

  // Verifica se a navegação ocorre após login (para isso, você pode usar mocks do react-router-dom ou outras verificações)
});
