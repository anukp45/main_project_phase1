import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { DisasterProvider } from './context/DisasterContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <DisasterProvider>
        <App />
      </DisasterProvider>
    </AuthProvider>
  </React.StrictMode>,
);
