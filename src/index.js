import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  BrowserRouter,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthProvider } from './componentes/contextos/AuthProvider';
import { CartProvider } from './componentes/estadoGlobal';
import { Footer } from './componentes/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*  New line */}
    <BrowserRouter>
    <AuthProvider>
    <CartProvider>
      <App />
      </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
