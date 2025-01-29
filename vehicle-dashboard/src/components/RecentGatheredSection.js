// src/components/RecentGatheredSection.js
import React from 'react';
import { Grid, Typography, Card, CardContent, CardActionArea, CardMedia } from '@mui/material';

function RecentGatheredSection() {
  return (
    <Grid item xs={12}>
      <Card sx={{ padding: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Recent Gathered Data 04/01/24
        </Typography>
        <Grid container spacing={2} direction="row" justifyContent="space-between">
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid item xs={1.5} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      Item {index + 1}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Description 
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Grid>
  );
}

export default RecentGatheredSection;
