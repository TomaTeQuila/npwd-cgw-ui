import React, { useCallback, useEffect } from 'react';
import {
  MarketplaceResp,
  MarketplaceDatabaseLimits,
  MarketplaceEvents,
} from '@typings/marketplace';
import { useSnackbar } from '@os/snackbar/hooks/useSnackbar';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';
import { useQueryParams } from '@common/hooks/useQueryParams';
import { deleteQueryFromLocation } from '@common/utils/deleteQueryFromLocation';
import fetchNui from '@utils/fetchNui';
import { ServerPromiseResp } from '@typings/common';
import { useForm } from '../../hooks/state';
import { useWordFilter } from '@os/wordfilter/hooks/useWordFilter';
import { Camera, DollarSign, FileText, Type } from 'lucide-react';

export const ListingForm: React.FC = () => {
  const [t] = useTranslation();
  const { addAlert } = useSnackbar();
  const history = useHistory();
  const { pathname, search } = useLocation();
  const query = useQueryParams();
  const [formState, setFormState] = useForm();
  const { clean } = useWordFilter();

  const areFieldsFilled = formState.title.trim() !== '' && formState.description.trim() !== '';

  const addListing = () => {
    if (!areFieldsFilled) {
      return addAlert({
        message: t('MARKETPLACE.FEEDBACK.REQUIRED_FIELDS'),
        type: 'error',
      });
    }

    fetchNui<ServerPromiseResp<MarketplaceResp>>(MarketplaceEvents.ADD_LISTING, {
      ...formState,
      title: clean(formState.title),
      description: clean(formState.description),
    }).then((resp) => {
      if (resp.status !== 'ok') {
        return addAlert({
          message: t(resp.errorMsg),
          type: 'error',
        });
      }

      addAlert({
        message: t('MARKETPLACE.FEEDBACK.CREATE_LISTING_SUCCESS'),
        type: 'success',
      });
      history.push('/marketplace');
      setFormState({
        title: '',
        description: '',
        url: '',
        price: '',
      });
    });
  };

  const handlePriceChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputVal = e.currentTarget.value;
    if (inputVal.length > 20) return;
    setFormState({
      ...formState,
      price: e.currentTarget.value,
    });
  };

  const handleChooseImage = useCallback(() => {
    history.push(
      `/camera?${qs.stringify({
        referal: encodeURIComponent(pathname + search),
      })}`,
    );
  }, [history, pathname, search]);

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputVal = e.currentTarget.value;
    if (inputVal.length === MarketplaceDatabaseLimits.title) return;
    setFormState({
      ...formState,
      title: e.currentTarget.value,
    });
  };

  const handleUrlChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputVal = e.currentTarget.value;
    if (inputVal.length === MarketplaceDatabaseLimits.url) return;
    setFormState({
      ...formState,
      url: e.currentTarget.value,
    });
  };

  const handleDescriptionChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const inputVal = e.currentTarget.value;
    if (inputVal.length === MarketplaceDatabaseLimits.description) return;
    setFormState({
      ...formState,
      description: e.currentTarget.value,
    });
  };

  useEffect(() => {
    if (!query?.image) return;
    setFormState({
      ...formState,
      url: query.image,
    });
    history.replace(deleteQueryFromLocation({ pathname, search }, 'image'));
  }, [query?.image, history, pathname, search, setFormState, formState]);

  // Input styling
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    paddingLeft: '44px',
    fontSize: '15px',
    color: 'white',
    background: 'rgba(40, 30, 60, 0.8)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.2s ease',
  };

  return (
    <div
      className="flex flex-col h-full px-4 py-4"
      style={{
        background: 'linear-gradient(180deg, rgba(30, 30, 30, 1) 0%, rgba(20, 15, 30, 1) 100%)',
      }}
    >
      {/* Modern header */}
      <div className="mb-6">
        <h1
          className="text-xl font-bold"
          style={{
            background: 'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 50%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Crear Anuncio
        </h1>
        <p className="text-sm text-neutral-500 mt-1">Comparte tu producto o servicio</p>
      </div>

      {/* Form fields */}
      <div className="space-y-4 flex-1">
        {/* Title input */}
        <div className="relative">
          <Type size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400" />
          <input
            type="text"
            value={formState.title}
            onChange={handleTitleChange}
            placeholder="Título del anuncio *"
            maxLength={25}
            style={inputStyle}
          />
        </div>

        {/* Image section */}
        <div className="relative">
          <Camera size={18} className="absolute left-4 top-4 text-violet-400" />
          <div
            className="flex items-center gap-3"
            style={{ paddingLeft: '44px' }}
          >
            <button
              onClick={handleChooseImage}
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all"
              style={{
                background: 'rgba(139, 92, 246, 0.2)',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                color: '#a78bfa',
              }}
            >
              📷 Tomar foto
            </button>
          </div>
          <input
            type="text"
            value={formState.url}
            onChange={handleUrlChange}
            placeholder="O pega URL de imagen..."
            style={{ ...inputStyle, marginTop: '8px' }}
          />
        </div>

        {/* Description */}
        <div className="relative">
          <FileText size={18} className="absolute left-4 top-4 text-violet-400" />
          <textarea
            value={formState.description}
            onChange={handleDescriptionChange}
            placeholder="Descripción *"
            maxLength={130}
            rows={3}
            style={{
              ...inputStyle,
              resize: 'none',
              paddingTop: '14px',
            }}
          />
        </div>

        {/* Price */}
        <div className="relative">
          <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400" />
          <input
            type="text"
            value={formState.price || ''}
            onChange={handlePriceChange}
            placeholder="Precio (opcional)"
            maxLength={20}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Submit button */}
      <button
        onClick={addListing}
        disabled={!areFieldsFilled}
        className="w-full mt-4 py-4 text-base font-semibold text-white rounded-2xl transition-all duration-200"
        style={{
          background: areFieldsFilled
            ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
            : 'rgba(60, 50, 80, 0.5)',
          boxShadow: areFieldsFilled
            ? '0 4px 20px rgba(139, 92, 246, 0.4)'
            : 'none',
          cursor: areFieldsFilled ? 'pointer' : 'not-allowed',
        }}
      >
        {areFieldsFilled ? 'Publicar Anuncio' : 'Completa los campos'}
      </button>
    </div>
  );
};
