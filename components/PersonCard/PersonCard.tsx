import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, createTheme } from '@mui/material';


export default function ActionAreaCard({img, name}) {
  return (
    <Card >
      <CardActionArea >
        <CardMedia
          component="img"
          height="100%"
          image={img}
          alt={name}
        />
        <CardContent sx={{backgroundColor: '#AD2831'}}>
          <Typography gutterBottom variant="h5" component="div">
            {name || 'Persona'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    
  );
}