import React from 'react'
import '../Login/login.css';
import logoGroupomania from '../../images/Groupomania_Logos+(3)/icon-above-font.svg';

function Login() {
  return (
    <>
        <img src={logoGroupomania} className="logoGroupomania" alt="logo" />
     
        <div className="container"> 
            <div className="title">CONNEXION</div>
                <form className ="signupForm">
                    <input className ="inputForm" type ="email" name="email" placeholder="Votre email" required></input>
                    <input className ="inputForm" type ="text" name="password" placeholder="Votre mot de passe" required></input>
                    <button className="submit">Log In</button>
                    <a href="#" className="signupLink">
                      <p>Pas encore de compte ? inscrivez vous</p></a>
                </form>
        </div>
        </>
  )
}

export default Login;