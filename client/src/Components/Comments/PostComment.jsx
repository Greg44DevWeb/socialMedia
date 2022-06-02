import React, { useContext, useState } from 'react';
import axios from '../../API/axios';

//*** CONTEXT ***//
import { UserContext } from '../../Context/userContext';

//*** MATERIAL UI IMPORTS **/*/
import { IconButton } from '@mui/material';
import { Modal } from '@mui/material';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

//*** MATERIAL ICONS IMPORTS */
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';

//*** MATERIAL UI STYLES ***//
import styled from '@emotion/styled';

const StyledModal = styled(Modal) ({
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
})

//*** ENPOINTS ***//
const postOneComment = "/comment/addComment";

//*** JSX METHOD ***//

const PostComment = ({post}) => {

    const {userToken} = useContext(UserContext);   

    const [comment, setComment] = useState('');
    const [authorId, setAuthorId] = useState(userToken.userId);
    const [postId, setPostId] = useState(post.postId);

    const [openModal, setOpenModal] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [apiMsg, setApiMsg] = useState('');

    

    const handleSubmitComment = async (e) => {
      e.preventDefault();

      setAuthorId(userToken.userId);
      setComment(e.target.value);
      setPostId(post.postId);
      setOpenModal(false);
     
      if (authorId === userToken.userId) {
        axios
          .post(
            postOneComment,
            JSON.stringify({ comment, authorId, postId }),
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {

            setApiMsg(res.data.message);
            setOpenAlert(true);
            
          })
          .catch((err) => {
            setOpenAlert(true);
            setApiMsg(err.message);
          });
      }
    };
    // Fermeture manuelle ou après 6 secondes automatique
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlert(false);
    };

    return (
      <div>
        <IconButton onClick={(e) => setOpenModal(true)} aria-label="Commenter">
          <InsertCommentOutlinedIcon />
        </IconButton>
        <StyledModal
          open={openModal}
          onClose={(e) => setOpenModal(false)}
          aria-labelledby="ajout d'un commentaire"
          aria-describedby="fenetre d'ajout d'un commentaire"
        >
          <Box width={400} height={200} bgcolor="White" p={3} borderRadius={3}>
            <Typography variant="h6" color="gray" textAlign="center">
              Commenter le post de {post.prenom}
            </Typography>
            <Box
              component="form"
              method="POST"
              onSubmit={handleSubmitComment}
              fullWidth
            >
              <TextField
                onChange={(event) => setComment(event.target.value)}
                fullWidth
                id="CommentInput"
                type="text"
                multiline
                rows={4}
                variant="standard"
                placeholder="Que pensez vous ?"
                value={comment}
              ></TextField>
              <Button
                onClick={() => console.log("click!!")}
                type="submit"
                fullWidth
              >
                poster le commentaire
              </Button>
            </Box>
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
            severity="success"
            sx={{ width: "100%" }}
          >
            {apiMsg}!
          </Alert>
        </Snackbar>
      </div>
    );
};

export default PostComment;