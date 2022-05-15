import React, {useState, useContext} from 'react';

//*** CONTEXT ***//
import { UserContext } from '../../Context/userContext';

//*** MATERIAL UI IMPORTS ***//
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { InputBase } from '@mui/material';
import { Avatar } from '@mui/material';
import { Typography } from '@mui/material';
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';


//*** MATERIAL UI STYLES ***//
const Search= styled("div") (({theme})=>({
    backgroundColor: "white",
    padding:"0 10px",
    borderRadius: theme.shape.borderRadius,
    width: "40%",
}))


const Icons = styled(Box) (({ theme }) => ({
    display: "flex",
    gap: "20px",
    alignItems:"center",
}))


//*** JSX METHOD ***//
const Searchbar = () => {
  
  const { userToken } = useContext(UserContext);
  const [openMenu, setOpenMenu] = useState(false);
  
  
  
    
    return (
        <>
        <Search><InputBase placeholder="Rechercher..."/></Search>
        <Icons> 
            <Avatar
            sx={{ width:35, height:35}}
          onClick={(e) => setOpenMenu(true)}  
            />
        <Typography>{userToken.firstname}</Typography>
        </Icons>
        <Menu   
        sx={{ display : { xs:"block", sm:"block" } }}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={openMenu}
        onClose={(e) => setOpenMenu(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem >Mon Profil</MenuItem>
        <MenuItem >Mon compte</MenuItem>
        <MenuItem >Déconnexion</MenuItem>
      </Menu> 
        </>
    );
};

export default Searchbar;