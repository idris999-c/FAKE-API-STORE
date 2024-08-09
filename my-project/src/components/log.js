// src/components/log.js

import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const LogButtons = () => {
  return (
    <div style={{ position: 'absolute', top: 16, right: 16 }}>
      <Button 
        color="inherit" 
        component={Link} 
        to="/signin"
        sx={{ marginRight: 1 }}
      >
        Sign In
      </Button>
      <Button 
        color="inherit" 
        component={Link} 
        to="/signup"
      >
        Sign Up
      </Button>
    </div>
  );
};

export default LogButtons;
