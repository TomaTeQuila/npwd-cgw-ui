import React from 'react';
import { AppWrapper } from '@ui/components';
import { GridMenu } from '@ui/components/GridMenu';
import { useApps } from '@os/apps/hooks/useApps';
import { useExternalApps } from '@common/hooks/useExternalApps';
import { AppIcon } from '@ui/components/AppIcon';
import { fiveosTheme } from '../../../styles/fiveos.theme';

// IDs of apps that go in the dock (bottom bar)
const DOCK_APP_IDS = ['DIALER', 'CONTACTS', 'MESSAGES', 'SETTINGS'];

/**
 * FiveOS Home Screen
 * 
 * "La tablet es un lienzo flotante, no un layout administrativo."
 * 
 * Grid de apps con micro-offsets para tensión controlada,
 * iconos como objetos con luz, dock flotante dominante.
 */
export const HomeApp: React.FC = () => {
  const { apps } = useApps();
  const externalApps = useExternalApps();

  // Separate dock apps from grid apps
  const dockApps = DOCK_APP_IDS
    .map(id => apps?.find(app => app.id === id))
    .filter(Boolean);

  // Grid apps = all apps NOT in dock + external apps
  const gridApps = [
    ...(apps?.filter(app => !DOCK_APP_IDS.includes(app.id)) || []),
    ...externalApps,
  ];

  return (
    <AppWrapper>
      {/* Main app grid area - breathing, spacious */}
      <div
        className="flex-1 overflow-y-auto fiveos-hide-scrollbar"
        style={{
          paddingTop: '16px',
          paddingBottom: '140px', // Space for dock + home indicator
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {gridApps.length > 0 && (
          <div
            className="px-3"
            style={{
              paddingLeft: '16px',
              paddingRight: '16px',
            }}
          >
            <GridMenu items={gridApps} columns={4} />
          </div>
        )}
      </div>

      {/* FiveOS Floating Dock - using flat AppIcon component */}
      <div
        className="absolute left-4 right-4"
        style={{
          bottom: '36px',
          zIndex: 100,
        }}
      >
        <div
          className="flex items-center justify-around"
          style={{
            ...fiveosTheme.glass.dock,
            padding: '12px 16px',
          }}
        >
          {dockApps.map((app) => (
            <AppIcon
              key={app.id}
              id={app.id}
              name={app.nameLocale}
              icon={app.icon}
              backgroundColor={app.backgroundColor}
              color={app.color}
              path={app.path}
              notification={app.notification?.badge}
              showLabel={false}
              size="small"
            />
          ))}
        </div>
      </div>
    </AppWrapper>
  );
};
