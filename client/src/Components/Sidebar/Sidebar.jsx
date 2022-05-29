import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';

//*** CONTEXT ***//
import { UserContext } from '../../Context/userContext';

//*** MATERIAL UI IMPORTS ***//
import { Box } from '@mui/material';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemButton } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { ListItemText } from '@mui/material';

//*** MATERIAL ICONS IMPORTS ***//
import HomeIcon from '@mui/icons-material/Home';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PolicyIcon from '@mui/icons-material/Policy';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { Switch } from '@mui/material';



//*** COMPONENTS IMPPORTS ***//
import Subscribe from './../Subscribe/Subscribe';

const Sidebar = () => {
  const { admin } = useContext(UserContext); //Verification du status pour afficher des composants 
  console.log(admin);
  let navigate = useNavigate();
  function handleClickLogOut(e) {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
}
  
    return (
      <Box  
      top={100}
      flex={3} p={2} 
      sx={{ display: { xs: "none", sm: "block" } }}>
        <Box position="fixed">
       <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <HomeIcon/>
              </ListItemIcon>
              <ListItemText primary="Accueil" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <PolicyIcon/>
              </ListItemIcon>
              <ListItemText primary="CGU" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <HelpOutlineIcon/>
              </ListItemIcon>
              <ListItemText primary="Assistance" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <PersonIcon/>
              </ListItemIcon>
              <ListItemText primary="Mon profil" />
            </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton onClick={handleClickLogOut}>
              <ListItemIcon>
              <LogoutIcon/>
              </ListItemIcon>
              <ListItemText primary="Deconnexion" />
            </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <ModeNightIcon/>
              </ListItemIcon>
              <Switch />
            </ListItemButton>
          </ListItem>
          <>
          {admin === true ? ( <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <AdminPanelSettingsIcon/>
              </ListItemIcon>
              < Subscribe />
            </ListItemButton>
          </ListItem>):('')
            }
          </>
       </List>
       </Box>
      </Box>
    );
    
};

export default Sidebar;