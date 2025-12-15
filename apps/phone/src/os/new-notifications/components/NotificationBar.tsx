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
import { BatteryFull, Signal, Wifi } from 'lucide-react';

const useStyles = makeStyles((theme) => ({
  drawer: {
    backgroundColor: 'rgba(30, 30, 30, 0.95)',
    backdropFilter: 'blur(20px)',
    width: '100%',
    position: 'absolute',
    top: '44px',
    zIndex: 98,
    borderRadius: '0 0 16px 16px',
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
    <div className="mx-0.5">
      {notificationTgtApp?.notificationIcon}
    </div>
  );
};

const UnreadNotificationListItem: React.FC<{ tgtNotiId: string }> = ({ tgtNotiId }) => {
  const notiContents = useRecoilValue(notifications(tgtNotiId));
  return <NotificationItem key={tgtNotiId} {...notiContents} />;
};

export const NotificationBar = () => {
  const classes = useStyles();
  const time = usePhoneTime();
  const [barCollapsed, setBarUncollapsed] = useNavbarUncollapsed();
  const unreadNotificationIds = useUnreadNotificationIds();
  const unreadNotifications = useUnreadNotifications();
  const { markAllAsRead } = useNotification();

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
      {/* iOS-style Status Bar - Transparent with Dynamic Island feel */}
      <div
        className="w-full flex items-center justify-between px-6 cursor-pointer"
        style={{
          height: '44px',
          background: 'transparent',
        }}
        onClick={() => setBarUncollapsed((curr) => !curr)}
      >
        {/* Left side - Notification icons */}
        <div className="flex items-center min-w-[80px]">
          {unreadNotifications &&
            unreadNotifications
              .filter((val, idx, self) => idx === self.findIndex((t) => t.appId === val.appId))
              .slice(0, 4)
              .map((notification, idx) => (
                <IconUnreadItem tgtNoti={notification} key={idx} />
              ))}
        </div>

        {/* Center - Time (iOS style) */}
        <div className="flex-1 flex justify-center">
          {time && (
            <Typography
              sx={{
                fontSize: '15px',
                fontWeight: 600,
                color: 'white',
                letterSpacing: '-0.3px',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              {time}
            </Typography>
          )}
        </div>

        {/* Right side - Signal, WiFi, Battery */}
        <div className="flex items-center gap-1 min-w-[80px] justify-end">
          <Signal
            size={14}
            className="text-white"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
          />
          <Wifi
            size={14}
            className="text-white"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
          />
          <div className="flex items-center">
            <span
              className="text-white text-xs mr-0.5"
              style={{
                fontSize: '11px',
                fontWeight: 500,
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              100%
            </span>
            <BatteryFull
              size={20}
              className="text-green-400"
              style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
            />
          </div>
        </div>
      </div>

      {/* Notification dropdown */}
      <Slide direction="down" in={barCollapsed} mountOnEnter unmountOnExit>
        <Paper square className={classes.drawer}>
          <Box py={1}>
            {unreadNotificationIds?.length !== 0 && (
              <Box pl={2}>
                <Button color="primary" size="small" onClick={handleClearNotis}>
                  Clear all
                </Button>
              </Box>
            )}
            <List>
              <Divider />
              {unreadNotificationIds &&
                unreadNotificationIds
                  .filter((val, idx, self) => idx === self.findIndex((t: string) => t === val))
                  .map((notification, idx) => (
                    <UnreadNotificationListItem key={idx} tgtNotiId={notification} />
                  ))}
            </List>
          </Box>
          <Box display="flex" flexDirection="column">
            {!unreadNotificationIds.length && <NoNotificationText />}
            <IconButton
              className={classes.collapseBtn}
              size="small"
              onClick={() => setBarUncollapsed(false)}
            >
              <ArrowDropUpIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>
        </Paper>
      </Slide>
    </>
  );
};
