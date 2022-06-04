import React, { useState, useContext} from 'react';
import axios from '../../API/axios';

//*** CONTEXT ***//
import { UserContext } from '../../Context/userContext';

//*** MATERIAL UI IMPORTS ***//
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';

//*** MATERIAL UI ICONS IMPORTS ***//
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';




//*** JSX METHOD ***//
const MenuActions = ({post}) => {

const deleteCardPost = `/post/${post.postId}` // ENDPOINT REQUEST

const { userToken, admin } = useContext(UserContext);
const [anchorEl, setAnchorEl] = useState(null);
const [openAlert, setOpenAlert] = useState(false)
const [ApiMsg, setApiMsg] = useState('')
const [success, setSuccess] = useState(false);
const [error, setError] = useState('');
const open = Boolean(anchorEl);

// Ouverture et fermeture du menu actions
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

 // Fermeture manuelle ou après 6 secondes automatique
 const handleCloseAlert = (e, autoHide) => {
   if (autoHide === "clickaway") {
     return;
   }
   setOpenAlert(false);
 };

// Suppression du post et de son contenu
  const handleDeletePost = () => {
    if (userToken.userId === post.authorId || admin === true) {
      axios
        .delete(deleteCardPost, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setAnchorEl(null);
          setSuccess(true)
          setApiMsg(res.data.message);
          setOpenAlert(true);
        })
        .catch((err) => {
          setSuccess(false)
          setError(err.message);
        });
    } else {
      setOpenAlert(true);
      setSuccess(false);
      setError('Une erreur est survenue');
    }
  };
    return (    
        <div>
            <MoreVertIcon  onClick={handleClick} />
            <Menu 
                sx={{ display : { xs:"block", sm:"block" } }}
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
            >
                <MenuItem 
                >Modifier mon post</MenuItem>
                <MenuItem 
                onClick={handleDeletePost}
                >Supprimer mon post</MenuItem>
                <MenuItem 
                    onClick={e=>setAnchorEl(null)}>
                    Annuler
                </MenuItem>
            </Menu>
            {success === true ? (
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={openAlert} 
                autoHideDuration={6000} 
                onClose={handleCloseAlert}>
                  <Alert
                    onClose={handleCloseAlert}
                    variant="filled"
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    {ApiMsg}
                  </Alert>
              </Snackbar>):( 
                 <Snackbar
                 anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                 open={openAlert} 
                 autoHideDuration={6000} 
                 onClose={handleCloseAlert}>
                   <Alert
                     onClose={handleCloseAlert}
                     variant="filled"
                     severity="error"
                     sx={{ width: "100%" }}
                   >
                     {error}
                   </Alert>
               </Snackbar>
               )}  
      </div>
    );
};

export default MenuActions;
