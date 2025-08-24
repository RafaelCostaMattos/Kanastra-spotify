import { Track } from '@interfaces/album.interface';
import { getSpotifyToken } from '@services/token.service';
import { useEffect, useState } from 'react';

export function useTopTracks(artistId?: string) {
  const [data, setData] = useState<Track | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!artistId) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await getSpotifyToken();
        const res = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [artistId]);

  return { data, isLoading, error };
}