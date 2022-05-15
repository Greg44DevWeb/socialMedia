import React from 'react';

//*** CONTEXT ***//


//*** MATERIAL UI IMPORTS ***//
import { AppBar, Toolbar, styled } from '@mui/material';
import { Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

//*** COMPONENTS IMPORTS ***//
import Searchbar from './Searchbar';


//*** MATERIAL UI STYLES ***//
const StyledToolbar = styled(Toolbar) ({
    display:"flex",
    justifyContent:"space-between",
})


//*** JSX METHOD ***//
const Navbar = () => {

    return (
      <AppBar position="sticky">
        <StyledToolbar> 
          <Typography 
          variant="h6"
          sx={{ display : { xs:"none", sm:"block" } }}
          >GROUPOMANIA
          </Typography>
          <LanguageIcon
          sx={{ display : { xs:"block", sm:"none" } }}
          />
           <Searchbar/>
        </StyledToolbar>
        
      </AppBar>
    );
};

export default Navbar;