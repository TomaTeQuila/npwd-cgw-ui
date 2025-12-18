import React, { useState } from 'react';
import { useSettings } from './apps/settings/hooks/useSettings';
import { usePhoneVisibility } from '@os/phone/hooks/usePhoneVisibility';
import { Slide } from '@mui/material';
import { useWallpaper } from './apps/settings/hooks/useWallpaper';
import { useLocation } from 'react-router-dom';
import { PhoneFrame } from './components/PhoneFrame';
import { OrganicWallpaper } from './components/Wallpaper';
import './styles/fiveos.css';

interface PhoneWrapperProps {
  children: React.ReactNode;
}

/**
 * FiveOS Phone Wrapper
 * 
 * Wrapper principal que contiene el frame del teléfono, 
 * wallpaper orgánico y contenido de la pantalla.
 */
const PhoneWrapper: React.FC<PhoneWrapperProps> = ({ children }) => {
  const [settings] = useSettings();
  const { bottom, visibility } = usePhoneVisibility();
  const wallpaper = useWallpaper();
  const { pathname } = useLocation();

  // Dynamic Island state (expandable for calls/notifications)
  const [islandExpanded, setIslandExpanded] = useState(false);

  // Determine if we should show organic wallpaper or custom
  const isHomeScreen = pathname === '/';
  const useOrganicWallpaper = isHomeScreen && !settings.customWallpaper;

  // Map wallpaper setting to organic preset
  const getWallpaperPreset = () => {
    const wallpaperValue = settings.wallpaper?.value || 'aurora';
    // Map old wallpaper names to organic presets
    const presetMap: Record<string, 'aurora' | 'sunset' | 'ocean' | 'nebula' | 'forest'> = {
      'waves.jpg': 'ocean',
      'sky.jpg': 'sunset',
      'npwd2020.png': 'aurora',
      'variant2.jpg': 'nebula',
      'variant3.jpg': 'forest',
      'minimal.jpg': 'aurora',
    };
    return presetMap[wallpaperValue] || 'aurora';
  };

  // Get frame color from settings (if any)
  const frameColor = settings.frame?.value?.includes('blue') ? 'blue' :
    settings.frame?.value?.includes('gold') ? 'gold' :
      settings.frame?.value?.includes('white') ? 'silver' : 'black';

  return (
    <Slide direction="up" timeout={{ enter: 500, exit: 500 }} in={visibility}>
      <div className="PhoneWrapper">
        <div
          className="Phone"
          style={{
            position: 'fixed',
            transformOrigin: 'right bottom',
            transform: `scale(${settings.zoom.value})`,
            bottom,
          }}
        >
          <PhoneFrame
            frameColor={frameColor}
            showDynamicIsland={true}
            islandExpanded={islandExpanded}
          >
            {/* Screen content container */}
            <div
              id="phone"
              className="PhoneScreen fiveos-dark"
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'black',
              }}
            >
              {/* Organic Wallpaper (only on home screen) */}
              {isHomeScreen && useOrganicWallpaper && (
                <OrganicWallpaper
                  preset={getWallpaperPreset()}
                  animate={true}
                />
              )}

              {/* Custom/Traditional Wallpaper fallback */}
              {isHomeScreen && !useOrganicWallpaper && wallpaper && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: wallpaper,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 0,
                  }}
                />
              )}

              {/* App background for non-home screens */}
              {!isHomeScreen && (
                <div
                  className="fiveos-app-background"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(18, 18, 20, 0.98) 0%, rgba(10, 10, 12, 1) 100%)',
                    zIndex: 0,
                  }}
                />
              )}

              {/* Main content */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                {children}
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    </Slide>
  );
};

export default PhoneWrapper;
