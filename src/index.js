import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// para renderizar la app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizar el componente principal
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);