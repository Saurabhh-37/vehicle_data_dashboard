// src/components/AppBar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // User Icon
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; // Arrow Down Icon
import logo from '../assets/logo.png';

function MyAppBar() {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#404041' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            sx={{
              height: 40,
              marginRight: 2,
            }}
            alt="Logo"
            src={logo}
          />
          <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
            Admin Console
          </Typography>
          <Chip
            label="ADMIN VIEW"
            size="small"
            sx={{
              backgroundColor: 'white',
              color: 'black',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="contained"
            startIcon={<HelpOutlineIcon />}
            sx={{
              backgroundColor: '#404041',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#404041',
              },
              marginRight: 2, // Space between Support and User buttons
            }}
          >
            Support
          </Button>

          <Button
            variant="contained"
            startIcon={<AccountCircleIcon />}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              backgroundColor: '#404041',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#404041',
              },
            }}
          >
            User
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;
