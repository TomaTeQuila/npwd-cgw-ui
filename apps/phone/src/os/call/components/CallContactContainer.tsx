import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { useContactActions } from '../../../apps/contacts/hooks/useContactActions';
import { useCall } from '../hooks/useCall';
import { useTranslation } from 'react-i18next';

// Default avatar for contacts without photos
const DEFAULT_AVATAR = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=256';

const CallContactContainer = () => {
  const [t] = useTranslation();
  const { call } = useCall();

  const { getDisplayByNumber, getPictureByNumber } = useContactActions();

  const getDisplayOrNumber = () =>
    call.isTransmitter
      ? getDisplayByNumber(call?.receiver)
      : !call.isTransmitter && call.isAnonymous
        ? 'Anonymous'
        : getDisplayByNumber(call?.transmitter);

  const getAvatarUrl = () => {
    if (call.isTransmitter) {
      return getPictureByNumber(call.receiver) || DEFAULT_AVATAR;
    }
    if (!call.isTransmitter && call.isAnonymous) {
      return DEFAULT_AVATAR;
    }
    return getPictureByNumber(call?.transmitter) || DEFAULT_AVATAR;
  };

  return (
    // iOS-style centered contact display
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      pt={4}
    >
      {/* Large centered avatar with subtle shadow */}
      <Avatar
        sx={{
          height: 100,
          width: 100,
          mb: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          border: '2px solid rgba(255,255,255,0.1)',
        }}
        alt={getDisplayOrNumber()}
        src={getAvatarUrl()}
      />

      {/* Call type label */}
      <Typography
        variant="caption"
        sx={{
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: 1,
          textTransform: 'uppercase',
          mb: 0.5,
        }}
      >
        {call.isTransmitter
          ? t('CALLS.MESSAGES.OUTGOING')
          : t('CALLS.MESSAGES.INCOMING')}
      </Typography>

      {/* Contact name - prominent display */}
      <Typography
        variant="h4"
        sx={{
          color: 'white',
          fontWeight: 500,
          letterSpacing: '-0.5px',
        }}
      >
        {getDisplayOrNumber()}
      </Typography>
    </Box>
  );
};

export default CallContactContainer;
