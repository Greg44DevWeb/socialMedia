//*** LIBRARIES ****//
import React, {useState, useEffect} from 'react';
import axios from '../../API/axios'
import {PostCard} from '../Card/PostCard';
//*** LIBRARIES MATERIAL UI ***//
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Typography } from '@mui/material';
import {ListItemText} from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {deepPurple} from '@mui/material/colors'

//***COMPONENTS ***//
//import SendComment from './SendComment';

const getCommentByPostId = '/comment/:postId'

const Comments = (PostId) => {
  console.log(PostId)
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(getCommentByPostId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setData(res.data));
  }, []);

  return (
    <>
      {data.map((comment, index) => {
        return (
          <List
            sx={{
              width: "100%",
              maxWidth: 450,
              bgcolor: "background.paper",
            }}
          >
            <ListItem key={index} component="li" alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  sx={{ width: 30, height: 30, bgcolor: deepPurple[500] }}
                  alt={comment.prenom}
                  src={comment.imageUrl}
                />
              </ListItemAvatar>
              <ListItemText
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="subtitle2"
                      color="text.primary"
                    >
                      {comment.date}
                    </Typography>
                    <Typography variant="body2" color="text" component="p">
                      {comment.comment}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </List>
        );
      })}
    </>
  );
};

export default Comments;