import React from 'react';
import { AppWrapper } from '@ui/components';
import { AppContent } from '@ui/components/AppContent';
import { GalleryGrid } from './grid/GalleryGrid';
import { GalleryModal } from './modal/GalleryModal';
import { Route, Switch } from 'react-router-dom';
import { LoadingSpinner } from '@ui/components/LoadingSpinner';
import { useApp } from '@os/apps/hooks/useApps';
import NewPhotoButton from './NewPhotoButton';
import { useTranslation } from 'react-i18next';
import { fiveosTheme } from '../../../styles/fiveos.theme';

/**
 * FiveOS Camera/Gallery App
 * 
 * Photo gallery with iOS-style large header and grid layout.
 */
const CameraApp: React.FC = () => {
  const camera = useApp('CAMERA');
  const [t] = useTranslation();

  return (
    <AppWrapper id="camera-app">
      {/* FiveOS Header */}
      <div
        style={{
          padding: '16px 20px 12px 20px',
          paddingTop: '54px', // Space for status bar
        }}
      >
        <h1
          style={{
            fontFamily: fiveosTheme.typography.fontFamily,
            fontSize: '34px',
            fontWeight: fiveosTheme.typography.fontWeight.semibold,
            color: fiveosTheme.colors.text.primary,
            margin: 0,
            letterSpacing: '-0.5px',
          }}
        >
          {String(t('APPS_CAMERA'))}
        </h1>
      </div>

      <AppContent
        style={{
          background: 'transparent',
        }}
      >
        <Switch>
          <React.Suspense fallback={<LoadingSpinner />}>
            <Route path="/camera" exact component={GalleryGrid} />
            <Route path="/camera/image" exact component={GalleryModal} />
          </React.Suspense>
        </Switch>
      </AppContent>

      <Route exact path="/camera">
        <NewPhotoButton />
      </Route>
    </AppWrapper>
  );
};

export default CameraApp;
