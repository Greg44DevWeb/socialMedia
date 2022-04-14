import React, {useState} from 'react';
import '../Pages/Styles/Styles.css'
import logo from '../Assets/images/icon.png';
import {NavLink} from 'react-router-dom';
import axios from 'axios';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const submit = async (event) => {
		event.preventDefault();
        
			const { data } = await axios.post('http://localhost:8080/api/users/login', {
				email,
				password,
            
			});
            console.log(data);
           
            if (!data) {
            
            }else{
           
			localStorage.setItem('token', JSON.stringify(data.token)); 
            }
		}

    return (
        <div className="wrapper">
            <section className="left-content">
                <img src={logo} className="logo" alt="Logo Groupomania"/>
            </section>
            <section className="right-content">
            <h1>SE CONNECTER</h1>
                <form onSubmit={submit} className ="loginForm">
                    <input className="loginInput"
                    name="email"
                    placeholder="Email"
                    type="email"
                    required
                    autoComplete="off"
                    onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                    <input className="loginInput"
                    name="password"
                    placeholder="Mot de passe"
                    type="password"
                    required
                    autoComplete="off"
                    onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                    <button className="submit" >SE CONNECTER</button>
                </form>
               
                <p>Première visite ? </p> 
                    <NavLink className="NavLink" to="/register">
                        <span className="link">S'inscrire</span>
                    </NavLink>
                
            </section>
           
        </div>

    );
};

export default Login;