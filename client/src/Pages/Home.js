import React, {useEffect, useState} from 'react';
import Navigation from '../Components/Navbar/Navigation';
import PostCard from '../Components/Card/PostCard';
import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import axios from '../API/axios';
import { Paper } from '@mui/material';


const POST_URL = '/post/getAll';
const DELETE_POST_URL ='post/id/';

const Home = () => {
  const [data, setData] = useState ([]);


  useEffect(() => {
    axios.get(POST_URL,
    {
        headers: {'Content-Type': 'application/json'}
    })
  .then((res)=>setData(res.data))
 
  },[]);

    const handleDelete = async (id) => {
     try { 
      await axios.delete(DELETE_POST_URL + id,
        {
          headers: {'Content-Type': 'application/json'}
      })
      .then((res)=>console.log(res.data))
        const newPost = data.filter(data => data.postId !== id)
        setData(newPost)
      }catch(err){
        console.log(err);
      }
    }

    return (
      <div>
           
            <Navigation />
            <Container maxWidth="sm" component="section" sx={{mt : 8}}>
                 <Grid container spacing={3}>
              {data.map((post, index) => (
                <Grid item key={index} xs={12} md={12} lg={12}>
                  <Paper elevation={10}>
                    <PostCard  post={post} handleDelete={handleDelete}/>
                  </Paper>
             </Grid>))}
             </Grid>
          </Container>
      </div>
    );
};

export default Home;