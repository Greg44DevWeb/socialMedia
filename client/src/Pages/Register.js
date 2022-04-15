import React, { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Pages/Styles/Style.css';
import logo from '../Assets/images/icon.png';
import logoRegister from '../Assets/images/icon-left-font-monochrome-black.png';
import { NavLink} from 'react-router-dom';
import axios from '../API/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const Password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const MAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGISTER_URL = '/users/signup';

const Register = () => {
   
       const userRef = useRef();
       const errRef = useRef();

       const [nom, setNom] = useState('');
       const [validNom, setValidNom] = useState(false);
       const [nomFocus, setNomFocus] = useState(false);


       const [prenom, setPrenom] = useState('');
       const [validPrenom, setValidPrenom] = useState(false);
       const [prenomFocus, setPrenomFocus] = useState(false);

       const [email, setEmail] = useState('');
       const [validEmail, setValidEmail] = useState(false);
       const [emailFocus, setEmailFocus] = useState(false);

       const [password, setPassword] = useState('');
       const [validPassword, setValidPassword] = useState(false);
       const [passwordFocus, setPasswordFocus] = useState(false);

       const [errMsg, setErrMsg] = useState('');
       const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidPrenom(USER_REGEX.test(prenom));
    }, [prenom])

    useEffect(() => {
        setValidNom(USER_REGEX.test(nom));
    }, [nom])

    useEffect(() => {
        setValidEmail(MAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPassword(Password_REGEX.test(password));
    }, [password])

    useEffect(() => {
        setErrMsg('');
    }, [prenom, nom, email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(nom);
        const v2 = USER_REGEX.test(prenom);
        const v3 = MAIL_REGEX.test(email);
        const v4 = Password_REGEX.test(password);
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ nom, prenom, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            
            //console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setNom('');
            setPrenom('');
            setEmail('');
            setPassword('');
            
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Nom utilisateur déjà pris');
            } else {
                setErrMsg('Enregistrement échoué')
            }
            errRef.current.focus();
        }
    }
    return (
      <>
        {success ? (
          <section className="wrapperSuccess">
            <img src={logoRegister} className ="logoRegister" alt="logo Groupomania"/>
            <p>Vous êtes inscrit(e)!</p>
            <NavLink className="NavLink" to="/">
                  <span className="connected"> Se connecter</span>
            </NavLink>
          </section>
        ) : (
          <div className="wrapper">
            <section className="left-content">
              <img src={logo} className="logo" alt="Logo Groupomania" />
            </section>
            <section className="right-content">
              <h1>S'ENREGISTRER</h1>
              <form onSubmit={handleSubmit} className="loginForm">
                <label htmlFor="nom">
                  Nom :
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validNom ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validNom || !nom ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="text"
                  id="nom"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setNom(e.target.value)}
                  value={nom}
                  required
                  aria-invalid={validNom ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setNomFocus(true)}
                  onBlur={() => setNomFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    nomFocus && nom && !validNom ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
                <label htmlFor="prenom">
                  Prénom :
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPrenom ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validPrenom || !prenom ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="text"
                  id="prenom"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setPrenom(e.target.value)}
                  value={prenom}
                  required
                  aria-invalid={validPrenom ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setPrenomFocus(true)}
                  onBlur={() => setPrenomFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    prenomFocus && prenom && !validPrenom
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
                <label htmlFor="email">
                  Email :
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validEmail ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validEmail || !email ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="email"
                  id="email"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    emailFocus && email && !validEmail
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
                <label htmlFor="password">
                  Mot de passe :
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPassword ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validPassword || !password ? "hide" : "invalid"}
                  />
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  aria-invalid={validPassword ? "false" : "true"}
                  aria-describedby="Passwordnote"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                />
                <p
                  id="Passwordnote"
                  className={
                    passwordFocus && !validPassword
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
                <button classname="submit" type="submit">
                  S'INSCRIRE
                </button>
              </form>
              <div className="errMsg">
                <p
                  id="msg"
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
              </div>
              <p>
                Déjà inscrit(e) ?
                <NavLink className="NavLink" to="/">
                  <span className="link"> Se connecter</span>
                </NavLink>
              </p>
            </section>
          </div>
        )}
      </>
    );
};

export default Register;