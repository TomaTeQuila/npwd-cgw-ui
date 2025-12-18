import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, UserPlus, Delete } from 'lucide-react';
import { DialInputCtx, IDialInputCtx } from '../context/InputContext';
import { useCall } from '@os/call/hooks/useCall';
import { fiveosTheme } from '../../../styles/fiveos.theme';

/**
 * FiveOS Dialer Input
 * 
 * Large number display with call button and actions.
 */
export const DialerInput: React.FC = () => {
  const history = useHistory();
  const [t] = useTranslation();
  const { initializeCall } = useCall();

  const { inputVal, set, removeOne } = useContext<IDialInputCtx>(DialInputCtx);

  const handleCall = (number: string) => {
    initializeCall(number);
  };

  const handleNewContact = (number: string) => {
    history.push(`/contacts/-1/?addNumber=${number}&referal=/phone/contacts`);
  };

  return (
    <div
      className="fiveos-dialer-input"
      style={{
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      {/* Number display */}
      <div
        style={{
          width: '100%',
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <span
          style={{
            fontFamily: fiveosTheme.typography.fontFamily,
            fontSize: inputVal.length > 10 ? '28px' : '38px',
            fontWeight: fiveosTheme.typography.fontWeight.light,
            color: 'rgba(255, 255, 255, 0.95)',
            letterSpacing: '2px',
            textAlign: 'center',
            transition: 'font-size 150ms ease',
          }}
        >
          {inputVal || t('DIALER.INPUT_PLACEHOLDER')}
        </span>

        {/* Delete button */}
        {inputVal && (
          <button
            onClick={removeOne}
            style={{
              position: 'absolute',
              right: 0,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Delete size={24} color="rgba(255, 255, 255, 0.5)" />
          </button>
        )}
      </div>

      {/* Action buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
        }}
      >
        {/* Add contact */}
        <button
          onClick={() => inputVal && handleNewContact(inputVal)}
          disabled={!inputVal}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            cursor: inputVal ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: inputVal ? 1 : 0.4,
            transition: 'all 150ms ease',
          }}
        >
          <UserPlus size={22} color="rgba(255, 255, 255, 0.9)" />
        </button>

        {/* Call button - green, larger */}
        <button
          onClick={() => inputVal && handleCall(inputVal)}
          disabled={!inputVal}
          style={{
            width: '75px',
            height: '75px',
            borderRadius: '50%',
            background: inputVal
              ? fiveosTheme.colors.accent.green
              : 'rgba(52, 199, 89, 0.4)',
            border: 'none',
            cursor: inputVal ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: inputVal
              ? '0 6px 20px rgba(52, 199, 89, 0.4)'
              : 'none',
            transition: 'all 150ms ease',
          }}
          className={inputVal ? 'hover:scale-105 active:scale-95' : ''}
        >
          <Phone size={32} color="white" />
        </button>

        {/* Placeholder for symmetry */}
        <div style={{ width: '50px', height: '50px' }} />
      </div>
    </div>
  );
};
