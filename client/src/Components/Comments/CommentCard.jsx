import { Typography } from '@mui/material';
import React, {useContext} from 'react';

//*** CONTEXT ***//
import { UserContext } from '../../Context/userContext';

const CommentCard = ({comment}) => {
    const { userToken } = useContext(UserContext);
    console.log(userToken.firstname)

    console.log("Contenu du commentaire" + comment.comment);
    console.log("ID du commentaire" + comment.idComment);
    console.log("Id du post du Commentaire" + comment.postId);
    

    // if(comment.postId === postId) {
    //     console.log('ok')
    // }else{
    //     console.log('ca marche pas')
    // }
    
    return (
        <div>

            <Typography variant="H5" color="text.main">{userToken.firstname}  a commenté :</Typography>
            <Typography variant="body2">{comment.comment}</Typography>
        </div>
    );
};

export default CommentCard;