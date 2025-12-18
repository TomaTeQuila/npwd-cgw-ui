import React from 'react';
import { ContactList } from '../List/ContactList';
import { useTranslation } from 'react-i18next';
import { fiveosTheme } from '../../../../styles/fiveos.theme';

/**
 * FiveOS Contacts Page
 * 
 * Main contacts view with large iOS-style header.
 */
export const ContactPage: React.FC = () => {
  const [t] = useTranslation();

  return (
    <div
      className="fiveos-contacts-page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* FiveOS Header */}
      <div
        style={{
          padding: '16px 20px 8px 20px',
          paddingTop: '54px', // Space for status bar
          flexShrink: 0,
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
          {String(t('APPS_CONTACTS'))}
        </h1>
      </div>

      {/* Contacts List */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <ContactList />
      </div>
    </div>
  );
};