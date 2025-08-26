import { getSpotifyToken } from '@services/token.service';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './theme/tailwind.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);

  getSpotifyToken().catch((e) => console.error('Error', e));
  const qc = new QueryClient();

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={qc}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
