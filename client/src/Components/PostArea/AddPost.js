import React from 'react';
import './addPost.css';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const AddPost = () => {
    return (
      <section className="post-wrapper">
        <form>
          <div className="postField">
            <TextField
              id="outlined-basic"
              className="field"
              label="Ecrivez quelque-chose"
              type="email"
              variant="outlined"
              color="tertiary"
              fullWidth
              multiline
              rows="3"

              //error={emailErr}
              //value={email}
            />
          </div>
          <ul className="listItems">
            <li className="item-icon">
              <Button 
              variant="outlined" 
              color="tertiary" 
              size="small"
              type="file">
                <AddPhotoAlternateIcon />
              </Button>
            </li>
            <li className="item-icon">
              <Button 
              
              variant="outlined" 
              color="tertiary" 
              size="small">
                <SendIcon />
              </Button>
            </li>
          </ul>
        </form>
      </section>
    );
};

export default AddPost;