import React, {useContext} from 'react';

//*** CONTEXT ***//
import { UserContext } from '../../Context/userContext';

//*** MATERIAL UI IMPORTS ***//
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

//*** COMPONENT IMPORT ***//
import DeleteComment from './DeleteComment';

//*** MATERIAL UI STYLES ***//
const DeleteButton = styled("div") (({theme})=>({
    backgroundColor: "white",
    display: "flex",
    gap: "20px",
    justifyContent:"space-between",
    alignItems:"center",
    padding:"0 10px",
    borderRadius: theme.shape.borderRadius,
    width: "100%",
}));


const CommentCard = ({comment}) => {
    const { userToken } = useContext(UserContext);
    
    return (
        <div>
            <DeleteButton>
                <Typography 
                variant="subtitle2" 
                color="text.main">
                    {comment.nom} {comment.prenom}  a commenté :
                </Typography>
                {comment.authorId === userToken.userId || userToken.admin === 1 ? (   
                < DeleteComment comment={comment} />   ):
                ('')
                }
            </DeleteButton>
                <Typography 
                variant="body2"
                sx={{mb: 2}}>
                    "{comment.comment}"
                </Typography>  
        </div>
    );
};

export default CommentCard;