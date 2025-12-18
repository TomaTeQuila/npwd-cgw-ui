import React, { HTMLAttributes, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useContactActions } from '../../hooks/useContactActions';
import { useCall } from '@os/call/hooks/useCall';
import { useMyPhoneNumber } from '@os/simcard/hooks/useMyPhoneNumber';
import useMessages from '../../../messages/hooks/useMessages';
import { useQueryParams } from '@common/hooks/useQueryParams';
import { NPWDInput } from '@ui/components';
import { NPWDButton } from '@npwd/keyos';
import { ContactsDatabaseLimits } from '@typings/contact';
import { useContactsAPI } from '../../hooks/useContactsAPI';
import { SendMoneyModal } from '../../components/modals/SendMoney';
import { ChevronLeft, Phone, MessageCircle, Video, Mail, MoreHorizontal, Trash2 } from 'lucide-react';
import LogDebugEvent from '@os/debug/LogDebugEvents';
import { useModal } from '@apps/contacts/hooks/useModal';
import { usePhone } from '@os/phone/hooks/usePhone';
import { initials } from '@utils/misc';
import { fiveosTheme } from '../../../../styles/fiveos.theme';

interface ContactInfoRouteParams {
  mode: string;
  id: string;
}

interface ContactInfoRouteQuery {
  addNumber?: string;
  referal?: string;
  name?: string;
  avatar?: string;
}

// Avatar gradient based on name
const getAvatarGradient = (name: string): string => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  ];
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return gradients[hash % gradients.length];
};

/**
 * FiveOS Contact Info Page
 * 
 * iOS-style contact detail view with:
 * - Large avatar at top
 * - Name centered below
 * - Action buttons (call, message, video, mail)
 * - Edit button in top right
 */
const ContactsInfoPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<ContactInfoRouteParams>();
  const {
    addNumber,
    referal: referral,
    avatar: avatarParam,
    name: nameParam,
  } = useQueryParams<ContactInfoRouteQuery>({
    referal: '/contacts',
  });

  const { contactPayModal, setContactPayModal } = useModal();
  const { getContact, findExistingConversation } = useContactActions();
  const { updateContact, addNewContact, deleteContact } = useContactsAPI();
  const { initializeCall } = useCall();
  const myPhoneNumber = useMyPhoneNumber();
  const { goToConversation } = useMessages();

  const contact = getContact(parseInt(id));
  const isNewContact = id === '-1';

  const [name, setName] = useState(contact?.display ?? '');
  const [number, setNumber] = useState(contact?.number ?? '');
  const [avatar, setAvatar] = useState(
    contact?.avatar ?? 'https://i.fivemanage.com/images/3ClWwmpwkFhL.png',
  );
  const [isEditing, setIsEditing] = useState(isNewContact);
  const [showOptions, setShowOptions] = useState(false);

  const [t] = useTranslation();
  const { ResourceConfig } = usePhone();

  const handleNumberChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputVal = e.currentTarget.value;
    if (inputVal.length === ContactsDatabaseLimits.number) return;
    setNumber(e.target.value);
  };

  const handleDisplayChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputVal = e.currentTarget.value;
    if (inputVal.length === ContactsDatabaseLimits.display) return;
    setName(e.target.value);
  };

  const handleAvatarChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputVal = e.currentTarget.value;
    if (inputVal.length === ContactsDatabaseLimits.avatar) return;
    setAvatar(e.target.value);
  };

  const handleContactAdd = () => {
    addNewContact({ display: name, number, avatar }, referral);
  };

  const startCall = () => {
    LogDebugEvent({
      action: 'Emitting `Start Call` to Scripts',
      level: 2,
      data: true,
    });
    initializeCall(number.toString());
  };

  const handleMessage = () => {
    const phoneNumber = number.toString();
    const conversation = findExistingConversation(myPhoneNumber, phoneNumber);
    if (conversation) {
      return goToConversation(conversation);
    }
    history.push(`/messages/new?phoneNumber=${phoneNumber}`);
  };

  const handleContactDelete = () => {
    deleteContact({ id: contact.id });
    history.goBack();
  };

  const handleContactUpdate = () => {
    updateContact({ id: contact.id, number, avatar, display: name });
    setIsEditing(false);
  };

  useEffect(() => {
    if (addNumber) setNumber(addNumber);
    if (avatarParam) setAvatar(avatarParam);
    if (nameParam) setName(nameParam);
  }, [addNumber, avatarParam, nameParam]);

  if (!ResourceConfig) return null;

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '54px',
      }}
    >
      <SendMoneyModal
        open={contactPayModal}
        closeModal={() => setContactPayModal(false)}
        openContact={number}
      />

      {/* Header with back and edit/more buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
        }}
      >
        {/* Back button */}
        <button
          onClick={() => history.goBack()}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px',
          }}
        >
          <ChevronLeft size={28} color={fiveosTheme.colors.accent.blue} />
          <span
            style={{
              fontFamily: fiveosTheme.typography.fontFamily,
              fontSize: '17px',
              color: fiveosTheme.colors.accent.blue,
            }}
          >
            {String(t('APPS_CONTACTS'))}
          </span>
        </button>

        {/* Right buttons */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {contact && !isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: fiveosTheme.typography.fontFamily,
                  fontSize: '17px',
                  color: fiveosTheme.colors.accent.blue,
                }}
              >
                {String(t('GENERIC.EDIT'))}
              </button>
            </>
          )}
          {isEditing && contact && (
            <button
              onClick={handleContactUpdate}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: fiveosTheme.typography.fontFamily,
                fontSize: '17px',
                fontWeight: 600,
                color: fiveosTheme.colors.accent.blue,
              }}
            >
              {String(t('GENERIC.DONE'))}
            </button>
          )}
        </div>
      </div>

      {/* Avatar and Name */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          gap: '12px',
        }}
      >
        {/* Avatar */}
        {avatar && avatar.length > 0 ? (
          <img
            src={avatar}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
            alt="avatar"
          />
        ) : (
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: getAvatarGradient(name || 'New'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: fiveosTheme.typography.fontFamily,
                fontSize: '36px',
                fontWeight: 500,
                color: 'white',
              }}
            >
              {initials(name || 'N')}
            </span>
          </div>
        )}

        {/* Name */}
        {isEditing ? (
          <NPWDInput
            value={name}
            onChange={handleDisplayChange}
            placeholder={String(t('CONTACTS.FORM_NAME'))}
            style={{
              textAlign: 'center',
              fontSize: '24px',
              fontWeight: 600,
            }}
          />
        ) : (
          <h1
            style={{
              fontFamily: fiveosTheme.typography.fontFamily,
              fontSize: '24px',
              fontWeight: 600,
              color: 'white',
              margin: 0,
            }}
          >
            {name || String(t('CONTACTS.FORM_NAME'))}
          </h1>
        )}
      </div>

      {/* Action buttons - iOS style */}
      {contact && !isEditing && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            padding: '16px',
          }}
        >
          <ActionButton
            icon={<Phone size={22} />}
            label={String(t('DIALER.ACTIONS.CALL'))}
            onClick={startCall}
          />
          <ActionButton
            icon={<MessageCircle size={22} />}
            label={String(t('GENERIC.MESSAGE'))}
            onClick={handleMessage}
          />
          <ActionButton
            icon={<Trash2 size={22} />}
            label={String(t('GENERIC.DELETE'))}
            onClick={handleContactDelete}
            color="#FF3B30"
          />
        </div>
      )}

      {/* Form fields */}
      <div
        style={{
          flex: 1,
          padding: '16px 20px',
          overflowY: 'auto',
        }}
      >
        {/* Phone number section */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '16px',
          }}
        >
          <label
            style={{
              fontFamily: fiveosTheme.typography.fontFamily,
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.5)',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            {String(t('CONTACTS.FORM_NUMBER'))}
          </label>
          {isEditing ? (
            <NPWDInput
              value={number}
              onChange={handleNumberChange}
              style={{ fontSize: '17px' }}
            />
          ) : (
            <span
              style={{
                fontFamily: fiveosTheme.typography.fontFamily,
                fontSize: '17px',
                color: fiveosTheme.colors.accent.blue,
              }}
            >
              {number}
            </span>
          )}
        </div>

        {/* Avatar URL - only in edit mode */}
        {isEditing && (
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '12px 16px',
              marginBottom: '16px',
            }}
          >
            <label
              style={{
                fontFamily: fiveosTheme.typography.fontFamily,
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.5)',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              {String(t('CONTACTS.FORM_AVATAR'))}
            </label>
            <NPWDInput
              value={avatar}
              onChange={handleAvatarChange}
              style={{ fontSize: '15px' }}
            />
          </div>
        )}

        {/* Add button for new contacts */}
        {isNewContact && (
          <NPWDButton
            onClick={handleContactAdd}
            style={{
              width: '100%',
              marginTop: '20px',
            }}
          >
            {String(t('GENERIC.ADD'))}
          </NPWDButton>
        )}
      </div>
    </div>
  );
};

// iOS-style action button
const ActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: string;
}> = ({ icon, label, onClick, color }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '6px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      minWidth: '60px',
    }}
  >
    <div
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color || fiveosTheme.colors.accent.blue,
      }}
    >
      {icon}
    </div>
    <span
      style={{
        fontFamily: fiveosTheme.typography.fontFamily,
        fontSize: '11px',
        color: color || fiveosTheme.colors.accent.blue,
      }}
    >
      {label}
    </span>
  </button>
);

export default ContactsInfoPage;
