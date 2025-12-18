/**
 * FiveOS Glass Styles
 * 
 * Estilos de glassmorphism siguiendo FiveOS Visual Language Spec v2.0
 * "El blur NO es un filtro, es un material físico simulado."
 * "Blur no uniforme, el fondo se deforma, hay capas de blur."
 */

// === GLASS SURFACE PRESETS ===

/**
 * Light glass - subtle, for cards and containers
 */
export const glassLight = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
    backdropFilter: 'blur(20px) saturate(1.4)',
    WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
};

/**
 * Dark glass - for dark theme surfaces
 */
export const glassDark = {
    background: 'linear-gradient(180deg, rgba(28, 28, 32, 0.88) 0%, rgba(18, 18, 22, 0.95) 100%)',
    backdropFilter: 'blur(24px) saturate(1.5)',
    WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
};

/**
 * Dock glass - dominant floating element
 */
export const glassDock = {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(30px) saturate(1.6)',
    WebkitBackdropFilter: 'blur(30px) saturate(1.6)',
    border: '1px solid rgba(255, 255, 255, 0.20)',
    borderRadius: '28px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
};

/**
 * Call overlay glass - heavy blur for call screen
 */
export const glassCallOverlay = {
    background: 'linear-gradient(180deg, rgba(20, 20, 25, 0.80) 0%, rgba(10, 10, 15, 0.95) 100%)',
    backdropFilter: 'blur(50px) saturate(1.8)',
    WebkitBackdropFilter: 'blur(50px) saturate(1.8)',
};

/**
 * Modal glass - floating dialog
 */
export const glassModal = {
    background: 'linear-gradient(145deg, rgba(40, 40, 48, 0.92) 0%, rgba(28, 28, 34, 0.96) 100%)',
    backdropFilter: 'blur(40px) saturate(1.7)',
    WebkitBackdropFilter: 'blur(40px) saturate(1.7)',
    border: '1px solid rgba(255, 255, 255, 0.10)',
    borderRadius: '24px',
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.45)',
};

/**
 * Card glass - content cards
 */
export const glassCard = {
    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)',
    backdropFilter: 'blur(16px) saturate(1.4)',
    WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
    border: '1px solid rgba(255, 255, 255, 0.10)',
    borderRadius: '18px',
    boxShadow: '0 10px 35px rgba(0, 0, 0, 0.20)',
};

/**
 * Notification glass - floating alerts
 */
export const glassNotification = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.10) 100%)',
    backdropFilter: 'blur(24px) saturate(1.5)',
    WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '24px',
    boxShadow: '0 16px 50px rgba(0, 0, 0, 0.30)',
};

/**
 * Input glass - form inputs
 */
export const glassInput = {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '12px',
};

/**
 * Header glass - app headers with blur
 */
export const glassHeader = {
    background: 'linear-gradient(180deg, rgba(18, 18, 22, 0.95) 0%, rgba(18, 18, 22, 0.80) 100%)',
    backdropFilter: 'blur(20px) saturate(1.4)',
    WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
};

// === EXPORT COMBINED ===
export const glassStyles = {
    light: glassLight,
    dark: glassDark,
    dock: glassDock,
    callOverlay: glassCallOverlay,
    modal: glassModal,
    card: glassCard,
    notification: glassNotification,
    input: glassInput,
    header: glassHeader,
};

export default glassStyles;
