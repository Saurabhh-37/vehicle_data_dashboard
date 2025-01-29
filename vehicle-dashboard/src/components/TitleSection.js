// src/components/TitleSection.js
import React from 'react';
import { Box, Button, Typography } from '@mui/material';

function TitleSection({ onFilterClick }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Inventory
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#404041', color: '#fff' }}
          onClick={onFilterClick}
        >
          Filter
        </Button>
      </Box>
    </Box>
  );
}

export default TitleSection;
