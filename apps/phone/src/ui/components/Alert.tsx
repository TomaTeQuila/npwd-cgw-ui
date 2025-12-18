import React, { forwardRef } from 'react';
import { AlertColor } from '@mui/material/Alert';
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { fiveosTheme } from '../../styles/fiveos.theme';

interface FiveOSAlertProps {
  severity?: AlertColor;
  children: React.ReactNode;
  onClose?: () => void;
}

/**
 * FiveOS Alert Component
 * 
 * iOS-style floating notification with glass effect.
 * Appears at top of screen like Dynamic Island notifications.
 */
export const Alert = forwardRef<HTMLDivElement, FiveOSAlertProps>(
  ({ severity = 'info', children, onClose }, ref) => {
    // Icon and color based on severity
    const getConfig = () => {
      switch (severity) {
        case 'success':
          return {
            icon: <CheckCircle size={20} />,
            color: fiveosTheme.colors.accent.green,
            bg: 'rgba(52, 199, 89, 0.15)',
          };
        case 'error':
          return {
            icon: <XCircle size={20} />,
            color: '#FF3B30',
            bg: 'rgba(255, 59, 48, 0.15)',
          };
        case 'warning':
          return {
            icon: <AlertCircle size={20} />,
            color: fiveosTheme.colors.accent.orange,
            bg: 'rgba(255, 149, 0, 0.15)',
          };
        default:
          return {
            icon: <Info size={20} />,
            color: fiveosTheme.colors.accent.blue,
            bg: 'rgba(0, 122, 255, 0.15)',
          };
      }
    };

    const config = getConfig();

    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 16px',
          background: 'linear-gradient(180deg, rgba(50, 50, 55, 0.98) 0%, rgba(35, 35, 40, 0.99) 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
          maxWidth: '320px',
          minWidth: '200px',
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: config.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: config.color,
            flexShrink: 0,
          }}
        >
          {config.icon}
        </div>

        {/* Message */}
        <div
          style={{
            flex: 1,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'white',
            lineHeight: 1.4,
            wordWrap: 'break-word',
          }}
        >
          {children}
        </div>

        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <X size={14} color="rgba(255, 255, 255, 0.6)" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
