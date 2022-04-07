import React, {useState,} from 'react'
import '../Signup/signupStyle.css';
import {NavLink} from 'react-router-dom'
import logoGroupomania from '../../images/Groupomania_Logos+(3)/icon-above-font.svg';
import axios from 'axios';

function Signup() {
  
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const { data } = await axios.post("http://localhost:8080/api/users/signup", {
      nom,
      prenom,
      email,
      password,
    });
    setNom('');
    setPrenom('');
    setEmail('');
    setPassword('');
    console.log(data);
  
  };
  return (
    <div className="signupContainer">
      <img src={logoGroupomania} className="logoGroupomania" alt="logo" />
      <div className="signupMainContainer">
        <div className="title">INSCRIPTION</div>
        <form onSubmit={handleSubmit} className="signupForm">
          <input
            id="nom"
            className="inputForm"
            type="text"
            name="nom"
            placeholder="Votre nom"
            autoComplete="off"
            onChange={(e) => setNom(e.target.value)}
            value = {nom}
          />
          <input
            id="prenom"            
            className="inputForm"
            type="text"
            name="prenom"
            placeholder="Votre prenom"
            autoComplete="off"
            onChange={(e) => setPrenom(e.target.value)}
            value = {prenom}
          />
          <input
            id="email"           
            className="inputForm"
            type="email"
            name="email"
            placeholder="Votre email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value = {email}
          />
          <input
            id="password"           
            className="inputForm"
            type="text"
            name="password"
            placeholder="Votre mot de passe"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value = {password}
          />
          <button  className="submit">Sign Up</button>
          <NavLink to="/">
            <p>Déjà inscrit(e), connectez-vous</p>
          </NavLink>
        </form>
      </div>
    </div>
  );
}
export default Signup;