import React from 'react';
import AppRoutes from './shared/routes';
import Header from './shared/components/layout/Header';
import Footer from './shared/components/layout/Footer';

const App: React.FC = () => {
  return (
    <>
    <label className='text-lg'>Aqui merda</label>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
};

export default App;