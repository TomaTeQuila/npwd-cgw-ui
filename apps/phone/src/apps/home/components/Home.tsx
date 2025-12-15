import React from 'react';
import { AppWrapper } from '@ui/components';
import { GridMenu } from '@ui/components/GridMenu';
import { useApps } from '@os/apps/hooks/useApps';
import { useExternalApps } from '@common/hooks/useExternalApps';
import { Link } from 'react-router-dom';

export const HomeApp: React.FC = () => {
  const { apps } = useApps();
  const externalApps = useExternalApps();

  // Apps for the dock (first 4 apps)
  const dockApps = apps?.slice(0, 4) || [];

  // Remaining apps for the grid (everything after first 4)
  const gridApps = [...(apps?.slice(4) || []), ...externalApps];

  return (
    <AppWrapper>
      {/* Main app grid area */}
      <div
        className="flex-1 overflow-y-auto pt-4 pb-28"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Dock apps shown first in a special row */}
        <div className="px-2 mb-4">
          {dockApps.length > 0 && (
            <div
              className="grid gap-y-2"
              style={{
                gridTemplateColumns: 'repeat(4, 1fr)',
                justifyItems: 'center',
              }}
            >
              {dockApps.map((app) => (
                <Link
                  key={app.id}
                  to={app.path}
                  className="no-underline"
                >
                  <div className="flex flex-col items-center gap-1 py-2">
                    <div
                      className="flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '22%',
                        background: `linear-gradient(145deg, ${app.backgroundColor} 0%, ${app.backgroundColor}dd 100%)`,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        color: app.color,
                      }}
                    >
                      {app.icon}
                    </div>
                    <span
                      className="text-white text-center"
                      style={{
                        fontSize: '10px',
                        fontWeight: 500,
                        textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                        maxWidth: '68px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {app.nameLocale.replace('APPS_', '')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Rest of apps */}
        {gridApps.length > 0 && (
          <div className="px-2">
            <GridMenu items={gridApps} columns={4} />
          </div>
        )}
      </div>

      {/* iOS-style Dock with glassmorphism */}
      <div
        className="absolute left-3 right-3"
        style={{
          bottom: '32px', // Above home indicator
          zIndex: 100,
        }}
      >
        <div
          className="flex items-center justify-around px-4 py-3"
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            borderRadius: '28px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          }}
        >
          {dockApps.map((app) => (
            <Link
              to={app.path}
              key={app.id}
              className="flex items-center justify-center transition-transform duration-150 hover:scale-110 active:scale-95"
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '22%',
                  background: `linear-gradient(145deg, ${app.backgroundColor} 0%, ${app.backgroundColor}cc 100%)`,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  color: app.color,
                }}
              >
                {app.icon}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppWrapper>
  );
};
