import React, {useState, useEffect} from 'react';

//*** MATERIAL UI IMPORTS ***//
import { Modal } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Button } from '@mui/material';

//*** MATERIAL UI STYLES ***//
import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import axios from '../../API/axios';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

//*** MATERIAL UI COLORS ***//
import { red } from '@mui/material/colors';

const StyledModal = styled(Modal) ({
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
})

const StyledForm =  styled(Box) ({
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  });

 //*** ENDPOINTS REQUESTS *//
 const userSubscribe = '/users/signup';

//*** JSX METHOD ***//
const Subscribe = () => {
    
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [openModal, setOpenModal] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const[apiMsg, setApiMsg] = useState('');
    const [success, setSuccess] = useState(false)
   
    
   
    useEffect(() => {
        setNom('');
        setPrenom('')
        setEmail('');
        setPassword('')
      },[])
    
    const handleSubscribeSubmit = (event) => {
    event.preventDefault();
    setOpenModal(false);
     axios.post(userSubscribe,
        JSON.stringify({nom, prenom, email, password}),
        {
            headers: {'Content-Type': 'application/json'}
        })
        .then((res) => {
            console.log(res)
            
              setOpenAlert(true);
              setSuccess(true)
              setApiMsg(res.data.message)
             
          })
          .catch((error) => {
            setSuccess(false)
            setOpenAlert(true);
            setApiMsg('Cet email est déjà enrigistré pour un autre utilisateur');
            setNom('');
            setPrenom('')
            setEmail('');
            setPassword('')

          });

}
    // Fermeture manuelle ou après 6 secondes automatique
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
      };
    return (
        <div>
           <Typography onClick={(e) => setOpenModal(true)} aria-label="Inscription">Inscrire un utilisateur</Typography>
      <StyledModal
        open={openModal}
        onClose={(e) => setOpenModal(false)}
        aria-labelledby="ajout d'un commentaire"
        aria-describedby="fenetre d'ajout d'un commentaire"
      >
        <Box width={500} height="auto" bgcolor="White" p={3} borderRadius={3}>
          <Typography sx={{mb:'10px'}}id="modal-modal-title"  variant="h6" textAlign="center">
            INSCRIRE UN NOUVEL UTILISATEUR
          </Typography>
          <StyledForm component="form" noValidate autoComplete="off" onSubmit={handleSubscribeSubmit}>
          <TextField
            onChange={(event) => setNom(event.target.value)}
            id="firstname" 
            size="small"
            fullWidth={true}
            label="Nom de l'utilisateur" 
            variant="outlined"
            type="text"
            required
            placeholder="Nom de l'utilisateur"
            //error={emailErr}
            value={nom}
              />
              <TextField
            onChange={(event) => setPrenom(event.target.value)}
            id="lastname" 
            size="small"
            fullWidth={true}
            label="Prénom de l'utilisateur" 
            variant="outlined"
            type="text"
            required
            placeholder="Prénom de l'utilisateur"
            //error={emailErr}
            value={prenom}
              />
              <TextField
            onChange={(event) => setEmail(event.target.value)}
            id="email" 
            size="small"
            fullWidth={true}
            label="Email de l'utilisateur" 
            variant="outlined"
            type="Email"
            required
            placeholder="exemple@groupomania.fr"
            //error={emailErr}
            value={email}
              />
              <TextField
            onChange={(event) => setPassword(event.target.value)}
            id="firstname" 
            size="small"
            fullWidth={true}
            label="Mot de passe" 
            variant="outlined"
            type="password"
            required
            placeholder="Mot de passe"
            //error={emailErr}
            value={password}
              />
               <Button 
            onClick={() => console.log("click!!")}
            size="small" 
            type="submit" 
            variant="contained">
              Inscrire sur la plateforme
            </Button> 
              </StyledForm>
        </Box>
      </StyledModal>
      <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        > 
          <Alert
            onClose={handleClose}
            variant="filled"
            severity={success ? 'success' : 'error'}
            sx={{ width: "100%" }}
          >
            {apiMsg}
          </Alert>
        </Snackbar>
        </div>
    );
};
export default Subscribe;