import React from 'react';
import { Box, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function TitleSection({ onFilterClick, selectedDealer, onDealerChange }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Inventory
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Select Dealer</InputLabel>
          <Select value={selectedDealer} onChange={onDealerChange} displayEmpty>
            <MenuItem value="">All Dealers</MenuItem>
            <MenuItem value="dealer1">Dealer 1</MenuItem>
            <MenuItem value="dealer2">Dealer 2</MenuItem>
            <MenuItem value="dealer3">Dealer 3</MenuItem>
          </Select>
        </FormControl>
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
