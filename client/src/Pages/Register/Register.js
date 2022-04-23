import React, { useState } from 'react';

import Button from '@mui/material/Button'; 
import TextField from '@mui/material/TextField';
import '../Login/login-register.css';
import logo from '../../assets/images/icon-left-font-monochrome-black.svg'
import { NavLink, useNavigate} from 'react-router-dom';
import axios from '../../API/axios';
import { Typography } from '@mui/material';
const signUpUrl = '/users/signup'
const Register = () => {

    let navigate = useNavigate();

    const[nom, setNom] = useState('');
    const[prenom, setPrenom] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const[nomErr, setNomErr] = useState(false)
    const[prenomErr, setPrenomErr] = useState(false);
    const[emailErr, setEmailErr] = useState(false)
    const[passwordErr, setPasswordErr] = useState(false);
    const[signupErr, setSignupErr] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setNomErr(false)
        setPrenomErr(false)
        setEmailErr(false)
        setPasswordErr(false)
        if(nom === '') {
            setNomErr(true)
        }
        if(prenom === '') {
            setPrenomErr(true)
        }
         if(email === '') {
             setEmailErr(true)
         }
         if(password === '') {
             setPasswordErr(true)
         }
 
        if(nom && prenom && email && password) {
            try {
                const response = await axios.post(signUpUrl,
                  JSON.stringify({nom, prenom, email, password}),
                  {
                      headers: {'Content-Type': 'application/json'}
                  });
                  console.log(JSON.stringify(response.data))
                  setNom('');
                  setPrenom('');
                  setEmail('');
                  setPassword('');
                  if(response.data.signup === true) {
                      navigate('/')
                  }
             } catch(err) {
              setSignupErr("L'inscription à échouée")
             }  
        }
 
        
 
    }
    return (
     <div>
<div className="main-wrapper">
      <div className="left-wrapper">
        <img src={logo} 
        className="logo-login" 
        alt="Logo Groupomania"
        />
      </div>
      <div className="right-wrapper">
        <section>
          <h1 className="title">CONNEXION</h1>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className="field">
              <TextField
                onChange={(event) => setNom(event.target.value)}
                id="outlined-basic"
                label="Nom"
                type="text"
                variant="outlined"
                color="tertiary"
                fullWidth
                required
                error={nomErr}
              />
            </div>
            <div className="field">
              <TextField
                onChange={(event) => setPrenom(event.target.value)}
                id="outlined-basic"
                label="Prénom"
                type="text"
                variant="outlined"
                color="tertiary"
                fullWidth
                required
                error={prenomErr}
              />
            </div>
            <div className="field">
              <TextField
                onChange={(event) => setEmail(event.target.value)}
                id="outlined-basic"
                label="Email"
                type="email"
                variant="outlined"
                color="tertiary"
                fullWidth
                required
                error={emailErr}
              />
            </div>
            <div className="field">
              <TextField
                onChange={(event) => setPassword(event.target.value)}
                id="outlined-basic"
                label="Mot de passe"
                type="password"
                variant="outlined"
                color="tertiary"
                fullWidth
                required
                error={passwordErr}
              />
            </div>     
            <Button
              variant="contained"
              onClick={() => console.log("click!!")}
              type="submit"
            >
              INSCRIPTION
            </Button>
          </form>
        </section>
        <section className="linkBottom">
          <p className="textContent">Déjà Inscrit(e) ?</p>
          <NavLink className="linkToRegister" to="/">
            <span> Se connecter</span>
          </NavLink>
        </section>
        <Typography variant="body1" component="p" sx={{mt:2}}>
         Copyright (C) - Groupomania 2022
       </Typography>
      </div>
    </div>
        <section className="alert">
        <span className="errMsg">{signupErr}</span>
        </section>
     </div>
    )
};

export default Register;