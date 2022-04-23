import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { Box } from '@mui/material';
import React, {useState, useEffect} from 'react';
import axios from '../../API/axios'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {deepPurple} from '@mui/material/colors'
import SendComment from './SendComment';
const getComment = '/comment/'

const Comments = ({coms}) => {
    const [data, setData] = useState ([]);

    useEffect(() => {
        
        axios.get(getComment,
        {
            headers: {
              'Content-Type': 'application/json',
             Authorization : `Bearer ${localStorage.getItem('token')}`}
        })
      .then((res)=>setData(res.data))
        
     
      },[]);
    return (
      <>
        {data.map((com) => {
          return (
              
            <List
              sx={{ width: "100%", maxWidth: 450, bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar  sx={{ width: 30, height: 30, bgcolor: deepPurple[500] }} 
                  alt={com.prenom} 
                  src={com.imageUrl} />
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
                        {com.prenom}
                      </Typography>
                      <Typography variant="body2" color="text">
                        {com.comment}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              
            </List>
            
            
           
          );
        }
        )}
      </>
    );
};

export default Comments;