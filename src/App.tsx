import React from 'react';
import AppRoutes from '@routes';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import { ThemeProvider, CssBaseline } from '@mui/material';
import muiTheme from '@theme/muiTheme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Header />
      <AppRoutes />
      <Footer />
    </ThemeProvider>
  );
};

export default App;