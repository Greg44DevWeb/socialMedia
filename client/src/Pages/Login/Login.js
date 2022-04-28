import React, {useState, useEffect} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import logo from '../../assets/images/icon-left-font-monochrome-black.svg'
import './login-register.css';
import { NavLink, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from '../../API/axios'
import { Typography } from "@mui/material";

const loginUrl = '/users/login'


const Login = () => {

   let navigate = useNavigate();
   
   const[email, setEmail] = useState('');
   const[password, setPassword] = useState('');
   const[emailErr, setEmailErr] = useState(false)
   const[passwordErr, setPasswordErr] = useState(false);
   const[err, setErr] = useState('');

  useEffect(() => {
    setErr('');
  },[email, password])

   const handleSubmit = async (event) => {
       event.preventDefault();
       setEmailErr(false)
       setPasswordErr(false)

        if(email === '') {
            setEmailErr(true)
        }
        if(password === '') {
            setPasswordErr(true)
        }
       if(email && password) {
           try {
              const response = await axios.post(loginUrl,
                JSON.stringify({email, password}),
                {
                    headers: {'Content-Type': 'application/json'}
                });
                console.log(JSON.stringify(response.data))
                
                if(response.data.loggedIn === true) {
                  const accessToken = response.data.token;
                  localStorage.setItem("token", (accessToken))
                  
                  navigate('/home')
                }
           } catch(err) {
            setEmail('')
            setPassword('')
            setErr('CONNEXION IMPOSSIBLE, REESSAYEZ')
           }
       }
   }

   
    
  return (
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
                onChange={(event) => setEmail(event.target.value)}
                id="outlined-basic"
                className="field"
                label="Email"
                type="email"
                variant="outlined"
                color="primary"
                fullWidth
                required
                error={emailErr}
                value={email}
              />
            </div>
            <div className="field">
              <TextField
                onChange={(event) => setPassword(event.target.value)}
                id="outlined-basic"
                className="field"
                label="Mot de passe"
                type="password"
                variant="outlined"
                color="tertiary"
                fullWidth
                required
                error={passwordErr}
                value={password}
              />
            </div>
            <Button
              variant="contained"
              onClick={() => console.log("click!!")}
              type="submit"
            >
              CONNEXION
            </Button>
          </form>
        </section>
        <section className="linkBottom">
          <p className="textContent">Première Visite ?</p>
          <NavLink className="linkToRegister" to="/register">
            <span> S'inscrire</span>
          </NavLink>
        </section>
        <Typography variant="body1" component="p" sx={{mt:2}}>
         Copyright (C) - Groupomania 2022
       </Typography>
      </div> 
      <section className="alert">
      <span className="errMsg">{err}</span>
      </section>
    </div>
  );
};

export default Login;
