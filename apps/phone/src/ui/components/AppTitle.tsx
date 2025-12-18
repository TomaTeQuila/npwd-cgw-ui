import React, { HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { IApp } from '@os/apps/config/apps';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { BackNavigation } from './BackNavigation';
import { fiveosTheme } from '../../styles/fiveos.theme';

interface AppTitleProps extends HTMLAttributes<HTMLDivElement> {
  app: IApp;
  showBackButton?: boolean;
  backLabel?: string;
  backTo?: string;
}

/**
 * FiveOS App Title Header
 * 
 * Título grande con tipografía ligera.
 * Incluye BackNavigation cuando no estamos en la raíz de la app.
 */
export const AppTitle: React.FC<AppTitleProps> = ({
  app: { nameLocale, path },
  showBackButton,
  backLabel,
  backTo,
  ...props
}) => {
  const [t] = useTranslation();
  const history = useHistory();
  const isAppRoot = useRouteMatch({ path, exact: true });

  // Show back button if explicitly set, or if we're not at app root
  const shouldShowBack = showBackButton ?? !isAppRoot;

  return (
    <div
      className="fiveos-app-header"
      style={{
        padding: '16px 16px 12px 16px',
        background: 'linear-gradient(180deg, rgba(18, 18, 22, 0.95) 0%, rgba(18, 18, 22, 0.85) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
      {...props}
    >
      {/* Back navigation */}
      {shouldShowBack && (
        <BackNavigation
          label={backLabel}
          to={backTo}
        />
      )}

      {/* App title - large, light typography */}
      <h1
        style={{
          margin: shouldShowBack ? '4px 0 0 0' : 0,
          fontFamily: fiveosTheme.typography.fontFamily,
          fontSize: shouldShowBack ? '28px' : '34px',
          fontWeight: fiveosTheme.typography.fontWeight.semibold,
          color: fiveosTheme.colors.text.primary,
          letterSpacing: '-0.5px',
          lineHeight: 1.15,
        }}
      >
        {String(t(nameLocale))}
      </h1>
    </div>
  );
};
