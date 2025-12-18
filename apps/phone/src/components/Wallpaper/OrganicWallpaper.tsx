import React from 'react';

export interface OrganicWallpaperProps {
    preset?: 'aurora' | 'sunset' | 'ocean' | 'nebula' | 'forest' | 'custom';
    customColors?: string[];
    animate?: boolean;
    className?: string;
}

/**
 * FiveOS Organic Wallpaper
 * 
 * "El wallpaper NO es fondo, es MOTOR EMOCIONAL del sistema."
 * 
 * Wallpapers generados con gradientes complejos, capas de luz,
 * y animación sutil de "respiración". Nunca plano ni estático.
 */
export const OrganicWallpaper: React.FC<OrganicWallpaperProps> = ({
    preset = 'aurora',
    customColors,
    animate = true,
    className = '',
}) => {
    // Predefined organic color palettes
    const presets = {
        aurora: {
            primary: 'rgba(255, 110, 199, 0.55)',
            secondary: 'rgba(120, 255, 230, 0.42)',
            tertiary: 'rgba(120, 140, 255, 0.45)',
            quaternary: 'rgba(255, 210, 130, 0.35)',
        },
        sunset: {
            primary: 'rgba(255, 120, 80, 0.60)',
            secondary: 'rgba(255, 180, 100, 0.45)',
            tertiary: 'rgba(180, 80, 150, 0.50)',
            quaternary: 'rgba(255, 140, 160, 0.40)',
        },
        ocean: {
            primary: 'rgba(60, 180, 255, 0.55)',
            secondary: 'rgba(80, 220, 200, 0.45)',
            tertiary: 'rgba(100, 140, 220, 0.50)',
            quaternary: 'rgba(140, 200, 255, 0.35)',
        },
        nebula: {
            primary: 'rgba(140, 80, 220, 0.55)',
            secondary: 'rgba(200, 100, 180, 0.45)',
            tertiary: 'rgba(80, 120, 200, 0.50)',
            quaternary: 'rgba(180, 140, 255, 0.40)',
        },
        forest: {
            primary: 'rgba(80, 180, 120, 0.55)',
            secondary: 'rgba(120, 200, 160, 0.45)',
            tertiary: 'rgba(60, 140, 100, 0.50)',
            quaternary: 'rgba(160, 220, 180, 0.35)',
        },
        custom: {
            primary: customColors?.[0] || 'rgba(255, 110, 199, 0.55)',
            secondary: customColors?.[1] || 'rgba(120, 255, 230, 0.42)',
            tertiary: customColors?.[2] || 'rgba(120, 140, 255, 0.45)',
            quaternary: customColors?.[3] || 'rgba(255, 210, 130, 0.35)',
        },
    };

    const colors = presets[preset];

    return (
        <div
            className={`fiveos-wallpaper ${className}`}
            style={{
                position: 'absolute',
                inset: '-15%', // Overflow for animation movement
                zIndex: 0,
            }}
        >
            {/* Main gradient layer - "luz atravesando materia" */}
            <div
                className="fiveos-wallpaper-gradients"
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `
            radial-gradient(1100px 850px at 25% 30%, ${colors.primary}, transparent 55%),
            radial-gradient(900px 750px at 78% 26%, ${colors.secondary}, transparent 52%),
            radial-gradient(1000px 850px at 70% 78%, ${colors.tertiary}, transparent 58%),
            radial-gradient(850px 650px at 18% 82%, ${colors.quaternary}, transparent 60%),
            conic-gradient(from 220deg at 55% 45%, rgba(255,255,255,0.08), transparent 20%, rgba(255,255,255,0.05), transparent 55%, rgba(255,255,255,0.06))
          `,
                    filter: 'saturate(1.15) contrast(1.05) brightness(0.92)',
                    transform: 'rotate(-6deg) scale(1.03)',
                    animation: animate ? 'fiveos-wallpaper-drift 20s ease-in-out infinite' : 'none',
                }}
            />

            {/* Secondary light layer - overlay effects */}
            <div
                className="fiveos-wallpaper-overlay"
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `
            radial-gradient(900px 650px at 35% 40%, rgba(255,255,255,0.06), transparent 60%),
            radial-gradient(700px 520px at 72% 62%, rgba(255,255,255,0.04), transparent 62%),
            linear-gradient(120deg, rgba(0,0,0,0.22), transparent, rgba(0,0,0,0.28))
          `,
                    mixBlendMode: 'overlay',
                    opacity: 0.9,
                }}
            />

            {/* Non-uniform blur shapes - "óptica simulada" */}
            <div
                className="fiveos-wallpaper-blur-a"
                style={{
                    position: 'absolute',
                    width: '320px',
                    height: '240px',
                    left: '-40px',
                    top: '15%',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(18px) saturate(1.35)',
                    WebkitBackdropFilter: 'blur(18px) saturate(1.35)',
                    transform: 'rotate(-10deg)',
                    opacity: 0.85,
                    animation: animate ? 'fiveos-wallpaper-float-a 16s ease-in-out infinite' : 'none',
                }}
            />
            <div
                className="fiveos-wallpaper-blur-b"
                style={{
                    position: 'absolute',
                    width: '260px',
                    height: '190px',
                    right: '-50px',
                    top: '8%',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    backdropFilter: 'blur(14px) saturate(1.25)',
                    WebkitBackdropFilter: 'blur(14px) saturate(1.25)',
                    transform: 'rotate(14deg)',
                    opacity: 0.65,
                    animation: animate ? 'fiveos-wallpaper-float-b 14s ease-in-out infinite' : 'none',
                }}
            />

            {/* Distortion layer for depth */}
            <div
                className="fiveos-wallpaper-distort"
                style={{
                    position: 'absolute',
                    inset: '-12%',
                    background: `
            radial-gradient(closest-side at 42% 55%, rgba(255,255,255,0.05), transparent 65%),
            radial-gradient(closest-side at 68% 35%, rgba(255,255,255,0.04), transparent 62%)
          `,
                    filter: 'blur(22px)',
                    opacity: 0.55,
                    mixBlendMode: 'soft-light',
                    animation: animate ? 'fiveos-wallpaper-distort 18s ease-in-out infinite' : 'none',
                }}
            />

            {/* Film grain texture */}
            <div
                className="fiveos-wallpaper-grain"
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.10,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E")`,
                    backgroundSize: '180px 180px',
                    mixBlendMode: 'overlay',
                    pointerEvents: 'none',
                }}
            />

            {/* Animation keyframes are defined in CSS */}
            <style>{`
        @keyframes fiveos-wallpaper-drift {
          0%, 100% {
            transform: rotate(-6deg) scale(1.03) translate(0, 0);
          }
          50% {
            transform: rotate(-7.2deg) scale(1.05) translate(10px, -8px);
          }
        }
        
        @keyframes fiveos-wallpaper-float-a {
          0%, 100% {
            transform: rotate(-10deg) translate(0, 0);
            opacity: 0.85;
          }
          50% {
            transform: rotate(-12deg) translate(15px, -10px);
            opacity: 0.75;
          }
        }
        
        @keyframes fiveos-wallpaper-float-b {
          0%, 100% {
            transform: rotate(14deg) translate(0, 0);
            opacity: 0.65;
          }
          50% {
            transform: rotate(16deg) translate(-12px, 8px);
            opacity: 0.55;
          }
        }
        
        @keyframes fiveos-wallpaper-distort {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.55;
          }
          50% {
            transform: translate(-10px, 8px);
            opacity: 0.65;
          }
        }
      `}</style>
        </div>
    );
};

export default OrganicWallpaper;
