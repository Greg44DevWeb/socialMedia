import React, {useState, useRef, useEffect, useContext} from 'react';

import '../Pages/Styles/Style.css'
import logo from '../Assets/images/icon.png';
import {NavLink} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from  '../API/axios';
import AuthContext from '../Context/AuthProvider';

const LOGIN_URL = '/users/login';

const Login =() => {

    const navigate = useNavigate();

    const {setAuth} =useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        navigate('/home');

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
        
            setAuth({ email, password, accessToken });
            setEmail('');
            setPassword('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Le server ne répond pas');
            } else if (err.response?.status === 400) {
                setErrMsg('Email ou Mot de passe incorrect');
            } else if (err.response?.status === 401) {
                setErrMsg('Non authorisé(e)');
            } else {
                setErrMsg('Connexion échouée');
            }
            errRef.current.focus();
        }
}

    return (
        <>

            {success ? (
                <section>
                   
                </section>
                ) : (
            <div className="wrapper">
                <section className="left-content">
                    <img src={logo} className="logo" alt="Logo Groupomania"/>
                </section>
                <section className="right-content">
                <h1>SE CONNECTER</h1>
                    <form onSubmit={handleSubmit} className ="loginForm">
                        <input className="loginInput"
                        id="email"
                        name="email"
                        placeholder="Email"
                        type="email"
                        ref={userRef}
                        required
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    
                        
                        />
                        <input className="loginInput"
                        id="password"
                        name="password"
                        placeholder="Mot de passe"
                        type="password"
                        required
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        
                        />
                        <button className="submit" >SE CONNECTER</button>
                    </form>
                    <div className="errMsg">
                    <p id="msg" ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    </div>
                    <p>Première visite ?
                        <NavLink className="NavLink" to="/register">
                            <span className="link"> S'inscrire</span>
                        </NavLink>
                    </p> 
                </section>
            
            </div>
             )}
        </>
    );

};

export default Login;