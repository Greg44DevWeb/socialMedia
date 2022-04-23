import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material'
import { red } from '@mui/material/colors';
import { indigo } from '@mui/material/colors';

import Home from './Pages/Home';
//import Account from './Pages/Account';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import './App.css';
import { grey } from '@mui/material/colors';



const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500]
    },
    secondary: {
    main: red[900],
    light: red[300],
    },
    tertiary: {
      main: indigo[500],
      contrastText: '#fefefe',
    },
    neutral: {
      main: indigo[100],
      contrastText: '#1a237e',
    },
    text: {
      main: grey[900],
    }
  },

  typography: {
    fontFamily:'Quicksand',
    fontWeightLight: 400,
    fontWeightregular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
    },
    easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
},
 
})
function App() {
  return (
    <ThemeProvider theme={theme}>   
      <BrowserRouter> 
          <Routes>
            <Route path="/" element={<Login />} />
            <Route exact path="/Home" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            {/* <Route path="/account" element ={ <Account /> }/> */}
            {/* <Route path ="*" element = { < Error /> } /> */}   
          </Routes>      
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
