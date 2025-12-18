import React from 'react';
import { Snackbar, Slide } from '@mui/material';
import { useSnackbar } from '../hooks/useSnackbar';
import Alert from '../../../ui/components/Alert';

/**
 * FiveOS Phone Snackbar
 * 
 * Floating notification that appears at the top of the screen,
 * similar to iOS Dynamic Island-style notifications.
 */
export const PhoneSnackbar: React.FC = () => {
  const { alert, isOpen, handleClose } = useSnackbar();

  return (
    <Snackbar
      autoHideDuration={alert?.duration ?? 3000}
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={Slide}
      sx={{
        position: 'absolute',
        top: '70px !important', // Below Dynamic Island
        left: '50% !important',
        right: 'auto !important',
        transform: 'translateX(-50%) !important',
        bottom: 'auto !important',
        width: 'auto',
        maxWidth: '90%',
      }}
    >
      <div>
        <Alert severity={alert?.type || 'info'} onClose={handleClose}>
          {alert?.message || ''}
        </Alert>
      </div>
    </Snackbar>
  );
};
