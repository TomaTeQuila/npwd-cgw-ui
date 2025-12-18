import React, { useContext } from 'react';
import { DialInputCtx } from '../context/InputContext';
import { fiveosTheme } from '../../../styles/fiveos.theme';

/**
 * FiveOS Premium Dial Pad
 * 
 * iOS-style keypad with circular buttons, number and letter labels.
 * Premium feel with subtle animations.
 */

interface DialButtonProps {
  digit: string | number;
  letters?: string;
  onClick: () => void;
}

const DialButton: React.FC<DialButtonProps> = ({ digit, letters, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fiveos-dial-button"
      style={{
        width: '75px',
        height: '75px',
        borderRadius: '50%',
        background: 'rgba(70, 70, 75, 0.85)',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 150ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(90, 90, 95, 0.95)';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(70, 70, 75, 0.85)';
        e.currentTarget.style.transform = 'scale(1)';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.95)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
    >
      <span
        style={{
          fontFamily: fiveosTheme.typography.fontFamily,
          fontSize: '32px',
          fontWeight: fiveosTheme.typography.fontWeight.light,
          color: 'rgba(255, 255, 255, 0.95)',
          lineHeight: 1,
        }}
      >
        {digit}
      </span>
      {letters && (
        <span
          style={{
            fontFamily: fiveosTheme.typography.fontFamily,
            fontSize: '10px',
            fontWeight: fiveosTheme.typography.fontWeight.regular,
            color: 'rgba(255, 255, 255, 0.55)',
            letterSpacing: '2px',
            marginTop: '2px',
          }}
        >
          {letters}
        </span>
      )}
    </button>
  );
};

export const DialGrid = () => {
  const { add, removeOne, clear } = useContext(DialInputCtx);

  // Keypad layout with letters
  const buttons = [
    { digit: '1', letters: '', onClick: () => add(1) },
    { digit: '2', letters: 'ABC', onClick: () => add(2) },
    { digit: '3', letters: 'DEF', onClick: () => add(3) },
    { digit: '4', letters: 'GHI', onClick: () => add(4) },
    { digit: '5', letters: 'JKL', onClick: () => add(5) },
    { digit: '6', letters: 'MNO', onClick: () => add(6) },
    { digit: '7', letters: 'PQRS', onClick: () => add(7) },
    { digit: '8', letters: 'TUV', onClick: () => add(8) },
    { digit: '9', letters: 'WXYZ', onClick: () => add(9) },
    { digit: '*', letters: '', onClick: clear },
    { digit: '0', letters: '+', onClick: () => add(0) },
    { digit: '#', letters: '', onClick: removeOne },
  ];

  return (
    <div
      className="fiveos-dial-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        justifyItems: 'center',
        padding: '16px 24px',
      }}
    >
      {buttons.map((btn, idx) => (
        <DialButton
          key={idx}
          digit={btn.digit}
          letters={btn.letters}
          onClick={btn.onClick}
        />
      ))}
    </div>
  );
};

export default DialGrid;
