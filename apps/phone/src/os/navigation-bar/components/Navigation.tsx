import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { usePhone } from '@os/phone/hooks/usePhone';

/**
 * FiveOS Home Indicator
 * 
 * Barra minimalista estilo iOS - sin fondo, solo la barra gris.
 * Un click/tap navega al home, doble click cierra el teléfono.
 */
export const Navigation: React.FC = () => {
  const history = useHistory();
  const { isExact } = useRouteMatch('/');
  const { closePhone } = usePhone();

  const handleGoToMenu = () => {
    if (isExact) {
      // On home screen, close phone
      closePhone();
    } else {
      // Navigate to home
      history.push('/');
    }
  };

  return (
    <div
      className="fiveos-home-indicator"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        zIndex: 200,
      }}
    >
      {/* The indicator bar - minimal, clean */}
      <div
        onClick={handleGoToMenu}
        onDoubleClick={() => closePhone()}
        style={{
          width: '134px',
          height: '5px',
          backgroundColor: 'rgba(255, 255, 255, 0.45)',
          borderRadius: '100px',
          cursor: 'pointer',
          transition: 'all 200ms ease',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
        }}
        className="hover:opacity-80 active:scale-95 active:opacity-60"
        title={isExact ? 'Cerrar teléfono' : 'Ir al inicio'}
      />
    </div>
  );
};
