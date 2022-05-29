import { createTheme } from "@mui/material";
import { indigo, red, grey } from "@mui/material/colors";

 export const theme = createTheme({
    palette: {
        primary: {
          main: indigo[500],
          light: indigo[300],
        },
        secondary: {
        main: red[900],
        light: red[300],
        },
        tertiary: {
          main: indigo[500],
          contrastText: '#fefefe',
        },
        neutral: {
          main: indigo[100],
          contrastText: '#1a237e',
        },
        text: {
          main: grey[900],
        }
      },
      typography: {
        fontFamily:'Quicksand',
        fontWeightLight: 400,
        fontWeightregular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
      },  
});

