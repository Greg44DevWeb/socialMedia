import React from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';

import './nav.css';

const NavbarTop = () => {
    return (
      <div className="position-fixed">
        <section className="nav-wrapper">
          <section className="nav-button">
          <div className="spaced">  
              <Button color="secondary" variant="contained">
                <LogoutIcon />
              </Button>
            </div>
            <div className="spaced">
              <Button color="tertiary" variant="contained">
                MON PROFIL
              </Button>
            </div>
            <div className="search-area spaced">
              <TextField
                //onChange={(event) => setSearch(event.target.value)}
                id="outlined-basic"
                label="RECHERCHER UN UTILISATEUR"
                variant="outlined"
                color="tertiary"
                fullWidth
                size="small"
              />
            </div>
            <div className="spaced avatar"> 
            <Avatar 
            alt="Remy Sharp" 
            src="/static/images/avatar/1.jpg" />
            </div>
          </section>
        </section>
      </div>
    );
};

export default NavbarTop;
