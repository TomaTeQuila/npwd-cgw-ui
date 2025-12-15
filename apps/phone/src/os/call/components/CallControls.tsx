import React, { useState } from 'react';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { useCall } from '../hooks/useCall';
import { useCallModal } from '../hooks/useCallModal';
import { Box, IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import MutedIcon from '@mui/icons-material/VolumeOff';
import UnmutedIcon from '@mui/icons-material/VolumeUp';

// iOS-style call button component
interface CallButtonProps {
  color: 'accept' | 'decline' | 'muted' | 'unmuted';
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  size?: 'small' | 'medium';
}

const CallButton: React.FC<CallButtonProps> = ({ color, onClick, children, size = 'medium' }) => {
  const getBackgroundColor = () => {
    switch (color) {
      case 'accept':
        return '#34C759'; // iOS green
      case 'decline':
        return '#FF3B30'; // iOS red
      case 'muted':
        return '#FF3B30'; // iOS red for muted
      case 'unmuted':
        return 'rgba(255,255,255,0.2)'; // Glass effect for unmuted
      default:
        return 'rgba(255,255,255,0.2)';
    }
  };

  const dimensions = size === 'small' ? { width: 50, height: 50 } : { width: 70, height: 70 };
  const iconSize = size === 'small' ? 24 : 32;

  return (
    <IconButton
      onClick={onClick}
      sx={{
        ...dimensions,
        backgroundColor: getBackgroundColor(),
        color: 'white',
        boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
        transition: 'all 0.15s ease',
        '&:hover': {
          backgroundColor: getBackgroundColor(),
          transform: 'scale(1.05)',
        },
        '&:active': {
          transform: 'scale(0.95)',
        },
        '& svg': {
          fontSize: iconSize,
        },
      }}
    >
      {children}
    </IconButton>
  );
};

export const CallControls = ({ isSmall }: { isSmall?: boolean }) => {
  const history = useHistory();
  const { setModal } = useCallModal();
  const { call, endCall, acceptCall, rejectCall, muteCall } = useCall();
  const [muted, setMuted] = useState(false);

  const handleAcceptCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    history.push('/call');
    acceptCall();
  };

  const handleRejectCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModal(false);
    rejectCall();
  };

  const handleEndCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModal(false);
    endCall();
  };

  const handleMuteToggle = () => {
    setMuted((state) => !state);
    muteCall(!muted);
  };

  const buttonSize = isSmall ? 'small' : 'medium';

  // Display end call and mute controls for accepted/outgoing calls
  if (call?.is_accepted || call?.isTransmitter) {
    return (
      <Box
        display="flex"
        justifyContent={call?.is_accepted ? 'center' : 'center'}
        alignItems="center"
        gap={4}
        px={2}
        py={3}
      >
        {/* End call button */}
        <CallButton
          color="decline"
          size={buttonSize}
          onClick={handleEndCall}
        >
          <CallEndIcon />
        </CallButton>

        {/* Mute button - only show when call is connected */}
        {call?.is_accepted && (
          <CallButton
            color={muted ? 'muted' : 'unmuted'}
            size={buttonSize}
            onClick={handleMuteToggle}
          >
            {muted ? <MutedIcon /> : <UnmutedIcon />}
          </CallButton>
        )}
      </Box>
    );
  }

  // Display accept/reject buttons for incoming calls
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={6}
      px={2}
      py={3}
    >
      {/* Decline button */}
      <CallButton
        color="decline"
        size={buttonSize}
        onClick={handleRejectCall}
      >
        <CallEndIcon />
      </CallButton>

      {/* Accept button */}
      <CallButton
        color="accept"
        size={buttonSize}
        onClick={handleAcceptCall}
      >
        <CallIcon />
      </CallButton>
    </Box>
  );
};
