import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './theme/tailwind.css';
import { getSpotifyToken } from '@services/token.service';
import { ArtistProvider } from '@contexts/artist.context';
import { QueryClient, QueryClientProvider } from 'react-query';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);

  getSpotifyToken().catch(e => console.error('Error', e));
  const qc = new QueryClient();

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={qc}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
}