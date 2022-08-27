import React from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const Actors = () => {
  const { id } = useParams();
  console.log('+++id+++', id);

  return (
    <div>Actor: { id }</div>
  );
};

export default Actors;
