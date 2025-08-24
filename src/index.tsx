import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './theme/tailwind.css';
import { getSpotifyToken } from '@services/token.service';
import { ArtistProvider } from '@contexts/artist.context';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);

  getSpotifyToken().catch(e => console.error('Error', e));

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <ArtistProvider>
          <App />
        </ArtistProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}