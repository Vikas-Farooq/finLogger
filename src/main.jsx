import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './Theme/ThemeContext';
import { CurrencyProvider } from './CurrencySelector/CurrencyContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <CurrencyProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CurrencyProvider>
  </ThemeProvider>
);
