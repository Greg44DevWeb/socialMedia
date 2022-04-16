import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material'
import { orange } from '@mui/material/colors';
import Home from './Pages/Home';
//import Account from './Pages/Account';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';

import './App.css';



const theme = createTheme({
  palette: {
    primary: {
      main: orange[500]
    },
    secondary: {
    main: orange[400],
    light: orange[100]
    }
  },

  status: {
    danger: orange[500],
  },

  typography: {
    fontFamily:'Quicksand',
    fontWeightLight: 400,
    fontWeightregular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})
function App() {
  return (
<ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element ={ <Login /> }/>
        <Route exact path="/Home" element ={ <Home /> }/>
        <Route exact path="/register" element ={ <Register /> }/>
        {/* <Route path="/account" element ={ <Account /> }/> */}
        {/* <Route path ="*" element = { < Error /> } /> */}
        </Routes>
    </BrowserRouter>
  </ThemeProvider>
  );
}

export default App;
