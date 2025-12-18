import React, { useState } from 'react';
import DialGrid from '../DialPadGrid';
import { DialInputCtx } from '../../context/InputContext';
import { useQueryParams } from '@common/hooks/useQueryParams';
import { useHistory } from 'react-router-dom';
import { Phone, UserPlus, Delete } from 'lucide-react';
import { useCall } from '@os/call/hooks/useCall';
import { useTranslation } from 'react-i18next';
import { fiveosTheme } from '../../../../styles/fiveos.theme';

/**
 * FiveOS Dial Page
 * 
 * iOS-style layout: Number display at top, keypad in middle, call button at bottom.
 */
const DialPage: React.FC = () => {
  const query = useQueryParams();
  const queryNumber = query.number;
  const [inputVal, setInputVal] = useState(queryNumber || '');
  const history = useHistory();
  const { initializeCall } = useCall();
  const [t] = useTranslation();

  const handleCall = () => {
    if (inputVal) {
      initializeCall(inputVal);
    }
  };

  const handleNewContact = () => {
    if (inputVal) {
      history.push(`/contacts/-1/?addNumber=${inputVal}&referal=/phone/contacts`);
    }
  };

  const removeOne = () => setInputVal(inputVal.slice(0, -1));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        paddingTop: '60px', // Space for status bar
      }}
    >
      <DialInputCtx.Provider
        value={{
          inputVal,
          add: (val: string) => setInputVal(inputVal + val),
          removeOne,
          clear: () => setInputVal(''),
          set: (val: string) => setInputVal(val),
        }}
      >
        {/* Number Display */}
        <div
          style={{
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '80px',
          }}
        >
          <div
            style={{
              width: '100%',
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
              {inputVal || String(t('DIALER.INPUT_PLACEHOLDER'))}
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
        </div>

        {/* Keypad Grid */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <DialGrid />
        </div>

        {/* Bottom Action Bar - Call button centered */}
        <div
          style={{
            padding: '16px 24px 40px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '50px',
          }}
        >
          {/* Add contact */}
          <button
            onClick={handleNewContact}
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
              opacity: inputVal ? 1 : 0.3,
              transition: 'all 150ms ease',
            }}
          >
            <UserPlus size={22} color="rgba(255, 255, 255, 0.9)" />
          </button>

          {/* Call button - green, large */}
          <button
            onClick={handleCall}
            disabled={!inputVal}
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: inputVal
                ? fiveosTheme.colors.accent.green
                : 'rgba(52, 199, 89, 0.3)',
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
          >
            <Phone size={30} color="white" />
          </button>

          {/* Placeholder for symmetry */}
          <div style={{ width: '50px', height: '50px' }} />
        </div>
      </DialInputCtx.Provider>
    </div>
  );
};

export default DialPage;
