import React from 'react';
import { AppWrapper } from '@ui/components';
import { AppContent } from '@ui/components/AppContent';
import { useContextMenu, MapSettingItem, SettingOption } from '@ui/hooks/useContextMenu';
import { usePhoneConfig } from '../../../config/hooks/usePhoneConfig';
import { useMyPhoneNumber } from '@os/simcard/hooks/useMyPhoneNumber';
import {
  SettingItem,
  SettingItemIconAction,
  SettingItemSlider,
  SettingSwitch,
  SoundItem,
} from './SettingItem';
import { useTranslation } from 'react-i18next';

import { FileCopy } from '@mui/icons-material';
import {
  BookA,
  EyeOff,
  FileMusic,
  Wallpaper,
  Palette,
  Phone,
  ShieldOff,
  Volume2,
  Smartphone,
  ZoomIn,
  ListFilter,
  Eraser,
  Bell,
  BellRing,
  Image,
} from 'lucide-react';
import makeStyles from '@mui/styles/makeStyles';
import { useResetSettings, useSettings } from '../hooks/useSettings';
import { setClipboard } from '@os/phone/hooks/useClipboard';
import { useSnackbar } from '@os/snackbar/hooks/useSnackbar';
import { IContextMenuOption } from '@ui/components/ContextMenu';
import WallpaperModal from './WallpaperModal';
import { SettingsCategory } from './SettingsCategory';
import { IconSetObject } from '@typings/settings';
import { useCustomWallpaperModal } from '../state/customWallpaper.state';
import fetchNui from '@utils/fetchNui';
import { SettingEvents } from '@typings/settings';
import { fiveosTheme } from '../../../styles/fiveos.theme';

