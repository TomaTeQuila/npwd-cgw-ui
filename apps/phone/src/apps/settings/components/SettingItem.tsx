import React from 'react';
import { Typography } from '@mui/material';
import { Tooltip } from '@ui/components/Tooltip';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { ChevronRight } from 'lucide-react';
import {
  NPWDButton,
  SwitchRoot,
  SwitchThumb,
  SliderRoot,
} from '@npwd/keyos';
import { LucideIcon } from 'lucide-react';
import { fiveosTheme } from '../../../styles/fiveos.theme';

/**
 * FiveOS Setting Item Base Container
 * iOS-style list item with icon, label, and action
 */
const SettingItemContainer: React.FC<{
  onClick?: () => void;
  children: React.ReactNode;
  showDivider?: boolean;
}> = ({ onClick, children, showDivider = true }) => (
  <div
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'background 150ms ease',
      borderBottom: showDivider ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
    }}
    className="hover:bg-white/5 active:bg-white/10"
  >
    {children}
  </div>
);

/**
 * FiveOS Icon Container
 * Colored rounded square icon background
 */
const IconContainer: React.FC<{
  Icon: LucideIcon | React.ComponentType<any>;
  color?: string;
}> = ({ Icon, color = fiveosTheme.colors.accent.blue }) => (
  <div
    style={{
      width: '30px',
      height: '30px',
      borderRadius: '7px',
      background: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '12px',
      flexShrink: 0,
    }}
  >
    <Icon size={18} color="white" />
  </div>
);

interface SettingItemProps {
  options?: any;
  label: string;
  value?: string | object | number | null;
  onClick?: any;
  Icon: LucideIcon;
  iconColor?: string;
  theme?: any;
}

