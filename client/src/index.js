import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './Context/AuthProvider';
import { CssBaseline } from '@mui/material';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CssBaseline/>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
