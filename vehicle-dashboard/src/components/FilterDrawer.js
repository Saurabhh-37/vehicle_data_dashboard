// src/components/FilterDrawer.js
import React from 'react';
import { Drawer, Box, Typography, Divider, FormControlLabel, Checkbox, Button } from '@mui/material';

function FilterDrawer({ open, onClose, filters, onCheckboxChange, onApplyFilters, onRemoveFilters }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 250, padding: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          Filter Options
        </Typography>
        <Divider sx={{ width: '100%', marginBottom: 2 }} />
        
        {/* Vehicle Make Filter */}
        <Typography variant="subtitle1" gutterBottom>
          Vehicle Make
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.vehicleMake.Ford}
              onChange={(e) => onCheckboxChange('vehicleMake', 'Ford', e.target.checked)}
            />
          }
          label="Ford"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.vehicleMake.Cadillac}
              onChange={(e) => onCheckboxChange('vehicleMake', 'Cadillac', e.target.checked)}
            />
          }
          label="Cadillac"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.vehicleMake.Jeep}
              onChange={(e) => onCheckboxChange('vehicleMake', 'Jeep', e.target.checked)}
            />
          }
          label="Jeep"
        />

        <Divider sx={{ width: '100%', marginY: 2 }} />
        
        {/* Duration Filter */}
        <Typography variant="subtitle1" gutterBottom>
          Duration
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.duration['Last month']}
              onChange={(e) => onCheckboxChange('duration', 'Last month', e.target.checked)}
            />
          }
          label="Last month"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.duration['This month']}
              onChange={(e) => onCheckboxChange('duration', 'This month', e.target.checked)}
            />
          }
          label="This month"
        />
        {/* Add more filters for duration... */}

        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button variant="outlined" onClick={onRemoveFilters}>
            Remove Filter
          </Button>
          <Button variant="contained" color="primary" onClick={onApplyFilters}>
            Apply Filter
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default FilterDrawer;
