/**
 * FiveOS Theme System
 * 
 * TypeScript design tokens and theme utilities for FiveOS
 * Siguiendo FiveOS Visual Language Spec v2.0
 * 
 * NOTE: No backdrop-filter blur - not compatible with CEF/FiveM
 */

// === COLOR PALETTE ===
export const fiveosColors = {
    // Glass surfaces (using solid colors, no blur)
    glass: {
        primary: 'rgba(45, 45, 50, 0.92)',
        secondary: 'rgba(55, 55, 60, 0.88)',
        hover: 'rgba(65, 65, 70, 0.92)',
        active: 'rgba(75, 75, 80, 0.95)',
    },

    // Strokes
    stroke: {
        default: 'rgba(255, 255, 255, 0.18)',
        subtle: 'rgba(255, 255, 255, 0.08)',
    },

    // Text (nunca puro, siempre volumétrico)
    text: {
        primary: 'rgba(255, 255, 255, 0.95)',
        secondary: 'rgba(255, 255, 255, 0.70)',
        muted: 'rgba(255, 255, 255, 0.50)',
    },

    // Accents (iluminados, no pintados)
    accent: {
        blue: '#007AFF',
        green: '#34C759',
        red: '#FF3B30',
        orange: '#FF9500',
        purple: '#AF52DE',
        pink: '#FF2D55',
        teal: '#5AC8FA',
    },

    // Backgrounds
    background: {
        primary: '#000000',
        secondary: 'rgba(28, 28, 30, 0.95)',
        tertiary: 'rgba(44, 44, 46, 0.90)',
        elevated: 'rgba(58, 58, 60, 0.85)',
    },
} as const;

// === LIGHT THEME COLORS ===
export const fiveosColorsLight = {
    glass: {
        primary: 'rgba(242, 242, 247, 0.92)',
        secondary: 'rgba(230, 230, 235, 0.88)',
        hover: 'rgba(220, 220, 225, 0.92)',
        active: 'rgba(210, 210, 215, 0.95)',
    },
    stroke: {
        default: 'rgba(0, 0, 0, 0.12)',
        subtle: 'rgba(0, 0, 0, 0.06)',
    },
    text: {
        primary: 'rgba(0, 0, 0, 0.90)',
        secondary: 'rgba(0, 0, 0, 0.60)',
        muted: 'rgba(0, 0, 0, 0.40)',
    },
    background: {
        primary: '#F2F2F7',
        secondary: 'rgba(255, 255, 255, 0.95)',
        tertiary: 'rgba(255, 255, 255, 0.90)',
        elevated: 'rgba(255, 255, 255, 0.85)',
    },
} as const;

// === SHADOWS (Volumétricas - used instead of blur) ===
export const fiveosShadows = {
    sm: '0 4px 12px rgba(0, 0, 0, 0.15)',
    md: '0 12px 35px rgba(0, 0, 0, 0.25)',
    lg: '0 20px 55px rgba(0, 0, 0, 0.35)',
    xl: '0 30px 80px rgba(0, 0, 0, 0.45)',
    icon: '0 4px 12px rgba(0, 0, 0, 0.25)',
    iconHover: '0 8px 20px rgba(0, 0, 0, 0.30)',
    // Inner glow for depth without blur
    innerGlow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
    dockGlow: 'inset 0 1px 1px rgba(255, 255, 255, 0.06), 0 8px 32px rgba(0, 0, 0, 0.4)',
} as const;

// === SPACING (Mucho aire, protagonista) ===
export const fiveosSpacing = {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
} as const;

// === BORDER RADIUS (Suave, orgánico) ===
export const fiveosRadius = {
    sm: '8px',
    md: '14px',
    lg: '20px',
    xl: '28px',
    '2xl': '36px',
    full: '9999px',
    icon: '22%', // iOS squircle
} as const;

// === TRANSITIONS (Orgánicas) ===
export const fiveosTransitions = {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '400ms cubic-bezier(0.4, 0, 0.2, 1)',
    spring: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

// === TYPOGRAPHY (Ligera, espaciada) ===
export const fiveosTypography = {
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", "Segoe UI", Roboto, Arial, sans-serif',
    fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
    },
    fontSize: {
        xs: '11px',
        sm: '12px',
        base: '15px',
        md: '17px',
        lg: '20px',
        xl: '28px',
        '2xl': '34px',
        display: '48px',
    },
    lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.7,
    },
} as const;

