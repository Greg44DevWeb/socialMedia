import React, {useEffect, useState} from 'react';
import Navigation from '../Components/Navbar/Navigation';
import PostCard from '../Components/Card/PostCard';
import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import axios from '../API/axios';
import { Paper } from '@mui/material';


const POST_URL = '/post/getAll';


const Home = () => {
  const [posts, setPosts] = useState ([]);


  useEffect(() => {
    axios.get(POST_URL,
    {
        headers: {
          'Content-Type': 'application/json',
         Authorization : `Bearer ${localStorage.getItem('token')}`}
    })
  .then((res)=>setPosts(res.data))
  console.log(posts)
 
  },[]);
 
    return (
      <div>
        <Navigation />
        <Container maxWidth="sm" component="section" sx={{ mt: 8 }}>
          <Grid container spacing={3}>
            <Grid component="article" item xs={12} md={12} lg={12}>
              <PostCard posts={posts} />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
};

export default Home;