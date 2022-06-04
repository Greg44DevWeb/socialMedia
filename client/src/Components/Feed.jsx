import React, {useEffect, useState, useContext} from 'react';
import ScrollButton from './ScrollButton/ScrollButton.jsx';
import axios from '../API/axios.js'

//*** CONTEXT ***//
import { UserContext } from '../Context/userContext.js';

//*** MATERIAL UI IMPORTS ***//
import { Box } from '@mui/material';


//*** COMPONENTS IMPORTS ***//
import Postcard from './PostCard/Postcard.jsx';
import AddPost from './PostCard/AddPost.jsx';
import { Skeleton } from '@mui/material';
import { Stack } from '@mui/material';



//*** MATERIAL UI STYLES ***//



const getAllPost = '/post/getAll'; // request endpoint

const Feed = () => {

const {userToken} = useContext(UserContext);
const [posts, setPosts]= useState([]);
const [success, setSuccess] = useState(false)


     useEffect(() => {
       axios.get(getAllPost,
         {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
      }})
         .then((posts) => 
         setPosts(posts.data),
         setSuccess(true))
         .catch(err => setSuccess(false))
     }, []);

    

  return (
    //AFFICHAGE CONDITIONNEL DES POSTCARDS OU DES SKELETONS SELON L'ETAT DU LOGGIN
       <>
        {success === true ? (
        <Box flex={4} p={2}>
        
        {posts.map((post, index) => (
         <Postcard key={index} post={post}/> 
         
         ))}
         
        </Box>):(
         <Box flex={4} p={2}>
        <Stack spacing={1} width='100%' marginBottom={5}>
          <Skeleton variant='text'/>
          <Skeleton variant="circular" width={40} height={40}/>
          <Skeleton variant='rectangular' width='100%' height={125} />
          <Skeleton variant='text'/>
          <Skeleton variant='text'/>
          <Skeleton variant='text'/>
        </Stack>
        <Stack spacing={1} width='100%' marginBottom={5}>
          <Skeleton variant='text'/>
          <Skeleton variant="circular" width={40} height={40}/>
          <Skeleton variant='rectangular' width='100%' height={125} />
          <Skeleton variant='text'/>
          <Skeleton variant='text'/>
          <Skeleton variant='text'/>
        </Stack>
        <Stack spacing={1} width='100%' marginBottom={5}>
          <Skeleton variant='text'/>
          <Skeleton variant="circular" width={40} height={40}/>
          <Skeleton variant='rectangular' width='100%' height={125} />
          <Skeleton variant='text'/>
          <Skeleton variant='text'/>
          <Skeleton variant='text'/>
        </Stack>   
        </Box>
         )}
         <AddPost post={posts} /> 
         <ScrollButton/>
        </> 
    );
};

export default Feed;