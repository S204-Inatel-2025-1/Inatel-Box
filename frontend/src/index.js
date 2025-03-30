//path: frontend/src/index.js

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './app';
import ErrorPage from './pages/errorPage';
import SplashPage from './pages/splashPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import HomePage from './pages/homePage';

//config das rotas
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, //app é o layout principal
    errorElement: <ErrorPage />, //pagina de erro
    children: [
      {
        path: '/',
        element: <SplashPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/home',
        element: <HomePage />,
      },
    ],
  },
]);

//render
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);