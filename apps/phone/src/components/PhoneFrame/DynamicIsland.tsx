import React, { ReactNode } from 'react';

export interface DynamicIslandProps {
    expanded?: boolean;
    content?: ReactNode;
    className?: string;
}

/**
 * FiveOS Dynamic Island Component
 * 
 * Implementación de la Dynamic Island estilo iPhone 14 Pro+.
 * Estados: compacto (pill) y expandido (redondeado grande).
 * Animaciones suaves para transiciones.
 */
export const DynamicIsland: React.FC<DynamicIslandProps> = ({
    expanded = false,
    content,
    className = '',
}) => {
    return (
        <div
            className={`fiveos-dynamic-island ${expanded ? 'fiveos-island-expanded' : ''} ${className}`}
            style={{
                position: 'absolute',
                top: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,

                // Base state (compact pill)
                width: expanded ? '280px' : '126px',
                height: expanded ? '72px' : '36px',
                borderRadius: expanded ? '28px' : '24px',

                // Background
                background: 'rgba(0, 0, 0, 0.95)',

                // Subtle border for definition
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 0.5px rgba(255, 255, 255, 0.1)',

                // Smooth transitions
                transition: 'all 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',

                // Content alignment
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Camera lens (always visible) */}
            <div
                className="fiveos-island-camera"
                style={{
                    position: 'absolute',
                    right: expanded ? '22px' : '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #1a1a2e, #0a0a15)',
                    boxShadow:
                        'inset 0 1px 2px rgba(0, 0, 0, 0.8), ' +
                        '0 0 0 2px rgba(30, 40, 60, 0.8), ' +
                        '0 0 0 3px rgba(0, 0, 0, 0.9)',
                    transition: 'right 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
            >
                {/* Lens reflection */}
                <div
                    style={{
                        position: 'absolute',
                        top: '3px',
                        left: '3px',
                        width: '3px',
                        height: '3px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.3)',
                    }}
                />
            </div>

            {/* Face ID sensors (left side) */}
            <div
                className="fiveos-island-sensor"
                style={{
                    position: 'absolute',
                    left: expanded ? '22px' : '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 40% 40%, #1a0a1a, #0a050a)',
                    opacity: 0.8,
                    transition: 'left 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
            />

            {/* Expanded content area */}
            {expanded && content && (
                <div
                    className="fiveos-island-content"
                    style={{
                        flex: 1,
                        padding: '8px 48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '14px',
                        fontWeight: 500,
                        opacity: expanded ? 1 : 0,
                        transition: 'opacity 300ms ease 100ms',
                    }}
                >
                    {content}
                </div>
            )}

            {/* Subtle inner glow for depth */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 'inherit',
                    background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255, 255, 255, 0.05), transparent 50%)',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
};

export default DynamicIsland;
