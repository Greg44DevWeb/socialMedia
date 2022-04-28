import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { AppBar, Toolbar, Box } from '@mui/material';
import { Typography, Avatar } from '@mui/material';
import { TextField, InputAdornment } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Search from '@mui/icons-material/Search';
import { Container, Button } from '@mui/material';

const Navbar = () => {

 //*** LOGOUT FUNCTION ****// 
let navigate = useNavigate();
function handleClick(e) {
  e.preventDefault();
  localStorage.clear();
  navigate("/");
}

    return (
      <Container component="header">
        <AppBar
        component="NavBar"
          sx={{
            width: "100%",
            position: "fixed",
          }}
        >
          <Toolbar>
            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 1,
                fontSize: "h6.fontSize",
              }}
            >
              <LogoutIcon onClick={handleClick} sx={{ mr: 10 }} />
            </Typography>
            <TextField
              focused={true}
              color="neutral"
              id="input-with-icon-textfield"
              label="Rechercher un utilsateur"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="neutral" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="small"
              sx={{ mr: 10 }}
            />
            <Avatar />
          </Toolbar>
        </AppBar>
      </Container>
    );
};
export default Navbar;
