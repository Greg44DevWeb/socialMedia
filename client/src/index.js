import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme} from './Context/theme.js';
import { CssBaseline } from '@mui/material';
import './index.css';
import { ThemeProvider } from '@mui/material';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
