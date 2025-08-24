import { useArtistActions, useArtistState } from '@contexts/artist.context';
import React from 'react';

const ArtistsPage: React.FC = () => {
  const { results, loading, query, filters } = useArtistState();
  const { setQuery, setFilters } = useArtistActions();

  return (
    <div style={{ padding: 16 }}>
      <h2>Artists</h2>
      <div style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
        <input
          placeholder="Search artist"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <input
          placeholder="Album"
          value={filters.album || ''}
          onChange={e => setFilters({ album: e.target.value })}
        />
      </div>
      {loading && <p>Loading...</p>}
      {!loading && results.length === 0 && query && <p>No results.</p>}
      <ul>
        {results.map((a: any) => (
          <li key={a.id}>{a.name} {filters.album && `(${filters.album})`}</li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistsPage;