import React from 'react';
import { X } from 'lucide-react';
import * as DialogRadix from '@radix-ui/react-dialog';
import { fiveosTheme } from '../../styles/fiveos.theme';

interface ModalProps {
  children: React.ReactNode;
  visible?: boolean;
  handleClose?: () => void;
}

/**
 * FiveOS Modal - Legacy version
 * Uses Paper-based modal with glass styling
 */
export const Modal: React.FC<ModalProps> = ({ children, visible, handleClose }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.7)',
        }}
      />

      {/* Modal content */}
      <div
        style={{
          position: 'relative',
          width: '90%',
          maxWidth: '320px',
          background: 'linear-gradient(180deg, rgba(50, 50, 55, 0.98) 0%, rgba(35, 35, 40, 0.99) 100%)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
          padding: '20px',
          zIndex: 101,
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={16} color="rgba(255, 255, 255, 0.6)" />
        </button>

        {children}
      </div>
    </div>
  );
};

/**
 * FiveOS Modal2 - Modern Radix-based version
 * Glass effect with subtle animations
 */
export const Modal2: React.FC<ModalProps> = ({ children, visible, handleClose }) => {
  return (
    <DialogRadix.Root open={visible} onOpenChange={handleClose}>
      <DialogRadix.Portal container={document.getElementById('phone')}>
        <DialogRadix.Overlay
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
          }}
        />
        <DialogRadix.Content
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '85%',
            maxWidth: '320px',
            maxHeight: '80vh',
            background: 'linear-gradient(180deg, rgba(50, 50, 55, 0.98) 0%, rgba(35, 35, 40, 0.99) 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
            padding: '20px',
            color: 'white',
            fontFamily: fiveosTheme.typography.fontFamily,
            overflowY: 'auto',
          }}
        >
          {children}
        </DialogRadix.Content>
      </DialogRadix.Portal>
    </DialogRadix.Root>
  );
};

export default Modal;
