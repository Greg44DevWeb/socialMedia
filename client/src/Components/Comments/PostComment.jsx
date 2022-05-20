import React, { useContext } from 'react';
import axios from '../../API/axios';

//*** CONTEXT ***//
import { UserContext } from '../../Context/userContext';

//*** MATERIAL UI IMPORTS **/*/
import { IconButton } from '@mui/material';

//*** MATERIAL ICONS IMPORTS */
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';

//*** ENPOINTS ***//
const postOneComment = 'comment/'


const PostComment = () => {
    const {userToken} = useContext(UserContext);
    console.log(userToken)

    const handlePostComment = (e) => {
        
        axios.post(postOneComment,{ 
          headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`
   }})
          .then((res) => {
            
           })
           .catch((err) => {
             console.log(err);
           }); 
     }


    return (
        <div>
            <IconButton
              aria-label="Commenter"> 
                <InsertCommentOutlinedIcon onClick={handlePostComment}/> 
              </IconButton>
        </div>
    );
};

export default PostComment;