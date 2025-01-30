import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Box, Typography, Divider, FormControlLabel, Checkbox, Button } from '@mui/material';
import { toggleFilter, resetFilters, selectFilters } from '../redux/filtersSlice';

function FilterDrawer({ open, onClose, onApplyFilters, onRemoveFilters }) {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const handleCheckboxChange = (filterType, filterName, checked) => {
    dispatch(toggleFilter({ filterType, filterName, value: checked }));
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, padding: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          Filter Data By
        </Typography>
        <Divider sx={{ width: '100%', marginBottom: 2 }} />
        
        {/* Vehicle Make Filter */}
        <Typography variant="subtitle1" gutterBottom>
          Vehicle Make
        </Typography>
        {Object.keys(filters.vehicleMake).map((make) => (
          <FormControlLabel
            key={make}
            control={
              <Checkbox
                checked={filters.vehicleMake[make]}
                onChange={(e) => handleCheckboxChange('vehicleMake', make, e.target.checked)}
              />
            }
            label={make}
          />
        ))}

        <Divider sx={{ width: '100%', marginY: 2 }} />
        
        {/* Duration Filter */}
        <Typography variant="subtitle1" gutterBottom>
          Duration
        </Typography>
        {Object.keys(filters.duration).map((duration) => (
          <FormControlLabel
            key={duration}
            control={
              <Checkbox
                checked={filters.duration[duration]}
                onChange={(e) => handleCheckboxChange('duration', duration, e.target.checked)}
              />
            }
            label={duration}
          />
        ))}

        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Button 
          variant="outlined" 
          sx={{ color: '#ff9926', borderColor: '#ff9926', margin: '10px' }} 
          onClick={() => dispatch(resetFilters())}
        >
          Remove Filter
        </Button>
        <Button 
          variant="contained" 
          sx={{ backgroundColor: '#ff9926', color: '#fff', '&:hover': { backgroundColor: '#e68620' }, margin: '10px' }} 
          onClick={onApplyFilters}
        >
          Apply Filter
        </Button>

        </Box>
      </Box>
    </Drawer>
  );
}

export default FilterDrawer;
