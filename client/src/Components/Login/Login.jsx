import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import '../Login/loginStyle.css';
import logoGroupomania from '../../images/Groupomania_Logos+(3)/icon-above-font.svg';
import axios from 'axios';


function Login () {

//*** PARAMETRAGE DES INFORMATIONS ***//
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {message, setMessage} = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const {data} = await axios.post("http://localhost:8080/api/users/login", {
      email,
      password,
      message,
    })
     console.log(data);
     if(!data){
      
     }else{
       localStorage.setItem("userId", data.userId);
       localStorage.setItem("token", data.token);
       setMessage(data.message)
       
       
     }
     setEmail('');
     setPassword('');
     setMessage('');
     
  }
  
  return (
    
    <div className="loginContainer">
        <img src={logoGroupomania} className="logoGroupomania" alt="logo" />
        
        <div className="container"> 
            <div className="title">CONNEXION</div>
                <form onSubmit={handleSubmit} className ="signupForm">
                    <input className ="inputForm" 
                      type ="email" 
                      name="email"
                      id="email"                    
                      placeholder="Votre email" 
                      required
                      autoComplete='off'
                      onChange={(e) => setEmail(e.target.value)}
                      value = {email}
                      
                  />
                     <input className ="inputForm" 
                      type ="password" 
                      name="password"
                      id="password" 
                      placeholder="Votre mot de passe" 
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      value = {password}                    
                  />
                    <button  className="submit" onClick>Log In</button>
                    <NavLink to ="/register">
                      <p>Pas encore de compte ? inscrivez-vous</p>
                    </NavLink>
            </form>            
        </div>
        <h1>  {message} </h1>
      </div> 
      
  )
}
export default Login;