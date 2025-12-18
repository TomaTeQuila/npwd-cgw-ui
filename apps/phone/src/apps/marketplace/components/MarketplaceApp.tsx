import React from 'react';
import { AppWrapper } from '@ui/components';
import { AppContent } from '@ui/components/AppContent';
import { MarketplaceListContainer } from './MarketplaceList/MarketplaceListContainer';
import { NavigationBar } from './navigation/NavigationBar';
import { Switch, Route } from 'react-router-dom';
import { ListingFormContainer } from './form/ListingFormContainer';
import { useApp } from '@os/apps/hooks/useApps';
import { WordFilterProvider } from '@os/wordfilter/providers/WordFilterProvider';
import { createExternalAppProvider } from '@os/apps/utils/createExternalAppProvider';
import { useTranslation } from 'react-i18next';

export const MarketplaceApp: React.FC = () => {
  const marketplaceApp = useApp('MARKETPLACE');
  const Provider = createExternalAppProvider(marketplaceApp);
  const [t] = useTranslation();

  return (
    <Provider>
      <AppWrapper id="marketplace-app">
        {/* Modern purple gradient header */}
        <div
          className="px-4 py-4"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(30, 30, 30, 0.95) 50%, rgba(88, 28, 135, 0.2) 100%)',
            borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
          }}
        >
          <h1
            className="text-2xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 50%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
            }}
          >
            {String(t(marketplaceApp?.nameLocale || 'Marketplace'))}
          </h1>
        </div>

        {/* Content with purple-tinted dark background */}
        <div
          className="flex-1 overflow-y-auto"
          style={{
            background: 'linear-gradient(180deg, rgba(30, 30, 30, 1) 0%, rgba(20, 15, 30, 1) 100%)',
          }}
        >
          <WordFilterProvider>
            <Switch>
              <Route path="/marketplace" exact component={MarketplaceListContainer} />
              <Route path="/marketplace/new" component={ListingFormContainer} />
            </Switch>
          </WordFilterProvider>
        </div>

        <NavigationBar />
      </AppWrapper>
    </Provider>
  );
};
