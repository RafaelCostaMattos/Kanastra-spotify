import { IArtist, IArtistFilters } from '@interfaces/artist.interface';
import { useEffect, useState } from 'react';

interface Params {
  query: string;
  filters: IArtistFilters;
}

interface UseArtistSearchResult {
  results: IArtist[];
  loading: boolean;
  error?: string;
}

export const useArtistSearch = ({ query, filters }: Params): UseArtistSearchResult => {
  const [results, setResults] = useState<IArtist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    let active = true;
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(undefined);
    const timer = setTimeout(() => {
      if (!active) return;
      const mock: IArtist[] = [
        {
            id: '1', name: 'Luan Santana', genre: 'Pop', imageUrl: '', topTracks: [], albums: ['2024', '2025'],
            bio: ''
        },
        {
            id: '2', name: 'Anitta', genre: 'Pop', imageUrl: '', topTracks: [], albums: ['2023'],
            bio: ''
        }
      ];
      let filtered = mock.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));
      if (filters.album) {
        filtered = filtered.filter(a => a.albums.includes(String(filters.album)));
      }
      setResults(filtered);
      setLoading(false);
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query, filters.album]);

  return { results, loading, error };
};
