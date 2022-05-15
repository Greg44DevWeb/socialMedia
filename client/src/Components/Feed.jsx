import React, {useEffect, useState, useContext} from 'react';
import axios from '../API/axios.js'

//*** CONTEXT ***//
import { UserContext } from '../Context/userContext.js';

//*** MATERIAL UI IMPORTS ***//
import { Box } from '@mui/material';


//*** COMPONENTS IMPORTS ***//
import Postcard from './PostCard/Postcard.jsx';

//*** MATERIAL UI STYLES ***//



const getAllPost = '/post/getAll'; // request endpoint

const Feed = () => {

const {token} = useContext(UserContext);
const [posts, setPosts]= useState([]);


     useEffect(() => {
       axios.get(getAllPost,
         {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
      }})
         .then((posts) => setPosts(posts.data))
     }, []);

    return (
       
        <Box flex={4} p={2}>
        
        {posts.map((post, index) => (
         <Postcard key={index} post={post}/> 
         ))}
        
        </Box>
       
    );
};

export default Feed;