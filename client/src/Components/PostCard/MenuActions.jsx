import React, { useState, useContext} from 'react';

//*** CONTEXT ***//
import { UserContext } from '../../Context/userContext';

//*** MATERIAL UI IMPORTS ***//
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';

//*** MATERIAL UI ICONS IMPORTS ***//
import MoreVertIcon from '@mui/icons-material/MoreVert';

const MenuActions = (post) => {

const { userToken } = useContext(UserContext);

const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    return (    
        <div>
            <MoreVertIcon  onClick={handleClick} />
            <Menu 
                sx={{ display : { xs:"block", sm:"block" } }}
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
            >
                <MenuItem >Modifier mon post</MenuItem>
                <MenuItem >Supprimer mon post</MenuItem>
                <MenuItem 
                    onClick={e=>setAnchorEl(null)}>
                    Annuler
                </MenuItem>
            </Menu>
      </div>
    );
};

export default MenuActions;
