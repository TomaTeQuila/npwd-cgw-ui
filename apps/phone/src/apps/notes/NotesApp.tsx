import React, { useEffect } from 'react';
import { AppWrapper } from '@ui/components';
import { AppContent } from '@ui/components/AppContent';
import { useApp } from '@os/apps/hooks/useApps';
import NoteList from './list/NoteList';
import { NoteModal } from './modal/NoteModal';
import { NotesThemeProvider } from './providers/NotesThemeProvider';
import { Route } from 'react-router-dom';
import { useSetModalVisible, useSetSelectedNote } from './hooks/state';
import { LoadingSpinner } from '@ui/components/LoadingSpinner';
import { useQueryParams } from '@common/hooks/useQueryParams';
import { AddNoteExportData } from '@typings/notes';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { fiveosTheme } from '../../styles/fiveos.theme';

/**
 * FiveOS Notes App
 * 
 * Clean, minimal design with iOS-style large header
 * and floating action button.
 */
export const NotesApp: React.FC = () => {
  const notesApp = useApp('NOTES');
  const setSelectedNote = useSetSelectedNote();
  const setModalVisible = useSetModalVisible();
  const [t] = useTranslation();

  const onClickCreate = () => {
    setSelectedNote({ title: '', content: '' });
    setModalVisible(true);
  };

  const { title, content } = useQueryParams<AddNoteExportData>({ title: '', content: '' });

  useEffect(() => {
    if (title || content) {
      setModalVisible(true);
      setSelectedNote({ title, content });
    } else {
      setModalVisible(false);
      setSelectedNote(null);
    }
  }, [setModalVisible, title, content, setSelectedNote]);

  return (
    <NotesThemeProvider>
      <AppWrapper id="notes-app">
        <NoteModal />

        {/* FiveOS Header */}
        <div
          style={{
            padding: '16px 20px 12px 20px',
            paddingTop: '54px', // Space for status bar
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <h1
            style={{
              fontFamily: fiveosTheme.typography.fontFamily,
              fontSize: '34px',
              fontWeight: fiveosTheme.typography.fontWeight.semibold,
              color: fiveosTheme.colors.text.primary,
              margin: 0,
              letterSpacing: '-0.5px',
            }}
          >
            {String(t('APPS_NOTES'))}
          </h1>

          {/* Create button */}
          <button
            onClick={onClickCreate}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: fiveosTheme.colors.accent.orange,
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(255, 149, 0, 0.35)',
              transition: 'all 150ms ease',
            }}
            className="hover:scale-105 active:scale-95"
          >
            <Plus size={22} color="white" strokeWidth={2.5} />
          </button>
        </div>

        <AppContent
          style={{
            background: 'transparent',
          }}
        >
          <React.Suspense fallback={<LoadingSpinner />}>
            <Route path="/notes" component={NoteList} />
          </React.Suspense>
        </AppContent>
      </AppWrapper>
    </NotesThemeProvider>
  );
};
