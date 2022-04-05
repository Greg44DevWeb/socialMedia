import React, {useState, useRef, useEffect} from 'react'
//import authContext from '../../Context/AuthProvider';
import {NavLink} from 'react-router-dom';
import '../Login/loginStyle.css';
import logoGroupomania from '../../images/Groupomania_Logos+(3)/icon-above-font.svg';
import axios from 'axios';



function Login () {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
}, [])

useEffect(() => {
    setErrMsg('');
}, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const { data } = await axios.post("http://localhost:8080/api/users/login", {
      email,
      password,
    });
    setEmail('');
    setPassword('');
    setSuccess(true);
    console.log(data);
  }catch (err) {
    if (!err?.response) {
        setErrMsg('No Server Response');
    } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
    } else if (err.response?.status === 401) {
        setErrMsg('Identifiant / mot de passe incorrects');
    } else {
        setErrMsg('Login Failed');
    }
    errRef.current.focus();
}
  };
  return (
    <> 
    {success ? (
                <section>
                    <h1>Vous êtes maintenant inscrit(e)!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
    <div className="loginContainer">
    
        <img src={logoGroupomania} className="logoGroupomania" alt="logo" />
        <p id ="errMsg" ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <div className="container"> 
            <div className="title">CONNEXION</div>
                <form onSubmit={handleSubmit} className ="signupForm">
                    <input className ="inputForm" 
                      type ="email" 
                      name="email"
                      id="email"
                      ref={userRef}
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
                      ref={userRef}
                      placeholder="Votre mot de passe" 
                      required
                      onChange={(e) => setPassword(e.target.value)}
                     value = {password}
                     
                  />
                    <button  className="submit">Log In</button>
                    <NavLink to ="/register">
                      <p>Pas encore de compte ? inscrivez-vous</p>
                    </NavLink>
                </form>
        </div>
      </div>
        )}
    </>
  )
}

export default Login;