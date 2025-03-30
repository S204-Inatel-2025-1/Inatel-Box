//path: frontend/src/pages/homePage.jsx

import React from 'react';

const HomePage = () => {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Em Desenvolviemnto</h1>
      </div>
    );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#084c9c', //fundo azul
    color: '#fff',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',
    backgroundColor: '#fff',
  },
  navButton: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  content: {
    flex: 1,
    padding: '20px',
  },
};

export default HomePage;