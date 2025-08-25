import apiClient from './config.service';
import { IArtist } from '../interfaces/artist.interface';

const DEFAULT_LIMIT = 20;

export const fetchArtists = async (page = 0, limit = DEFAULT_LIMIT): Promise<{ items: IArtist[]; page: number; total: number; }> => {
  const offset = page * limit;
  const { data } = await apiClient.get('/search', {
    params: { q: '*', type: 'artist', limit, offset }
  });
  return { items: data.artists.items, page, total: data.artists.total };
};

export const fetchSearchArtists = async (
  query: string,
  page: number,
  limit = DEFAULT_LIMIT,
  type: 'artist' | 'album' = 'artist'
): Promise<{ items: any[]; page: number; total: number; }> => {
  const offset = page * limit;
  const q = query || '*';
  console.log({ q, type, limit, offset });
  const { data } = await apiClient.get('/search', {
    params: { q, type, limit, offset }
  });
  const bucket = type === 'album' ? data.albums : data.artists;
  return { items: bucket.items, page, total: bucket.total };
};

export const fetchArtistDetails = async (artistId: string): Promise<IArtist> => {
  const { data } = await apiClient.get(`/artists/${artistId}`);
  return data;
};

export const fetchArtistTopTracks = async (artistId: string, market = 'US') => {
  const { data } = await apiClient.get(`/artists/${artistId}/top-tracks`, {
    params: { market }
  });
  return data; // { tracks: [...] }
};

export const fetchRelatedArtists = async (artistId: string) => {
  const { data } = await apiClient.get(`/artists/${artistId}/related-artists`);
  return data; // { artists: [...] }
};