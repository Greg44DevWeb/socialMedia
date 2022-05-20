import React, {useState} from 'react';

//*** COMPONENTS IMPORTS ***//
import Comments from '../Comments/Comments';

//*** MATERIAL UI IMPORTS ***//
import { Typography } from '@mui/material';
import { Card } from '@mui/material';
import { CardHeader } from '@mui/material';
import { Avatar } from '@mui/material';
import { IconButton } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CardContent } from '@mui/material';
import { CardActions } from '@mui/material';
import { Paper } from '@mui/material';
import { Box } from '@mui/material';

import { Collapse } from '@mui/material';
import { red } from '@mui/material/colors';
import { Checkbox } from '@mui/material';

//*** MATERIAL UI ICONS IMPORTS ***//
// import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import styled from '@emotion/styled';
import PostComment from '../Comments/PostComment';


//*** MATERIAL UI STYLES ***//
const PostcardBox = styled(Box) (({ theme }) => ({
    maxWidth:"100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    justifyContent: "center",
    marginBottom: "20px",
}))
const ExpandMore = styled((theme) => {
    const { expand, ...other } = theme;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

//*** JSX METHOD ***//
const Postcard = ({ post }) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
    return (
      <PostcardBox>
        <Paper sx={{ maxWidth: "100%" }} elevation={10}>
          <Card sx={{ mt: 2 }} aria-label="carte du post">
            <CardHeader
              avatar={
                <Avatar
                  src={post.imageUrl}
                  alt={post.prenom}
                  aria-label="Utilsateur"
                ></Avatar>
              }
              action={
                <IconButton aria-label="menu">
                  <MoreVertIcon />
                </IconButton>
              }
              title={[post.nom] + " " + [post.prenom] + " a posté le :"}
              subheader={post.date}
            />
            <CardMedia
              component="img"
              height="20%"
              image={post.imageUrl}
              alt="image attachée au post"
            />
            <CardContent>
              <Typography
                variant="body1"
                color="text.main"
                aria-label="texte du post"
              >
                {post.text}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton 
              aria-label="Aimer le post"> {/* //TODO CREER LE COMPOSANT */}
                <Checkbox
                  icon={<FavoriteBorderIcon />}
                  checkedIcon={<Favorite />}
                />
              </IconButton>
             < PostComment />
              <ExpandMore
                expand={expanded}
                aria-expanded={expanded}
                aria-label="Ouvrir les commentaires"
                onClick={handleExpandClick}
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Commentaires :</Typography>
                <Comments post={post} />
              </CardContent>
            </Collapse>
          </Card>
        </Paper>
      </PostcardBox>
    );
};

export default Postcard;