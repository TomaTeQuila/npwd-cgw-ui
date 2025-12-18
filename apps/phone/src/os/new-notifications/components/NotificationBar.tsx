import React, { useEffect } from 'react';
import {
  Typography,
  IconButton,
  Slide,
  Paper,
  Box,
  List,
  Divider,
  Button,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { NotificationItem } from './NotificationItem';
import usePhoneTime from '../../phone/hooks/usePhoneTime';
import { NoNotificationText } from './NoNotificationText';
import {
  notifications,
  useNavbarUncollapsed,
  useUnreadNotificationIds,
  useUnreadNotifications,
} from '@os/new-notifications/state';
import { useRecoilValue } from 'recoil';
import { useApp } from '@os/apps/hooks/useApps';
import { UnreadNotificationBarProps } from '@typings/notifications';
import { useNotification } from '../useNotification';
import { Signal, Wifi } from 'lucide-react';
import { fiveosTheme } from '../../../styles/fiveos.theme';

const useStyles = makeStyles((theme) => ({
  drawer: {
    // FiveOS glass dropdown
    background: 'linear-gradient(180deg, rgba(25, 25, 30, 0.92) 0%, rgba(15, 15, 20, 0.96) 100%)',
    backdropFilter: 'blur(30px) saturate(1.6)',
    WebkitBackdropFilter: 'blur(30px) saturate(1.6)',
    width: '100%',
    position: 'absolute',
    top: '54px', // Below Dynamic Island
    zIndex: 98,
    borderRadius: '0 0 24px 24px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderTop: 'none',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
  },
  collapseBtn: {
    margin: '0 auto',
  },
}));

interface IconUnreadGridProps {
  tgtNoti: UnreadNotificationBarProps;
}

const IconUnreadItem: React.FC<IconUnreadGridProps> = ({ tgtNoti }) => {
  const notificationTgtApp = useApp(tgtNoti.appId);
  return (
    <div className="mx-0.5" style={{ opacity: 0.9 }}>
      {notificationTgtApp?.notificationIcon}
    </div>
  );
};

const UnreadNotificationListItem: React.FC<{ tgtNotiId: string }> = ({ tgtNotiId }) => {
  const notiContents = useRecoilValue(notifications(tgtNotiId));
  return <NotificationItem key={tgtNotiId} {...notiContents} />;
};

/**
 * iPhone-style Battery Icon
 * White outline with fill level indicator
 */
const BatteryIcon: React.FC<{ level?: number }> = ({ level = 75 }) => {
  const fillWidth = Math.max(0, Math.min(100, level)) * 0.17; // 17px max width

  return (
    <svg
      width="25"
      height="12"
      viewBox="0 0 25 12"
      fill="none"
      style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.35))' }}
    >
      {/* Battery outline */}
      <rect
        x="0.5"
        y="0.5"
        width="21"
        height="11"
        rx="2.5"
        stroke="rgba(255, 255, 255, 0.9)"
        strokeWidth="1"
        fill="none"
      />
      {/* Battery fill */}
      <rect
        x="2"
        y="2"
        width={fillWidth}
        height="8"
        rx="1"
        fill="rgba(255, 255, 255, 0.9)"
      />
      {/* Battery cap/tip */}
      <path
        d="M23 4V8C23.8 8 24.5 7.1 24.5 6C24.5 4.9 23.8 4 23 4Z"
        fill="rgba(255, 255, 255, 0.5)"
      />
    </svg>
  );
};

/**
 * FiveOS Status Bar & Notification Dropdown
 * 
 * Status bar at the same level as Dynamic Island (alongside it).
 * Time on left, status icons on right.
 */
