import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { theme } from './Context/theme.js';
import { ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './Context/userContext';
import jwt_decode from "jwt-decode";
import './App.css';


//*** ROUTES IMPORTS ***//
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import Error404 from './Pages/Error404';





let navigate = useNavigate;

function App() {

    const [userToken, setUserToken] = useState('');
    const [userId, setUserId] = useState('');
    const [admin, setAdmin] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwt_decode(localStorage.getItem("token"));
        const userToken = decodedToken;
        const dateNow = new Date();
        if (decodedToken.exp > dateNow / 1000) {
          setUserToken(userToken);
          setUserId(userId)
          setAdmin(admin);
          setLoggedIn(true)
          setFirstname(firstname);
          setLastname(lastname);
          
        } else {
          localStorage.clear();
          navigate("/");
          setUserToken('');
          setUserId('');
          setAdmin('');
          setLoggedIn('')
          setFirstname('');
          setLastname('');
        }
        if(userToken.admin === 1) {
          setAdmin(true)
        }else {
          setAdmin(false)
        }
      }
    }, [firstname,lastname, loggedIn, userId, admin]);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider
        value={{
          userToken,
          loggedIn,
          setLoggedIn,
          userId,
          setUserId,
          admin,
          firstname,
          lastname,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/home" element={<Home />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
