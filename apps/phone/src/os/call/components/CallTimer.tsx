import React from 'react';
import { Box, Typography } from '@mui/material';
import useTimer from '../hooks/useTimer';

const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

export const CallTimer = () => {
  const { seconds, hours, minutes } = useTimer();
  return (
    <Box textAlign="center" mt={2}>
      <Typography
        variant="h6"
        sx={{
          color: 'rgba(255,255,255,0.7)',
          fontWeight: 300,
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '2px',
        }}
      >
        {`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`}
      </Typography>
    </Box>
  );
};
