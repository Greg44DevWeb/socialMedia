import React from 'react';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Main from './Pages/Main';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element ={ <Home /> }/>
      <Route path="/register" element ={ <Signup/> }/>
      <Route path ="/main" element ={ <Main/> } />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
