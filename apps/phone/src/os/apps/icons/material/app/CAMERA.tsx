import React from 'react';

// iOS-style camera icon - outline with dark lens circle
const CameraIcon: React.FC = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Camera body outline */}
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" fill="none" />
        {/* Lens circle - filled dark */}
        <circle cx="12" cy="13" r="4" fill="currentColor" stroke="none" />
    </svg>
);

export default CameraIcon;
