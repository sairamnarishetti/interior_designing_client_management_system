// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Make sure the CSS file is imported
import App from './App'; // Importing main App component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
