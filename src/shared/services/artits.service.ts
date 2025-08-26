import { ITEMS_PER_PAGE_HOME } from '@constants/config.constant';
import apiClient from './config.service';

export const fetchArtists = async (page = 0, limit = ITEMS_PER_PAGE_HOME) => {
  const offset = page * limit;
  const { data } = await apiClient.get('/search', {
    params: { q: '*', type: 'artist', limit, offset },
  });
  return { items: data.artists.items, page, total: data.artists.total };
};

export const fetchSearchArtists = async (
  query: string,
  page: number,
  limit = ITEMS_PER_PAGE_HOME,
  type: 'artist' | 'album' = 'artist',
) => {
  const offset = page * limit;
  const q = query || '*';

  const { data } = await apiClient.get('/search', {
    params: { q, type, limit, offset },
  });

  const info = type === 'album' ? data.albums : data.artists;
  return { items: info.items, page, total: info.total };
};

export const fetchArtistDetails = async (artistId: string) => {
  const { data } = await apiClient.get(`/artists/${artistId}`);
  return data;
};

export const fetchArtistTopTracks = async (artistId: string, market = 'US') => {
  const { data } = await apiClient.get(`/artists/${artistId}/top-tracks`, {
    params: { market },
  });
  return data;
};