const useStyles = makeStyles({
  backgroundModal: {
    background: 'black',
    opacity: '0.6',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
});

/**
 * FiveOS Settings App
 * 
 * Rediseñado con estilo iOS - secciones redondeadas,
 * iconos con fondo de color, y navegación visual clara.
 */
export const SettingsApp: React.FC = () => {
  const [config] = usePhoneConfig();
  const myNumber = useMyPhoneNumber();
  const [settings, setSettings] = useSettings();
  const [t] = useTranslation();
  const [customWallpaperState, setCustomWallpaperState] = useCustomWallpaperModal();

  const { addAlert } = useSnackbar();
  const resetSettings = useResetSettings();

  const handleSettingChange = (key: string | number, value: unknown) => {
    setSettings({ ...settings, [key]: value });

    if (key === 'theme') {
      if ((value as any).value === 'taso-dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const iconSets = config.iconSet.map(
    MapSettingItem(settings.iconSet, (val: SettingOption<IconSetObject>) =>
      handleSettingChange('iconSet', val),
    ),
  );

  const wallpapers = config.wallpapers.map(
    MapSettingItem(settings.wallpaper, (val: SettingOption) =>
      handleSettingChange('wallpaper', val),
    ),
  );
  const frames = config.frames.map(
    MapSettingItem(settings.frame, (val: SettingOption) => handleSettingChange('frame', val)),
  );
  const themes = config.themes.map(
    MapSettingItem(settings.theme, (val: SettingOption) => handleSettingChange('theme', val)),
  );
  const zoomOptions = config.zoomOptions.map(
    MapSettingItem(settings.zoom, (val: SettingOption) => handleSettingChange('zoom', val)),
  );
  const ringtones = config.ringtones.map(
    MapSettingItem(settings.ringtone, (val: SettingOption) => handleSettingChange('ringtone', val)),
  );
  const notifications = config.notiSounds.map(
    MapSettingItem(settings.notiSound, (val: SettingOption) =>
      handleSettingChange('notiSound', val),
    ),
  );

  const twitterNotifications = config.notiSounds.map(
    MapSettingItem(settings.TWITTER_notiSound, (val: SettingOption) =>
      handleSettingChange('TWITTER_notiSound', val),
    ),
  );

  const twitterNotificationFilters = config.notiFilters.map(
    MapSettingItem(settings.TWITTER_notiFilter, (val: SettingOption) =>
      handleSettingChange('TWITTER_notiFilter', val),
    ),
  );

  const languages = config.languages.map(
    MapSettingItem(settings.language, (val: SettingOption) => handleSettingChange('language', val)),
  );

  const handleResetOptions = () => {
    resetSettings();
    addAlert({
      message: t('SETTINGS.MESSAGES.SETTINGS_RESET'),
      type: 'success',
    });
  };

  const resetSettingsOpts: IContextMenuOption[] = [
    {
      selected: false,
      onClick: () => handleResetOptions(),
      key: 'RESET_SETTINGS',
      label: t('SETTINGS.OPTIONS.RESET_SETTINGS'),
    },
  ];

  const customWallpaper: IContextMenuOption = {
    selected: false,
    onClick: () => setCustomWallpaperState(true),
    key: 'CUSTOM_WALLPAPER',
    label: t('SETTINGS.OPTIONS.CUSTOM_WALLPAPER.DIALOG_TITLE'),
  };

  const handleCopyPhoneNumber = () => {
    setClipboard(myNumber);
    addAlert({
      message: t('GENERIC.WRITE_TO_CLIPBOARD_MESSAGE', {
        content: 'number',
      }),
      type: 'success',
    });
  };

  const [openMenu, closeMenu, ContextMenu, isMenuOpen] = useContextMenu();
  const classes = useStyles();

  return (
    <AppWrapper>
      {/* Used for picking and viewing a custom wallpaper */}
      <WallpaperModal />
      <div className={customWallpaperState ? classes.backgroundModal : undefined} />

      {/* Settings content directly - no large header */}      <AppContent
        backdrop={isMenuOpen}
        onClickBackdrop={closeMenu}
        display="flex"
        style={{
          height: 'auto',
          background: 'transparent',
        }}
      >
        <div
          className="fiveos-settings-content"
          style={{
            padding: '0 16px 100px 16px',
          }}
        >
          {/* Phone Section */}
          <SettingsCategory title={t('SETTINGS.CATEGORY.PHONE')}>
            <SettingItemIconAction
              label={t('SETTINGS.PHONE_NUMBER')}
              labelSecondary={myNumber}
              actionLabel={t('GENERIC.WRITE_TO_CLIPBOARD_TOOLTIP', {
                content: 'number',
              })}
              Icon={Phone}
              iconColor={fiveosTheme.colors.accent.green}
              actionIcon={<FileCopy />}
              handleAction={handleCopyPhoneNumber}
            />
            <SoundItem
              label={t('SETTINGS.OPTIONS.RINGTONE')}
              value={settings.ringtone.label}
              options={ringtones}
              onClick={openMenu}
              Icon={BellRing}
              iconColor={fiveosTheme.colors.accent.red}
              tooltip={t('SETTINGS.PREVIEW_SOUND')}
              onPreviewClicked={() => {
                fetchNui(SettingEvents.PREVIEW_RINGTONE);
              }}
            />
            <SoundItem
              label={t('SETTINGS.OPTIONS.NOTIFICATION')}
              value={settings.notiSound.label}
              options={notifications}
              onClick={openMenu}
              Icon={Bell}
              iconColor={fiveosTheme.colors.accent.pink}
              tooltip={t('SETTINGS.PREVIEW_SOUND')}
              onPreviewClicked={() => {
                fetchNui(SettingEvents.PREVIEW_ALERT);
              }}
            />
            <SettingSwitch
              label={t('SETTINGS.OPTIONS.STREAMER_MODE.TITLE')}
              secondary={t('SETTINGS.OPTIONS.STREAMER_MODE.DESCRIPTION')}
              icon={<EyeOff />}
              iconColor={fiveosTheme.colors.accent.purple}
              value={settings.streamerMode}
              onClick={(curr: boolean) => handleSettingChange('streamerMode', !curr)}
            />
            <SettingSwitch
              label={t('SETTINGS.OPTIONS.ANONYMOUS_MODE.TITLE')}
              secondary={t('SETTINGS.OPTIONS.ANONYMOUS_MODE.DESCRIPTION')}
              icon={<ShieldOff />}
              iconColor={fiveosTheme.colors.accent.orange}
              value={settings.anonymousMode}
              onClick={(curr: boolean) => handleSettingChange('anonymousMode', !curr)}
            />
            <SettingItemSlider
              label={t('SETTINGS.OPTIONS.CALL_VOLUME')}
              icon={<Volume2 />}
              iconColor={fiveosTheme.colors.accent.blue}
              value={settings.callVolume}
              onCommit={(val) => handleSettingChange('callVolume', val)}
            />
          </SettingsCategory>

          {/* Appearance Section */}
          <SettingsCategory title={t('SETTINGS.CATEGORY.APPEARANCE')}>
            <SettingItem
              label={t('SETTINGS.OPTIONS.LANGUAGE')}
              value={settings.language.label}
              options={languages}
              onClick={openMenu}
              Icon={BookA}
              iconColor={fiveosTheme.colors.accent.blue}
            />
            <SettingItem
              label={t('SETTINGS.OPTIONS.THEME')}
              value={settings.theme.label}
              options={themes}
              onClick={openMenu}
              Icon={Palette}
              iconColor={fiveosTheme.colors.accent.purple}
            />
            <SettingItem
              label={t('SETTINGS.OPTIONS.WALLPAPER')}
              value={settings.wallpaper.label}
              options={[...wallpapers, customWallpaper]}
              onClick={openMenu}
              Icon={Image}
              iconColor={fiveosTheme.colors.accent.teal}
            />
            <SettingItem
              label={t('SETTINGS.OPTIONS.FRAME')}
              value={settings.frame.label}
              options={frames}
              onClick={openMenu}
              Icon={Smartphone}
              iconColor="#636366"
            />
            <SettingItem
              label={t('SETTINGS.OPTIONS.ZOOM')}
              value={settings.zoom.label}
              options={zoomOptions}
              onClick={openMenu}
              Icon={ZoomIn}
              iconColor={fiveosTheme.colors.accent.green}
            />
          </SettingsCategory>

          {/* Twitter Section */}
          <SettingsCategory title={t('APPS_TWITTER')}>
            <SettingItem
              label={t('SETTINGS.OPTIONS.NOTIFICATION_FILTER')}
              value={settings.TWITTER_notiFilter.label}
              options={twitterNotificationFilters}
              onClick={openMenu}
              Icon={ListFilter}
              iconColor="#1DA1F2"
            />
            <SettingItem
              label={t('SETTINGS.OPTIONS.NOTIFICATION')}
              value={settings.TWITTER_notiSound.label}
              options={twitterNotifications}
              onClick={openMenu}
              Icon={FileMusic}
              iconColor="#1DA1F2"
            />
            <SettingItemSlider
              label={t('SETTINGS.OPTIONS.NOTIFICATION_VOLUME')}
              value={settings.TWITTER_notiSoundVol}
              onCommit={(val) => handleSettingChange('TWITTER_notiSoundVol', val)}
              icon={<Volume2 />}
              iconColor="#1DA1F2"
            />
          </SettingsCategory>

          {/* Marketplace Section */}
          <SettingsCategory title={t('APPS_MARKETPLACE')}>
            <SettingSwitch
              label={t('SETTINGS.MARKETPLACE.NOTIFICATION')}
              secondary={t('SETTINGS.MARKETPLACE.NOTIFY_NEW_LISTING')}
              value={settings.MARKETPLACE_notifyNewListing}
              icon={<Bell />}
              iconColor="#8B5CF6"
              onClick={(curr: boolean) => handleSettingChange('MARKETPLACE_notifyNewListing', !curr)}
            />
          </SettingsCategory>

          {/* Actions Section */}
          <SettingsCategory title={t('SETTINGS.CATEGORY.ACTIONS')}>
            <SettingItem
              label={t('SETTINGS.OPTIONS.RESET_SETTINGS')}
              value={t('SETTINGS.OPTIONS.RESET_SETTINGS_DESC')}
              Icon={Eraser}
              iconColor={fiveosTheme.colors.accent.red}
              onClick={openMenu}
              options={resetSettingsOpts}
            />
          </SettingsCategory>
        </div>
      </AppContent>
      <ContextMenu />
    </AppWrapper>
  );
};
