import { common, purple } from '@mui/material/colors';
import { ThemeOptions } from '@mui/material';

// Purple theme for Marketplace
export const MARKETPLACE_APP_PRIMARY_COLOR = '#8b5cf6'; // Violet-500
export const MARKETPLACE_APP_ICON_COLOR = common.white;
export const MARKETPLACE_APP_TEXT_COLOR = common.white;

const theme: ThemeOptions = {
  palette: {
    primary: {
      main: MARKETPLACE_APP_PRIMARY_COLOR,
      dark: '#7c3aed', // Violet-600
      light: '#a78bfa', // Violet-400
      contrastText: MARKETPLACE_APP_TEXT_COLOR,
    },
    background: {
      default: 'rgba(20, 15, 30, 0.95)',
      paper: 'rgba(40, 30, 60, 0.9)',
    },
  },
};

export default theme;