// === GLASS STYLES (NO BLUR - CEF compatible) ===
export const fiveosGlassStyles = {
    card: {
        background: 'linear-gradient(180deg, rgba(50, 50, 55, 0.95) 0%, rgba(40, 40, 45, 0.98) 100%)',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        border: '1px solid rgba(255, 255, 255, 0.10)',
        borderRadius: fiveosRadius.lg,
        boxShadow: `${fiveosShadows.lg}, ${fiveosShadows.innerGlow}`,
    },
    // iOS-style dock - dark semi-transparent like reference image
    dock: {
        background: 'linear-gradient(180deg, rgba(40, 40, 45, 0.90) 0%, rgba(28, 28, 32, 0.95) 100%)',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: fiveosRadius.xl,
        boxShadow: fiveosShadows.dockGlow,
    },
    modal: {
        background: 'linear-gradient(180deg, rgba(44, 44, 48, 0.98) 0%, rgba(28, 28, 32, 0.99) 100%)',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: fiveosRadius.xl,
        boxShadow: `${fiveosShadows.xl}, ${fiveosShadows.innerGlow}`,
    },
    statusBar: {
        background: 'transparent',
        backdropFilter: 'none',
    },
    notification: {
        background: 'linear-gradient(135deg, rgba(55, 55, 60, 0.96) 0%, rgba(40, 40, 45, 0.98) 100%)',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        border: '1px solid rgba(255, 255, 255, 0.10)',
        borderRadius: fiveosRadius.xl,
        boxShadow: `${fiveosShadows.lg}, ${fiveosShadows.innerGlow}`,
    },
} as const;

// === ICON STYLES (Objetos con luz, no símbolos planos) ===
export const fiveosIconStyles = {
    container: {
        width: '64px',
        height: '64px',
        borderRadius: '22%', // iOS squircle
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative' as const,
        overflow: 'hidden' as const,
        boxShadow: fiveosShadows.icon,
        transition: `transform ${fiveosTransitions.fast}, box-shadow ${fiveosTransitions.fast}`,
    },
    // Generates gradient background for icon
    getBackground: (color: string) => `linear-gradient(145deg, ${color} 0%, ${adjustColor(color, -15)} 100%)`,
};

// === UTILITY FUNCTIONS ===

/**
 * Adjusts color brightness (negative = darker, positive = lighter)
 */
function adjustColor(color: string, percent: number): string {
    // If it's a hex color, convert and adjust
    if (color.startsWith('#')) {
        const num = parseInt(color.slice(1), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, Math.min(255, (num >> 16) + amt));
        const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
        const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
        return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
    }
    return color;
}

/**
 * Get volumetric gradient for any color
 */
export function getVolumetricGradient(color: string, angle = 145): string {
    return `linear-gradient(${angle}deg, ${color} 0%, ${adjustColor(color, -18)} 100%)`;
}

/**
 * Get glass effect styles for a surface (NO BLUR - CEF compatible)
 */
export function getGlassEffect(intensity: 'light' | 'medium' | 'heavy' = 'medium') {
    const opacity = { light: 0.85, medium: 0.92, heavy: 0.96 };
    const baseColor = { light: 60, medium: 50, heavy: 40 };

    return {
        background: `rgba(${baseColor[intensity]}, ${baseColor[intensity]}, ${baseColor[intensity] + 5}, ${opacity[intensity]})`,
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        boxShadow: fiveosShadows.innerGlow,
    };
}

// === THEME OBJECT ===
export const fiveosTheme = {
    colors: fiveosColors,
    colorsLight: fiveosColorsLight,
    shadows: fiveosShadows,
    spacing: fiveosSpacing,
    radius: fiveosRadius,
    transitions: fiveosTransitions,
    typography: fiveosTypography,
    glass: fiveosGlassStyles,
    icon: fiveosIconStyles,
} as const;

export type FiveOSTheme = typeof fiveosTheme;

export default fiveosTheme;
