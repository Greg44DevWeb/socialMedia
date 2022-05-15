import React from 'react'

//*** MATERIAL UI IMPORTS ***//
import { Box } from '@mui/material';

const Rightbar = () => {
    return (
        <Box 
        flex={3} 
        p={2} 
        
        sx={{ display: { xs: "none", sm: "block" } }}
        >
RightBar
        </Box>
    )
}

export default Rightbar