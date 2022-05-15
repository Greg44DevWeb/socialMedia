import React  from 'react';

//*** COMPONENTS IMPORTS ***//
import Feed from '../Components/Feed';
import Rightbar from '../Components/Rightbar';
import Sidebar from '../Components/Sidebar/Sidebar.jsx';
import Navbar from '../Components/Navbar/Navbar';

//*** MATERIAL UI IMPORTS ***//
import { Box, Stack } from '@mui/material';

const Home = () => {

    return (
        <Box>
            <Navbar/>
            <Stack 
            direction="row" 
            spacing={2} 
            justifyContent="space-between"
            >
            <Sidebar/>
            <Feed/>
            <Rightbar/>
            </Stack>
        </Box>
    );
};

export default Home;