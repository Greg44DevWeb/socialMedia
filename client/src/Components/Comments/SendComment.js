import { Button } from '@mui/material';
import { Container } from '@mui/material';
import { TextField } from '@mui/material';
import { useFormControl } from '@mui/material/FormControl';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Skeleton } from '@mui/material';
import { FormControl } from '@mui/material';
import { Grid } from '@mui/material';
import { InputAdornment } from '@mui/material';
const SendComment = () => {
    return (
        <Container>
         <FormControl fullWidth >    
        <TextField
        id="outlined-textarea"
        size="small"
        placeholder="insérer un commentaire"
        multiline
        InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SendIcon color="primary" />
              </InputAdornment>
            ),
          }}
        
      />
      </FormControl> 
      </Container>

    );
};

export default SendComment;
