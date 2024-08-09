// src/components/BackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../App.css'; // CSS dosyasını import ettik

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(-1)}
      variant="contained"
      className="back-button"
    >
      <ArrowBackIcon />
      <span className="back-button-text">Back</span>
    </Button>
  );
};

export default BackButton;
