import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fiveosTheme } from '../../styles/fiveos.theme';

interface IAppIcon {
  id: string;
  name: string;
  icon: JSX.Element;
  backgroundColor?: string;
  color?: string;
  path: string;
  notification?: number;
  showLabel?: boolean; // Whether to show text label below icon
  size?: 'normal' | 'small'; // normal=60px (grid), small=52px (dock)
}

// iOS-style gradient backgrounds for app icons
const APP_GRADIENTS: Record<string, string> = {
  DIALER: 'linear-gradient(135deg, #34C759 0%, #30D158 100%)',
  CONTACTS: 'linear-gradient(135deg, #FF9500 0%, #FFCC00 100%)',
  MESSAGES: 'linear-gradient(135deg, #34C759 0%, #30B44F 100%)',
  SETTINGS: 'linear-gradient(135deg, #8E8E93 0%, #636366 100%)',
  TWITTER: 'linear-gradient(135deg, #1DA1F2 0%, #0D8BD9 100%)',
  MARKETPLACE: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
  CAMERA: 'linear-gradient(135deg, #636366 0%, #48484A 100%)',
  NOTES: 'linear-gradient(135deg, #FF9500 0%, #FFCC02 100%)',
  CALCULATOR: 'linear-gradient(135deg, #48484A 0%, #2C2C2E 100%)',
  EMAIL: 'linear-gradient(135deg, #007AFF 0%, #0055D4 100%)',
  BANK: 'linear-gradient(135deg, #34C759 0%, #248A3D 100%)',
  EXAMPLE: 'linear-gradient(135deg, #FF375F 0%, #D63850 100%)',
  default: 'linear-gradient(135deg, #007AFF 0%, #0055D4 100%)',
};

/**
 * FiveOS App Icon
 * 
 * Flat, minimal design with gradient backgrounds.
 * No 3D effects - clean iOS 17+ style.
 */
const AppIcon: React.FC<IAppIcon> = ({
  id,
  name,
  icon,
  backgroundColor,
  color,
  path,
  notification,
  showLabel = true, // Default to showing label
  size = 'normal', // Default to normal size
}) => {
  const [t] = useTranslation();
  const location = useLocation();
  const isActive = location.pathname.includes(path);

  // Get gradient for this app
  const gradient = APP_GRADIENTS[id] || APP_GRADIENTS.default;

  // Size configuration
  const iconSize = size === 'small' ? 52 : 60;
  const iconRadius = size === 'small' ? 12 : 14;
  const svgSize = size === 'small' ? 24 : 28;

  return (
    <Link
      to={path}
      style={{
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      {/* Icon container - flat squircle with gradient */}
      <Box
        sx={{
          position: 'relative',
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          borderRadius: `${iconRadius}px`,
          background: backgroundColor || gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 150ms ease, opacity 150ms ease',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            transform: 'scale(1.05)',
          },
          '&:active': {
            transform: 'scale(0.95)',
            opacity: 0.9,
          },
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color || 'white',
            '& svg': {
              width: `${svgSize}px`,
              height: `${svgSize}px`,
            },
          }}
        >
          {icon}
        </Box>

        {/* Notification badge */}
        {notification && notification > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              minWidth: '20px',
              height: '20px',
              borderRadius: '10px',
              background: '#FF3B30',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 5px',
              border: '2px solid rgba(0, 0, 0, 0.8)',
            }}
          >
            <Typography
              sx={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'white',
                lineHeight: 1,
              }}
            >
              {notification > 99 ? '99+' : notification}
            </Typography>
          </Box>
        )}
      </Box>

      {/* App name - iOS style: small, white, medium weight - only if showLabel */}
      {showLabel && (
        <Typography
          sx={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            color: 'white',
            textAlign: 'center',
            maxWidth: '75px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            letterSpacing: '0.2px',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)',
            lineHeight: 1.2,
          }}
        >
          {String(t(name))}
        </Typography>
      )}
    </Link>
  );
};

export { AppIcon };
