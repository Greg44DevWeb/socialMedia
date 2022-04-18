
import { IconButton } from '@mui/material';
import {Card} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { Avatar } from '@mui/material';


const PostCard = ({post, handleDelete}) => {
console.log(post)
   
    return (
     
          <Card 
          component="article">
            <CardHeader
            avatar={
              <Avatar 
              src={post.imageUrl}
              alt={post.prenom}>
              
            </Avatar>
            } 
            action ={
              <IconButton onClick={() => handleDelete(post.postId) }>
              <DeleteIcon/>
              </IconButton> }
              title={post.prenom + ' a posté le :'}
              subheader={post.date}
              />
              <CardContent>
                <Typography variant="body2" color="text">
                  {post.text}
                </Typography>
              </CardContent>
          </Card>
        
    );
};

export default PostCard;