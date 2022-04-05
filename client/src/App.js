import React from 'react';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element ={ <Home /> }/>
      <Route path="/register" element ={ <Signup/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
