import React from 'react'
import '../Signup/signup.css';
import logoGroupomania from '../../images/Groupomania_Logos+(3)/icon-above-font.svg';

function Signup() {
  return (
    <>
        <img src={logoGroupomania} className="logoGroupomania" alt="logo" />
        <div className="container"> 
            <div className="title">INSCRIPTION</div>
                <form className ="signupForm">
                    <input className ="inputForm" type ="text" name="nom" placeholder="Votre nom" required></input>
                    <input className ="inputForm" type ="text" name="prenom" placeholder="Votre prenom" required></input>
                    <input className ="inputForm" type ="email" name="email" placeholder="Votre email" required></input>
                    <input className ="inputForm" type ="text" name="password" placeholder="Votre mot de passe" required></input>
                    <button className="submit">Sign Up</button>
                    <a href="#" className="signupLink">
                      <p>Déjà inscrit(e), connectez-vous</p></a>
                </form>
        </div>
    </>
  )
}

export default Signup;