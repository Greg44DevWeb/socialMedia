
import { IconButton } from '@mui/material';
import {Card} from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { CardContent } from '@mui/material';
import { Typography, Paper } from '@mui/material';
import { Avatar } from '@mui/material';
import axios from '../../API/axios'
import Comments from '../Comments/Comments';
import SendComment from '../Comments/SendComment';
//import axios from 'axios';
const DELETE_POST_URL ='/post/';


const PostCard = ({ posts }) => {
  //const [data, setData] = useState ([]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(DELETE_POST_URL + `${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      posts.filter((posts) => posts.postId !== id);
      //setData(newPost)
    } catch (err) {
      console.log(err);
    }
  };

  console.log(posts);

  return (
    <>
      {posts.map((post) => {
        return (
          <Paper elevation={10}>
          <Card component="article" sx={{mt : 8}}>
            <CardHeader
              avatar={
                <Avatar
                  src={post.imageUrl}
                  alt={post.prenom}
                  component="header"
                ></Avatar>
              }
              action={
                <IconButton
                  component="button"
                  onClick={() => handleDelete(post.postId, post.id)}
                >
                  <DeleteIcon color="secondary" />
                </IconButton>
              }
              title={post.prenom + " a posté le :"}
              subheader={post.date}
              
            />
            <CardContent component="p">
              <Typography component="p" variant="button" color="neutral">
                {post.text}
              </Typography>
              <Comments/>
              <SendComment />
            </CardContent>
            
          </Card>
           
          
          </Paper>
        );
      })}
    </>
  );
};

export default PostCard;