import React, {useState, useEffect, useRef} from 'react'
import '../Signup/signupStyle.css';
import {NavLink} from 'react-router-dom'
import logoGroupomania from '../../images/Groupomania_Logos+(3)/icon-above-font.svg';
import axios from 'axios';



function Signup() {
  const userRef = useRef();
  const errRef = useRef();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
}, [])

  useEffect(() => {
    setErrMsg('');
}, [nom, prenom, email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
          <h1>You are logged in!</h1>
          <br />
          <p>
              <a href="#">Go to Home</a>
          </p>
      </section>
  ) : (
    <div className="signupContainer">
      <img src={logoGroupomania} className="logoGroupomania" alt="logo" />
      <p id ="errMsg" ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <div className="signupMainContainer">
        <div className="title">INSCRIPTION</div>
        <form onSubmit={handleSubmit} className="signupForm">
          <input
            id="nom"
            ref={userRef}
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
            ref={userRef}
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
            ref={userRef}
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
            ref={userRef}
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
  )}
  </>
  );
}
export default Signup;