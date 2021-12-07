import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, createTheme } from '@mui/material';


export default function ActionAreaCard({title, description, href}) {
  return (
    <Card>
      <CardActionArea href={href || '#'} >
        <CardMedia
          component="img"
          height="240"
          image="/images/pc.jfif"
          alt="green iguana"
        />
        <CardContent sx={{backgroundColor: '#FFFDF7'}}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    
  );
}