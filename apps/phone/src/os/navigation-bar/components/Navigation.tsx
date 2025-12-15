import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { usePhone } from '@os/phone/hooks/usePhone';

export const Navigation: React.FC = () => {
  const history = useHistory();
  const { isExact } = useRouteMatch('/');
  const { closePhone } = usePhone();

  const handleGoToMenu = () => {
    if (isExact) {
      // On home screen, close phone
      closePhone();
    } else {
      // Navigate to home
      history.push('/');
    }
  };

  const handleSwipeUp = () => {
    // Future: could add swipe gesture detection
    handleGoToMenu();
  };

  return (
    // iOS-style home indicator - minimal, clean, modern
    <div
      className="w-full flex items-end justify-center pb-2 pt-1"
      style={{
        background: 'transparent',
        height: '28px',
      }}
    >
      <div
        onClick={handleSwipeUp}
        onDoubleClick={() => history.push('/')}
        className="cursor-pointer transition-all duration-200 hover:opacity-80 active:scale-95"
        style={{
          width: '134px',
          height: '5px',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '100px',
        }}
        title={isExact ? 'Close phone' : 'Go to home'}
      />
    </div>
  );
};
