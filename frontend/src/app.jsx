//path: frontend/src/app.jsx

import React from 'react';
import { Outlet } from 'react-router-dom'; //
import Navbar from './components/navbar';

const App = () => {
  return (
    <div>
      {}
      <Navbar />

      {/* Outlet renderiza os componentes filhos das rotas */}
      <Outlet />
    </div>
  );
};

export default App;