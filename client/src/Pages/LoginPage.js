import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//*** MATERIAL UI IMPORTS ***//
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import logo from '../assets/images/icon-left-font-monochrome-black.svg'
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

//** COMPONENTS IMPORTS ***//
import axios from '../API/axios';

//*** MATERIAL UI STYLES ***//
import styled from '@emotion/styled';

const StyledBox =  styled(Box) ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '50px',
    marginBottom: '50px'
  });

const TextBox =  styled(Box) ({
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: '10px',
    marginTop: '50px',
    marginBottom: '50px'
  });

  const StyledForm =  styled(Box) ({
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  });

//***  API REQUEST URL ***//  
 

const LoginPage = () => {
    const loginUrl = '/users/login' 
    const navigate = useNavigate();

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[err, setErr] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
 
   useEffect(() => {
     setErr('');
     localStorage.clear();
     
   },[])
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        setOpenAlert(false)
        
         if(email === '' || password === '') {
             setOpenAlert(true)
             setErr('Identifiants invalides')
         }
        
         if(password.length < 5 || password.length > 10) {
             setOpenAlert(true)
             setErr('Mot de passe incorrect')
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
              setOpenAlert(true)
              setErr('CONNEXION IMPOSSIBLE, REESSAYEZ')
             }
         }
    }
    // Fermeture manuelle ou après 6 secondes automatique
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
      };
    return (
        <>
        <Box bgcolor={"background.default"} color={"text.primary"}>
            <StyledBox>
                <img src={logo} 
                alt="Logo Groupomania"
                />
                <Typography 
                    variant="h4">
                        le réseau social de votre entreprise
                </Typography>
                    <TextBox>
                        <Typography 
                            variant="body1"> 
                                Ce réseau vous permet de vous mettre en lien rapidement avec les autres collaborateurs de l'entreprise
                        </Typography>
                        <Typography 
                            variant="body1"> 
                            Pour entrer sur le réseau, veuillez vous connecter en remplissant le formulaire ci-dessous 
                            avec les informations fournies par l'administrateur du réseau
                        </Typography>
                </TextBox>
            <StyledForm component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
            onChange={(event) => setEmail(event.target.value)}
            id="emailInput" 
            size="small"
            fullWidth={true}
            label="Adresse Mail" 
            variant="outlined"
            type="email"
            required
            placeholder="exemple@groupomania.fr"
           
            value={email}
              />
              <TextField
            onChange={(event) => setPassword(event.target.value)}
            id="passwordInput" 
            size="small"
            fullWidth={true}
            label="Mot de passe" 
            variant="outlined"
            type="password"
            required
            
            value={password}
            />
           
            <Button 
            onClick={() => console.log("click!!")}
            size="small" 
            type="submit" 
            variant="contained">
              SE CONNECTER
            </Button> 
        </StyledForm>
            </StyledBox>
                <Typography
                textAlign={'center'} 
                variant="body2" 
                color="text" >
                Groupomania - Copyright 2022
                </Typography>  
        </Box>
         <Snackbar
         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
         open={openAlert}
         autoHideDuration={6000}
         onClose={handleClose}
       > 
         <Alert
           onClose={handleClose}
           variant="filled"
           severity="error"
           sx={{ width: "100%" }}
         >
           {err}
         </Alert>
       </Snackbar>
       </>
    );
};

export default LoginPage;