export const NotificationBar = () => {
  const classes = useStyles();
  const phoneTime = usePhoneTime();
  const [barCollapsed, setBarUncollapsed] = useNavbarUncollapsed();
  const unreadNotificationIds = useUnreadNotificationIds();
  const unreadNotifications = useUnreadNotifications();
  const { markAllAsRead } = useNotification();

  // Fallback to local time in dev mode
  const [localTime, setLocalTime] = React.useState('');

  React.useEffect(() => {
    const updateLocalTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setLocalTime(`${hours}:${minutes}`);
    };

    updateLocalTime();
    const interval = setInterval(updateLocalTime, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Use phoneTime if available, otherwise use local time
  const displayTime = phoneTime || localTime;

  const handleClearNotis = async () => {
    setBarUncollapsed(false);
    await markAllAsRead();
  };

  useEffect(() => {
    if (unreadNotificationIds.length === 0) {
      setBarUncollapsed(false);
    }
  }, [unreadNotificationIds, setBarUncollapsed]);

  return (
    <>
      {/* FiveOS Status Bar - SAME ROW as Dynamic Island */}
      <div
        className="w-full flex items-start justify-between cursor-pointer"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '54px', // Same height as Dynamic Island area
          paddingTop: '14px', // Align with middle of Dynamic Island
          paddingLeft: '20px',
          paddingRight: '20px',
          background: 'transparent',
          zIndex: 999, // Below Dynamic Island but above content
          pointerEvents: 'none', // Allow clicks to pass through to island
        }}
        onClick={() => setBarUncollapsed((curr) => !curr)}
      >
        {/* Left side - Time */}
        <div
          className="flex items-center"
          style={{
            pointerEvents: 'auto',
            minWidth: '60px',
          }}
        >
          {displayTime && (
            <Typography
              sx={{
                fontFamily: fiveosTheme.typography.fontFamily,
                fontSize: '15px',
                fontWeight: fiveosTheme.typography.fontWeight.semibold,
                color: 'rgba(255, 255, 255, 0.95)',
                letterSpacing: '-0.3px',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.35)',
              }}
            >
              {displayTime}
            </Typography>
          )}
        </div>

        {/* Center space - Dynamic Island lives here (handled by PhoneFrame) */}
        <div style={{ flex: 1 }} />

        {/* Right side - Status icons */}
        <div
          className="flex items-center"
          style={{
            gap: '5px',
            pointerEvents: 'auto',
          }}
        >
          <Signal
            size={16}
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.35))',
            }}
          />
          <Wifi
            size={16}
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.35))',
            }}
          />
          <BatteryIcon level={75} />
        </div>
      </div>

      {/* FiveOS Notification Dropdown - glass effect */}
      <Slide direction="down" in={barCollapsed} mountOnEnter unmountOnExit>
        <Paper square className={classes.drawer}>
          <Box py={1.5} px={1}>
            {/* Clear all button */}
            {unreadNotificationIds?.length !== 0 && (
              <Box pl={1} pb={1}>
                <Button
                  size="small"
                  onClick={handleClearNotis}
                  sx={{
                    color: fiveosTheme.colors.accent.blue,
                    fontFamily: fiveosTheme.typography.fontFamily,
                    fontSize: '14px',
                    fontWeight: fiveosTheme.typography.fontWeight.medium,
                    textTransform: 'none',
                    '&:hover': {
                      background: 'rgba(0, 122, 255, 0.1)',
                    },
                  }}
                >
                  Limpiar todo
                </Button>
              </Box>
            )}

            {/* Notification list */}
            <List sx={{ padding: 0 }}>
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />
              {unreadNotificationIds &&
                unreadNotificationIds
                  .filter((val, idx, self) => idx === self.findIndex((t: string) => t === val))
                  .map((notification, idx) => (
                    <UnreadNotificationListItem key={idx} tgtNotiId={notification} />
                  ))}
            </List>
          </Box>

          {/* Collapse area */}
          <Box display="flex" flexDirection="column" pb={1}>
            {!unreadNotificationIds.length && <NoNotificationText />}
            <IconButton
              className={classes.collapseBtn}
              size="small"
              onClick={() => setBarUncollapsed(false)}
              sx={{
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <ArrowDropUpIcon sx={{ color: 'rgba(255, 255, 255, 0.6)' }} />
            </IconButton>
          </Box>
        </Paper>
      </Slide>
    </>
  );
};
