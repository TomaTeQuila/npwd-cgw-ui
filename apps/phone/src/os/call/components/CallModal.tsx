import React from 'react';
import { AppWrapper } from '@ui/components';
import { AppContent } from '@ui/components/AppContent';
import { useCall } from '../hooks/useCall';
import { CallTimer } from './CallTimer';
import { CallControls } from './CallControls';
import { Box, BoxProps } from '@mui/material';
import CallContactContainer from './CallContactContainer';
import RingingText from './RingingText';
import { LoadingSpinner } from '@ui/components/LoadingSpinner';
import { useWallpaper } from '../../../apps/settings/hooks/useWallpaper';
import { styled } from '@mui/styles';

// iOS 18 style glassmorphism call overlay
const StyledBoxRoot: React.FC<BoxProps> = styled(Box)({
  height: '100%',
  background: 'linear-gradient(180deg, rgba(20,20,25,0.75) 0%, rgba(15,15,20,0.92) 100%)',
  backdropFilter: 'blur(40px) saturate(180%)',
  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const CallModal: React.FC = () => {
  const { call } = useCall();
  const wallpaper = useWallpaper();

  if (!call) return null;

  return (
    <AppWrapper>
      <AppContent
        paperStyle={{
          backgroundImage: wallpaper,
        }}
      >
        <React.Suspense fallback={<LoadingSpinner />}>
          <StyledBoxRoot padding={5}>
            <Box>
              <CallContactContainer />
              {call?.is_accepted ? <CallTimer /> : call?.isTransmitter && <RingingText />}
            </Box>
            <CallControls />
          </StyledBoxRoot>
        </React.Suspense>
      </AppContent>
    </AppWrapper>
  );
};
