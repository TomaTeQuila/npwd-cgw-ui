import React from 'react';
import { useHistory } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { fiveosTheme } from '../../styles/fiveos.theme';

export interface BackNavigationProps {
    label?: string;
    to?: string;
    onClick?: () => void;
    className?: string;
}

/**
 * FiveOS Back Navigation Link
 * 
 * Link azul "< Volver" estilo iPhone.
 * Aparece en el header de las apps para volver atrás.
 */
export const BackNavigation: React.FC<BackNavigationProps> = ({
    label = 'Volver',
    to,
    onClick,
    className = '',
}) => {
    const history = useHistory();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (to) {
            history.push(to);
        } else {
            history.goBack();
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`fiveos-back-link ${className}`}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                background: 'transparent',
                border: 'none',
                padding: '8px 4px 8px 0',
                cursor: 'pointer',
                color: fiveosTheme.colors.accent.blue,
                fontFamily: fiveosTheme.typography.fontFamily,
                fontSize: '17px',
                fontWeight: fiveosTheme.typography.fontWeight.regular,
                transition: `opacity ${fiveosTheme.transitions.fast}`,
            }}
        >
            <ChevronLeft
                size={22}
                style={{
                    marginLeft: '-4px',
                    strokeWidth: 2.5,
                }}
            />
            <span>{label}</span>
        </button>
    );
};

export default BackNavigation;
