import React, { useState, useContext } from 'react';

//*** CONTEXT ***//
import { UserContext } from '../../Context/userContext';

//*** COMPONENT IMPORT ***//
import axios from '../../API/axios';

//*** MATERIAL UI ICONS IMPORT ***//
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

//*** MATERIAL UI  IMPORT ***//
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

//*** JSX METHOD ***//
const DeleteComment = ({comment}) => {
 
    let deleteComment = `comment/${comment.idComment}`;
    const {userToken} = useContext(UserContext);
    const [success, setSuccess] = useState('');
    const [open, setOpen] = useState(false);
    
    // Fermeture manuelle ou après 6 secondes automatique
    const handleClose = (e, autoHide) => {
      e.preventDefault();
      if (autoHide === 'clickaway') {
        return;
      }
      setOpen(false);
    };
    
    // SuPpression du commentaire 
    const handleDeleteComment = (e) => {
    
       axios.delete(deleteComment,{ 
         headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
  }})
         .then((res) => {
            setSuccess(res.data.message);
            setOpen(true)
          })
          .catch((err) => {
            console.log(err);
          }); 
    }
    return (
      <div>
        <DeleteForeverIcon
          fontSize="small"
          color="secondary"
          onClick={handleDeleteComment}
        />
        <Snackbar 
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {success}!
          </Alert>
        </Snackbar>
      </div>
    );
};

export default DeleteComment;