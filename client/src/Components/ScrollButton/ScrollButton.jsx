
import React, { useState, useEffect, } from 'react';

//*** MATERIAL UI IMPORTS ***//
import { Fab } from '@mui/material';
import { Tooltip } from '@mui/material';

//*** MATERIAL UI ICONS IMPORTS ***//
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';

//*** JSX METHOD  ***//
const ScrollButton = () => {

    const [isVisible, setIsVisible] = useState(false);

    // Définition de la visibilité du bouton selon la hauteur de page
    const toggleVisibility = () => {
        if(window.pageYOffset > 300) {
            setIsVisible(true);
        }else {
            setIsVisible(false);
        };
    };

    // Fonction du Scroll pour remonter en haut de page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    //UseEffect qui va permettre l'effacement du bouton une fois le composant monté
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        }
    },[])

    return (
        <div>
            {isVisible === true ? (
            <Tooltip
        onClick={scrollToTop}
        title="Remonter en haut de page"
        sx={{
          position: "fixed",
          bottom: 20,
        }}
      >
        <Fab color="primary" aria-label="Remonter en haut">
          <ArrowCircleUpOutlinedIcon />
        </Fab>
      </Tooltip>):('')}
        </div>
    );
};

export default ScrollButton;
