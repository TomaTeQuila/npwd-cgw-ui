import { Avatar, Box, IconButton, Paper, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { Message } from '@typings/messages';
import StyledMessage from '../ui/StyledMessage';
import { PictureResponsive } from '@ui/components/PictureResponsive';
import { PictureReveal } from '@ui/components/PictureReveal';
import { useMyPhoneNumber } from '@os/simcard/hooks/useMyPhoneNumber';
import MessageBubbleMenu from './MessageBubbleMenu';
import { useSetSelectedMessage } from '../../hooks/state';
import MessageEmbed from '../ui/MessageEmbed';
import { useContactActions } from '../../../contacts/hooks/useContactActions';
import dayjs from 'dayjs';
import { MoreHorizontal, MoreVertical } from 'lucide-react';
import { cn } from '@utils/css';
import { calendarPickerSkeletonClasses } from '@mui/lab';

const isImage = (url) => {
  return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|jpeg|gif|webp)/g.test(url);
};

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getContactByNumber } = useContactActions();

  const setSelectedMessage = useSetSelectedMessage();
  const openMenu = () => {
    setMenuOpen(true);
    setSelectedMessage(message);
  };
  const myNumber = useMyPhoneNumber();
  const isMine = message.author === myNumber;

  let parsedEmbed;
  if (message?.embed) {
    parsedEmbed = JSON.parse(message?.embed);
  }

  const getContact = () => {
    return getContactByNumber(message.author);
  };

  const isMessageImage = isImage(message.message);

  // Audio message handling
  if (message.is_embed && parsedEmbed.type === 'audio') {
    return (
      <div className={cn('flex mb-2 px-3', isMine ? 'justify-end' : 'justify-start')}>
        <div
          className={cn(
            'max-w-[75%] rounded-2xl px-3 py-2',
            isMine
              ? 'bg-green-600 rounded-br-sm'
              : 'bg-neutral-800 rounded-bl-sm'
          )}
          style={{
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.15)',
          }}
        >
          <MessageEmbed
            type={parsedEmbed.type}
            embed={parsedEmbed}
            isMine={isMine}
            message={message.message}
            openMenu={openMenu}
          />
          {!isMine && (
            <p className="text-xs font-semibold text-green-400 mb-1">
              {getContact()?.display ?? message.author}
            </p>
          )}
          <p className="text-xs text-neutral-300 mt-1">
            {dayjs.unix(message.createdAt).fromNow()}
          </p>
        </div>
        <MessageBubbleMenu open={menuOpen} handleClose={() => setMenuOpen(false)} />
      </div>
    );
  }

  const showVertIcon = isMine || isMessageImage;

  return (
    <>
      {/* WhatsApp-style message bubble */}
      <div className={cn('flex mb-2 px-3', isMine ? 'justify-end' : 'justify-start')}>
        <div className={cn('flex items-end gap-1 max-w-[80%]', isMine ? 'flex-row-reverse' : 'flex-row')}>
          {/* Message bubble */}
          <div
            className={cn(
              'relative px-3 py-2 rounded-2xl',
              isMine
                ? 'bg-green-600 rounded-br-sm'
                : 'bg-neutral-700 rounded-bl-sm'
            )}
            style={{
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
              minWidth: '60px',
            }}
          >
            {/* Sender name (only for others in groups) */}
            {!isMine && (
              <p className="text-xs font-semibold text-green-400 mb-1">
                {getContact()?.display ?? message.author}
              </p>
            )}

            {/* Message content */}
            {message.is_embed ? (
              <MessageEmbed
                type={parsedEmbed.type}
                embed={parsedEmbed}
                isMine={isMine}
                message={message.message}
                openMenu={openMenu}
              />
            ) : isMessageImage ? (
              <div className="rounded-lg overflow-hidden">
                <PictureReveal>
                  <PictureResponsive src={message.message} alt="message multimedia" />
                </PictureReveal>
              </div>
            ) : (
              <p className="text-sm text-white break-words">
                {message.message}
              </p>
            )}

            {/* Timestamp */}
            <p className={cn(
              'text-xs mt-1',
              isMine ? 'text-green-200' : 'text-neutral-400'
            )}>
              {dayjs.unix(message.createdAt).fromNow()}
            </p>
          </div>

          {/* Menu button */}
          {showVertIcon && (
            <button
              onClick={openMenu}
              className="text-neutral-500 hover:text-neutral-300 transition-colors p-1"
            >
              <MoreVertical size={16} />
            </button>
          )}
        </div>
      </div>

      <MessageBubbleMenu
        message={message}
        isImage={isMessageImage}
        open={menuOpen}
        handleClose={() => setMenuOpen(false)}
      />
    </>
  );
};

