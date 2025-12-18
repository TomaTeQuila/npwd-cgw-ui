import React, { ReactNode } from 'react';
import { DynamicIsland } from './DynamicIsland';
import './PhoneFrame.css';

export interface PhoneFrameProps {
    children: ReactNode;
    frameColor?: 'black' | 'silver' | 'gold' | 'blue';
    showDynamicIsland?: boolean;
    islandExpanded?: boolean;
    islandContent?: ReactNode;
}

/**
 * FiveOS iPhone 17-style Phone Frame
 * 
 * Frame CSS-based (no imagen PNG) con Dynamic Island programable.
 * Permite personalización de colores y animaciones en la island.
 */
export const PhoneFrame: React.FC<PhoneFrameProps> = ({
    children,
    frameColor = 'black',
    showDynamicIsland = true,
    islandExpanded = false,
    islandContent,
}) => {
    // Frame color configurations
    const frameColors = {
        black: {
            bezel: '#1a1a1a',
            edge: '#0a0a0a',
            highlight: 'rgba(255, 255, 255, 0.08)',
        },
        silver: {
            bezel: '#d4d4d8',
            edge: '#a1a1aa',
            highlight: 'rgba(255, 255, 255, 0.25)',
        },
        gold: {
            bezel: '#d4a574',
            edge: '#b8956a',
            highlight: 'rgba(255, 255, 255, 0.20)',
        },
        blue: {
            bezel: '#3b5998',
            edge: '#2d4373',
            highlight: 'rgba(255, 255, 255, 0.15)',
        },
    };

    const colors = frameColors[frameColor];

    return (
        <div
            className="fiveos-phone-frame"
            style={{
                // Frame bezel
                '--frame-bezel': colors.bezel,
                '--frame-edge': colors.edge,
                '--frame-highlight': colors.highlight,
            } as React.CSSProperties}
        >
            {/* Outer bezel with subtle gradient */}
            <div className="fiveos-phone-bezel">
                {/* Inner edge reflection */}
                <div className="fiveos-phone-edge">
                    {/* Screen area */}
                    <div className="fiveos-phone-screen">
                        {/* Dynamic Island */}
                        {showDynamicIsland && (
                            <DynamicIsland
                                expanded={islandExpanded}
                                content={islandContent}
                            />
                        )}

                        {/* Screen content */}
                        <div className="fiveos-phone-content">
                            {children}
                        </div>

                        {/* Screen inner shadow for depth */}
                        <div className="fiveos-screen-shadow" />
                    </div>
                </div>
            </div>

            {/* Side buttons (volume, power) */}
            <div className="fiveos-button-volume-up" />
            <div className="fiveos-button-volume-down" />
            <div className="fiveos-button-power" />
            <div className="fiveos-button-mute" />
        </div>
    );
};

export default PhoneFrame;
