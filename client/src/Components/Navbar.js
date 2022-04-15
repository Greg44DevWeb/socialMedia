import React from 'react';
import {useNavigate} from 'react-router-dom';
import './NavbarStryle.css';
import logo from '../Assets/images/icon-left-font-monochrome-black.svg';


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
          <button className="logOut button" onClick={handleClick}>LogOut</button>
          <button className="profil button">Mon Profil</button>
        </navbar>
      </div>
    );
};

export default Navigation;