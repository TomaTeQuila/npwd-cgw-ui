/**
 * iOS 18 Style Glassmorphism Utilities
 * 
 * Common glass effect styles for consistent iOS-like appearance across the phone UI.
 */

// Glass effect for light backgrounds
export const glassLight = {
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
};

// Glass effect for dark backgrounds
export const glassDark = {
    background: 'rgba(30, 30, 30, 0.75)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
};

// Glass effect for dock/bottom bars
export const glassDock = {
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    borderRadius: '24px',
};

// Glass effect for call overlay
export const glassCallOverlay = {
    background: 'linear-gradient(180deg, rgba(20,20,25,0.75) 0%, rgba(15,15,20,0.92) 100%)',
    backdropFilter: 'blur(40px) saturate(180%)',
    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
};

// Glass effect for modals
export const glassModal = {
    background: 'rgba(40, 40, 45, 0.9)',
    backdropFilter: 'blur(30px)',
    WebkitBackdropFilter: 'blur(30px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
};

// Glass effect for cards
export const glassCard = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
};

// Export all as a combined object for easy access
export const glassStyles = {
    light: glassLight,
    dark: glassDark,
    dock: glassDock,
    callOverlay: glassCallOverlay,
    modal: glassModal,
    card: glassCard,
};

export default glassStyles;
