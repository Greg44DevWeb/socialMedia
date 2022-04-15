import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
//import Account from './Pages/Account';
import Register from './Pages/Register';
import Login from './Pages/Login';

import './App.css';

function App() {
  return (

    <BrowserRouter>
      <Routes>
      <Route exact path="/" element ={ <Login /> }/>
      <Route exact path="/Home" element ={ <Home /> }/>
      <Route exact path="/register" element ={ <Register /> }/>
      {/* <Route path="/account" element ={ <Account /> }/> */}
      {/* <Route path ="*" element = { < Error /> } /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
