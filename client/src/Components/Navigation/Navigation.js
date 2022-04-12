import React from 'react';
import './navigation.css';
import logo from '../../assets/images/Groupomania_Logos+(3)/icon-left-font-monochrome-white.svg';
import {NavLink} from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="navigation">
                <NavLink to="/" className="logoLink">
                <img src={logo} className="logo" alt="logo Groupomania"/>
                </NavLink>
            <ul className="menuList">
                <NavLink to="/register" className="link">
                    <li className="itemLink">S'INSCRIRE</li>
                </NavLink>
                <NavLink to="/login" className="link">
                    <li className="itemLink">SE CONNECTER</li>
                </NavLink>
                <NavLink to="/account" className="link">
                    <li className="itemLink">MON PROFIL</li>
                </NavLink>
                <NavLink to="/search" className="link">
                    <li className="itemLink">RECHERCHER</li>
                </NavLink>
                
            </ul>
        </div>
    );
};

export default Navigation;