import React from 'react';
import { fiveosTheme } from '../../../styles/fiveos.theme';

interface SettingsCategoryProps {
  title: string;
  children: React.ReactNode;
}

/**
 * FiveOS Settings Category
 * 
 * iOS-style settings sections with rounded glass backgrounds,
 * grouped items, and subtle shadows.
 */
export const SettingsCategory: React.FC<SettingsCategoryProps> = ({
  title,
  children,
}) => (
  <div className="fiveos-settings-category" style={{ marginBottom: '28px' }}>
    {/* Category title - uppercase, small, muted */}
    <h2
      style={{
        fontFamily: fiveosTheme.typography.fontFamily,
        fontSize: '13px',
        fontWeight: fiveosTheme.typography.fontWeight.regular,
        color: 'rgba(255, 255, 255, 0.55)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '8px',
        marginLeft: '16px',
      }}
    >
      {title}
    </h2>

    {/* Items container - rounded card, NO BLUR */}
    <div
      style={{
        background: 'rgba(45, 45, 50, 0.95)',
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.04)',
      }}
    >
      {children}
    </div>
  </div>
);

export default SettingsCategory;
