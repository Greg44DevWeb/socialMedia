import React, { useState, useContext } from 'react';
import axios from '../../API/axios';

//*** CONTEXT ***//
import { UserContext } from '../../Context/userContext';

//*** MATERIAL UI IMPORTS ***//
import { Tooltip } from '@mui/material';
import { Fab } from '@mui/material';
import { Modal } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Avatar } from '@mui/material';
import { Stack } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { IconButton } from '@mui/material';
import { Input } from '@mui/material';
import { FormLabel } from '@mui/material';

//*** MATERIAL UI ICONS IMPORTS ***//
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ImageIcon from '@mui/icons-material/Image';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

//*** MATERIAL UI STYLES ***//
import styled from '@emotion/styled';


const StyledModal = styled(Modal) ({
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
})

const UserBox = styled(Box) ({
    display:"flex",
    alignItems:"center",
    gap:"10px",
    marginBottom:"10px"
})

//*** ENDPOINTS ***//
const addPost = '/post/';

//*** JSX METHOD ***//
const AddPost = ({posts}) => {
  const { userToken } = useContext(UserContext);

  const [text, setText] = useState("");
  const [authorId, setAuthorId] = useState(userToken.userId);
  const [imageUrl, setImageUrl] = useState("");
 
  const [openPostModal, setOpenPostModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [apiMsg, setApiMsg] = useState("");

  // Annulation du post et refresh du contenu
  const CancelledAction = () => {
    setOpenPostModal(false);
    setText("");
    setImageUrl(null)
  };
  // Soumission du formulaire avec les donn??es text, imageUrl et AuthorId
  const handlePostSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('text' , text)
    formData.append('imageUrl', imageUrl)
    formData.append('authorId', userToken.userId)

    setAuthorId(userToken.userId);
    if(authorId === userToken.userId) {
        axios.post(
          addPost,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) =>{
          console.log(( res))
          console.log( ({ formData }))
          setApiMsg(res.data.message);
          setOpenAlert(true)
          setText('')
          setImageUrl('')
          setOpenPostModal(false)
      })
      .catch((err)=> {
        setOpenAlert(true)
        setApiMsg(err.message) 
      })   
    }
  };
  // Fermeture manuelle ou apr??s 6 secondes automatique
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  return (
    <>
      <Tooltip
        onClick={(e) => setOpenPostModal(true)}
        title="Ecrire un post"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="faire un nouveau post">
          <AddOutlinedIcon />
        </Fab>
      </Tooltip>
      <StyledModal
        open={openPostModal}
        onClose={(e) => setOpenPostModal(false)}
        aria-labelledby="fen??tre-du-post"
        aria-describedby="fen??tre-ajout-post"
      >
        <Box 
        width={500} 
        height={350} 
        bgcolor="#f0efed" 
        p={3} 
        borderRadius={3}>
          <Typography 
          variant="h6" 
          color="gray" 
          textAlign="center">
            Cr??er une publication
          </Typography>
          <UserBox>
            <Avatar src={userToken.imageUrl} />
            <Typography 
            fontWeight={900} 
            variant="span">
              {userToken.lastname} {userToken.firstname}
            </Typography>
          </UserBox>
          <Box
            component="form"
            fullWidth
            onSubmit={handlePostSubmit}
          >
            <TextField
              onChange={(event) => setText(event.target.value)}
              fullWidth
              id="CommentInput"
              type="text"
              multiline
              rows={4}
              variant="standard"
              placeholder="Quoi de neuf ?"
              value={text}
            ></TextField>
            <Stack direction="row" gap={1} mt={2} mb={3}>
              <IconButton>
                <PersonAddIcon color="disabled" />
              </IconButton>
              <Input
                onChange={(event) => setImageUrl(event.target.files[0])}
                accept="image/*"
                id="icon-button-file"
                type="file"
                style={{ display: "none" }}
                name="image"
              />
              <FormLabel htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  onClick={console.log("Click")}
                >
                  <ImageIcon />
                </IconButton>
              </FormLabel>
              
              <IconButton>
                <VideoCameraBackIcon 
                color="disabled" />
              </IconButton>
              <IconButton>
                <SentimentSatisfiedAltIcon 
                color="disabled" />
              </IconButton>
            </Stack>
            <ButtonGroup
              fullWidth
              size="small"
              variant="contained"
              aria-label="boutons validation ou annulation"
            >
              <Button
                color="success"
                onSubmit={handlePostSubmit}
                type="submit"
              >
                Publier
              </Button>
              <Button
                color="error"
                sx={{ width: "100px" }}
                onClick={CancelledAction}
              >
                <CancelPresentationIcon />
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </StyledModal>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} 
        variant="filled" 
        severity="success" 
        sx={{ width: "100%" }}>
          {apiMsg}!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddPost;