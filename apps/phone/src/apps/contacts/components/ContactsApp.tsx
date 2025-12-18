import React from 'react';
import { AppWrapper } from '@ui/components';
import { AppContent } from '@ui/components/AppContent';
import { Route } from 'react-router-dom';
import ContactsInfoPage from './views/ContactInfo';
import { ContactPage } from './views/ContactsPage';
import { ContactsThemeProvider } from '../providers/ContactsThemeProvider';
import { LoadingSpinner } from '@ui/components/LoadingSpinner';

/**
 * FiveOS Contacts App
 * 
 * iOS-style contacts with large header, search, and alphabet index.
 */
export const ContactsApp: React.FC = () => {
  return (
    <ContactsThemeProvider>
      <AppWrapper id="contact-app">
        <AppContent
          style={{
            background: 'transparent',
          }}
        >
          <React.Suspense fallback={<LoadingSpinner />}>
            <Route path="/contacts/" exact component={ContactPage} />
            <Route path="/contacts/:id" exact component={ContactsInfoPage} />
          </React.Suspense>
        </AppContent>
      </AppWrapper>
    </ContactsThemeProvider>
  );
};