export const SettingItem: React.FC<SettingItemProps> = ({
  options,
  label,
  value,
  onClick,
  Icon,
  iconColor = fiveosTheme.colors.accent.blue,
}) => {
  const displayValue = value?.toString() || '';
  const isLongValue = displayValue.length > 20;

  return (
    <SettingItemContainer onClick={() => onClick?.(options, label)}>
      <IconContainer Icon={Icon} color={iconColor} />

      <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
        <span
          style={{
            fontFamily: fiveosTheme.typography.fontFamily,
            fontSize: '16px',
            fontWeight: fiveosTheme.typography.fontWeight.regular,
            color: 'rgba(255, 255, 255, 0.95)',
            display: 'block',
          }}
        >
          {label}
        </span>
        {isLongValue && displayValue && (
          <span
            style={{
              fontFamily: fiveosTheme.typography.fontFamily,
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.45)',
              display: 'block',
              marginTop: '2px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {displayValue}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
        {!isLongValue && displayValue && (
          <span
            style={{
              fontFamily: fiveosTheme.typography.fontFamily,
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.45)',
              maxWidth: '100px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {displayValue}
          </span>
        )}
        <ChevronRight size={18} color="rgba(255, 255, 255, 0.3)" />
      </div>
    </SettingItemContainer>
  );
};

interface SoundItemProps {
  options?: any;
  label: string;
  value?: string | object | number | null;
  onClick?: any;
  Icon: LucideIcon;
  iconColor?: string;
  tooltip: string;
  onPreviewClicked: any;
  theme?: any;
}

export const SoundItem: React.FC<SoundItemProps> = ({
  options,
  label,
  value,
  onClick,
  Icon,
  iconColor = fiveosTheme.colors.accent.pink,
  tooltip,
  onPreviewClicked,
}) => (
  <SettingItemContainer onClick={() => onClick?.(options, label)}>
    <IconContainer Icon={Icon} color={iconColor} />

    <div style={{ flex: 1, minWidth: 0 }}>
      <span
        style={{
          fontFamily: fiveosTheme.typography.fontFamily,
          fontSize: '16px',
          fontWeight: fiveosTheme.typography.fontWeight.regular,
          color: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        {label}
      </span>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {value && (
        <span
          style={{
            fontFamily: fiveosTheme.typography.fontFamily,
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.45)',
          }}
        >
          {value.toString()}
        </span>
      )}
      <Tooltip title={tooltip} placement="left" arrow>
        <NPWDButton
          size="icon"
          variant="ghost"
          className="rounded-full h-8 w-8"
          onClick={(e) => {
            e.stopPropagation();
            onPreviewClicked?.(options, label);
          }}
        >
          <PlayCircleIcon
            style={{
              fontSize: '22px',
              color: fiveosTheme.colors.accent.green
            }}
          />
        </NPWDButton>
      </Tooltip>
    </div>
  </SettingItemContainer>
);

interface SettingSliderProps {
  label: string;
  icon: JSX.Element;
  iconColor?: string;
  value: number;
  onCommit: (value: number | number[]) => void;
  theme?: any;
}

export const SettingItemSlider: React.FC<SettingSliderProps> = ({
  icon,
  iconColor = fiveosTheme.colors.accent.orange,
  label,
  value,
  onCommit,
}) => (
  <SettingItemContainer>
    <div
      style={{
        width: '30px',
        height: '30px',
        borderRadius: '7px',
        background: iconColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '12px',
        flexShrink: 0,
      }}
    >
      {React.cloneElement(icon, { size: 18, color: 'white' })}
    </div>

    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span
        style={{
          fontFamily: fiveosTheme.typography.fontFamily,
          fontSize: '16px',
          fontWeight: fiveosTheme.typography.fontWeight.regular,
          color: 'rgba(255, 255, 255, 0.95)',
          minWidth: '80px',
        }}
      >
        {label}
      </span>

      <div style={{ flex: 1, maxWidth: '140px' }}>
        <SliderRoot
          key={`slider-${value}`}
          defaultValue={[value]}
          min={0}
          max={100}
          onValueCommit={(val) => onCommit(val[0])}
        />
      </div>

      <span
        style={{
          fontFamily: fiveosTheme.typography.fontFamily,
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.45)',
          width: '32px',
          textAlign: 'right',
        }}
      >
        {value}%
      </span>
    </div>
  </SettingItemContainer>
);

interface SettingSwitchProps {
  label: string;
  value: boolean;
  onClick: any;
  icon: JSX.Element;
  iconColor?: string;
  secondary: string;
  theme?: any;
}

export const SettingSwitch: React.FC<SettingSwitchProps> = ({
  label,
  value,
  onClick,
  icon,
  iconColor = fiveosTheme.colors.accent.purple,
  secondary,
}) => (
  <SettingItemContainer showDivider={true}>
    <div
      style={{
        width: '30px',
        height: '30px',
        borderRadius: '7px',
        background: iconColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '12px',
        flexShrink: 0,
      }}
    >
      {React.cloneElement(icon, { size: 18, color: 'white' })}
    </div>

    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          fontFamily: fiveosTheme.typography.fontFamily,
          fontSize: '16px',
          fontWeight: fiveosTheme.typography.fontWeight.regular,
          color: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        {label}
      </div>
      {secondary && (
        <div
          style={{
            fontFamily: fiveosTheme.typography.fontFamily,
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.45)',
            marginTop: '2px',
          }}
        >
          {secondary}
        </div>
      )}
    </div>

    <SwitchRoot
      checked={value}
      onCheckedChange={() => onClick(value)}
      style={{
        backgroundColor: value ? fiveosTheme.colors.accent.green : 'rgba(255, 255, 255, 0.2)',
      }}
    >
      <SwitchThumb />
    </SwitchRoot>
  </SettingItemContainer>
);

interface SettingItemIconActionProps {
  Icon: LucideIcon;
  iconColor?: string;
  actionIcon: JSX.Element;
  label: string;
  labelSecondary: string;
  handleAction: () => void;
  actionLabel: string;
  theme?: any;
}

export const SettingItemIconAction: React.FC<SettingItemIconActionProps> = ({
  Icon,
  iconColor = fiveosTheme.colors.accent.green,
  label,
  handleAction,
  actionIcon,
  labelSecondary,
  actionLabel,
}) => (
  <SettingItemContainer>
    <IconContainer Icon={Icon} color={iconColor} />

    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          fontFamily: fiveosTheme.typography.fontFamily,
          fontSize: '16px',
          fontWeight: fiveosTheme.typography.fontWeight.regular,
          color: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: fiveosTheme.typography.fontFamily,
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.55)',
          marginTop: '2px',
        }}
      >
        {labelSecondary}
      </div>
    </div>

    <Tooltip
      arrow
      title={<Typography variant="body2">{actionLabel}</Typography>}
      placement="left"
    >
      <NPWDButton
        onClick={handleAction}
        size="icon"
        variant="ghost"
        className="rounded-full h-9 w-9"
      >
        {React.cloneElement(actionIcon, {
          style: { fontSize: '20px', color: fiveosTheme.colors.accent.blue }
        })}
      </NPWDButton>
    </Tooltip>
  </SettingItemContainer>
);
