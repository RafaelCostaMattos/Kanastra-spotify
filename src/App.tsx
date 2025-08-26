import Header from '@components/layout/Header';
import { CssBaseline, ThemeProvider } from '@mui/material';
import AppRoutes from '@routes/index';
import muiTheme from '@theme/muiTheme';
import React from 'react';

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
