import React, { Fragment } from 'react';
import { AppIcon } from './AppIcon';
import { IApp } from '@os/apps/config/apps';

interface GridMenuProps {
  items: IApp[];
  Component?: React.ElementType;
  columns?: number;
}

/**
 * FiveOS Grid Menu
 * 
 * Grid de apps con spacing generoso.
 * "El espacio es protagonista, no relleno."
 */
export const GridMenu: React.FC<GridMenuProps> = ({
  items,
  Component = AppIcon,
  columns = 4, // iOS default
}) => {
  // Micro-offset patterns for "tensión controlada"
  const getOffset = (index: number): React.CSSProperties => {
    const offsets = [
      { transform: 'translate(-1px, 1px)' },
      { transform: 'translate(1px, -1px)' },
      { transform: 'translate(0px, 1px)' },
      { transform: 'translate(-1px, 0px)' },
      { transform: 'translate(1px, 1px)' },
      { transform: 'translate(-1px, 0px)' },
      { transform: 'translate(1px, 1px)' },
      { transform: 'translate(0px, -1px)' },
    ];
    return offsets[index % offsets.length];
  };

  return (
    <div
      className="fiveos-grid-menu"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '24px 8px', // More row gap for labels
        justifyItems: 'center',
        padding: '0 8px',
      }}
    >
      {items &&
        items.length > 0 &&
        items.map((item, index) => (
          <Fragment key={item.id}>
            {!item.isDisabled && (
              <div style={getOffset(index)}>
                <Component
                  id={item.id}
                  name={item.nameLocale}
                  icon={item.icon}
                  backgroundColor={item.backgroundColor}
                  color={item.color}
                  path={item.path}
                  notification={item.notification?.badge}
                  showLabel={true}
                />
              </div>
            )}
          </Fragment>
        ))}
    </div>
  );
};
