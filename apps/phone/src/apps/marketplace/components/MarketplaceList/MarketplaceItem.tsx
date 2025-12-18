import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { ListItem } from '@ui/components/ListItem';
import { PictureResponsive } from '@ui/components/PictureResponsive';
import { MarketplaceListing } from '@typings/marketplace';
import { ListingActions } from './ListingActions';
import { PictureReveal } from '@ui/components/PictureReveal';
import { useTranslation } from 'react-i18next';
import { ImageOff } from 'lucide-react';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'hidden',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: '3px',
  },
  content: {
    display: 'flex',
    flexFlow: 'column nowrap',
    width: '100%',
  },
  paper: {
    overflow: 'auto',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'flex',
    borderWidth: 2,
    height: 'auto',
    background: theme.palette.background.paper,
    marginBottom: 20,
  },
  listingContent: {
    padding: 10,
    minWidth: 100,
    maxWidth: '100%',
    width: '100%',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
  },
}));

export const MarketplaceItem: React.FC<MarketplaceListing> = (listing) => {
  const classes = useStyles();
  const [t] = useTranslation();

  return (
    <ListItem className={classes.root}>
      <div className="flex w-full flex-col">
        {/* Modern card with dark purple theme and glow */}
        <div
          className="mb-4 flex h-auto flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.01]"
          style={{
            background: 'linear-gradient(135deg, rgba(40, 30, 60, 0.9) 0%, rgba(25, 20, 35, 0.95) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            boxShadow: '0 4px 20px rgba(139, 92, 246, 0.1)',
          }}
        >
          {/* Header with name and price */}
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-sm font-medium text-violet-300">
                {listing.name}
              </h2>
              <p className="text-base font-semibold text-white">
                {listing.title}
              </p>
            </div>
            {/* Price badge */}
            {listing.price && (
              <div
                className="rounded-full px-3 py-1"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  boxShadow: '0 2px 12px rgba(139, 92, 246, 0.5)',
                }}
              >
                <span className="text-sm font-semibold text-white">
                  $ {listing.price}
                </span>
              </div>
            )}
          </div>

          {/* Image or placeholder */}
          {listing.url ? (
            <PictureReveal>
              <PictureResponsive src={listing.url} alt={`${listing.name}`} />
            </PictureReveal>
          ) : (
            <div
              className="flex items-center justify-center py-8"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
              }}
            >
              <div className="flex flex-col items-center gap-2 text-neutral-500">
                <ImageOff size={32} strokeWidth={1.5} />
                <span className="text-xs">{String(t('MARKETPLACE.NO_IMAGE'))}</span>
              </div>
            </div>
          )}

          {/* Description */}
          <p className="max-w-full break-words px-4 py-3 text-sm text-neutral-300">
            {listing.description}
          </p>

          <ListingActions {...listing} />
        </div>
      </div>
    </ListItem>
  );
};

