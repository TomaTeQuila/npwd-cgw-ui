import React from 'react';
import { darken } from '@mui/material/styles';
import { Badge, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { INotificationIcon } from '@os/notifications/providers/NotificationsProvider';

export interface AppIconProps {
  id: string;
  nameLocale: string;
  Icon: React.ElementType;
  icon: React.ElementType;
  backgroundColor: string;
  color: string;
  notification: INotificationIcon;
}

export const AppIcon: React.FC<AppIconProps> = ({
  id,
  nameLocale,
  Icon,
  backgroundColor,
  color,
  icon,
  notification,
}) => {
  const [t] = useTranslation();

  // iOS squircle style
  const iconContainerStyle: React.CSSProperties = {
    width: '60px',
    height: '60px',
    borderRadius: '22%', // iOS squircle
    background: `linear-gradient(145deg, ${backgroundColor} 0%, ${darken(backgroundColor, 0.15)} 100%)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
    color: color,
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  };

  const iconStyle: React.CSSProperties = {
    fontSize: '28px',
    width: '28px',
    height: '28px',
    color: color,
  };

  return (
    <div
      className="flex flex-col items-center gap-1 py-2 cursor-pointer group"
      style={{ minWidth: '70px' }}
    >
      <Badge
        color="error"
        badgeContent={notification?.badge}
        invisible={!notification || notification.badge < 1}
        sx={{
          '& .MuiBadge-badge': {
            fontSize: '11px',
            minWidth: '18px',
            height: '18px',
            borderRadius: '9px',
          }
        }}
      >
        <div
          style={iconContainerStyle}
          className="group-hover:scale-105 group-active:scale-95"
        >
          {Icon ? (
            <Icon style={iconStyle} />
          ) : (
            <div style={iconStyle}>{icon}</div>
          )}
        </div>
      </Badge>

      {/* App name label - iOS style */}
      <Typography
        variant="caption"
        sx={{
          fontSize: '10px',
          fontWeight: 500,
          color: 'white',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
          maxWidth: '68px',
          textAlign: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          lineHeight: 1.2,
        }}
      >
        {t(nameLocale)}
      </Typography>
    </div>
  );
};
