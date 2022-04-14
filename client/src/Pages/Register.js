import React, {useState} from 'react';
import '../Pages/Styles/Styles.css'
import logo from '../Assets/images/icon.png';
import { NavLink, useNavigate} from 'react-router-dom';
import axios from 'axios';


function Register () {
    const [email, setEmail]=useState('');
    const [password, setPassword] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    
    function submit (event) {
		event.preventDefault();
        
			const data = axios.post('http://localhost:8080/api/users/signup', {
                nom,
                prenom,
				email,
				password,
			}).then (response => data)
            if (data.length>0) {
                setMsg(data.message); 
            } 
		}
    return (
        <div className="wrapper">
            <section className="left-content">
                <img src={logo} className="logo" alt="Logo Groupomania"/>
            </section>
            <section className="right-content">
                <h1>S'ENREGISTRER</h1>
                <form onSubmit={submit} className ="loginForm">
                <input className="loginInput"
                    name="nom"
                    placeholder="Votre Nom"
                    type="text"
                    required
                    autoComplete="off"
                    onChange={(event) => {
                        setNom(event.target.value);
                      }}
                    />
                     <input className="loginInput"
                    name="prenom"
                    placeholder="Votre Prénom"
                    type="text"
                    required
                    autoComplete="off"
                    onChange={(event) => {
                        setPrenom(event.target.value);
                      }}
                    />
                    <input className="loginInput"
                    name="email"
                    placeholder="Email@groupomania.fr"
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
                    <button classname="submit" type="submit">S'INSCRIRE</button>
                </form>
                <h1 style={{ color: "red" }}>{msg} </h1>
                <p>Déjà inscrit(e) ? </p> 
                    <NavLink className="NavLink" to="/">
                        <span className="link">Se connecter</span>
                    </NavLink>
            </section>
        </div>
    );
};

export default Register;