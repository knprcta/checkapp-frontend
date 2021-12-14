import React from 'react';
import Typography from '@mui/material/Typography';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'© '}
      {new Date().getFullYear()}
      {' Маркон, ООО.'}
    </Typography>
  );
}

export default Copyright;
