import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#1DB954' },
    background: {
      default: '#121212',
      paper: '#1e1e1e'
    }
  },
  typography: {
    fontFamily: ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(',')
  }
});

export default muiTheme;
