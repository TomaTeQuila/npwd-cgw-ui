import React, { Fragment } from 'react';
import { AppIcon } from './AppIcon';
import { Link } from 'react-router-dom';
import { IApp } from '@os/apps/config/apps';

interface GridMenuProps {
  items: IApp[];
  Component?: React.ElementType;
  columns?: number;
}

export const GridMenu: React.FC<GridMenuProps> = ({
  items,
  Component = AppIcon,
  columns = 4  // iOS default: 4 columns
}) => {
  return (
    <div
      className="grid gap-y-2"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        justifyItems: 'center',
        padding: '0 8px',
      }}
    >
      {items &&
        items.length &&
        items.map((item) => (
          <Fragment key={item.id}>
            {!item.isDisabled && (
              <Link
                to={item.path}
                className="no-underline"
                style={{ textDecoration: 'none' }}
              >
                <Component {...item} />
              </Link>
            )}
          </Fragment>
        ))}
    </div>
  );
};
