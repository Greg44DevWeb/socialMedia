import React from 'react';
import {useNavigate} from 'react-router-dom';
import './NavbarStryle.css';
import logo from '../Assets/images/icon-left-font-monochrome-black.svg';
import Button from '@mui/material/Button'; 


const Navigation = () => {
    

    const navigate = useNavigate();
    
    function handleClick() {
        localStorage.clear();
        navigate('/');  
    }

    return (
      <div id="mainWrapper">
        <img src={logo} className="navLogo" alt="Logo Groupomania"/>
        <navbar className="navbar-wrapper">
          <Button variant="contained"onClick={handleClick}>LogOut</Button>
          <Button variant="contained">Profil</Button>

        </navbar>
      </div>
    );
};

export default Navigation;