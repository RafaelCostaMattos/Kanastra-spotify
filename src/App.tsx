import React from 'react';
import AppRoutes from '@routes';
import Header from '@components/layout/Header';
import { ThemeProvider, CssBaseline } from '@mui/material';
import muiTheme from '@theme/muiTheme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Header />
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;