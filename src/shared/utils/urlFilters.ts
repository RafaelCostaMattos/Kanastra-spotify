import { IArtistFilters } from '@interfaces/artist.interface';

export interface ParsedQuery {
  query?: string;
  filters: Partial<IArtistFilters>;
}

export const parseQueryParams = (search: string): ParsedQuery => {
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
  const query = params.get('artist') || undefined;
  const album = params.get('album') || undefined;
  const filters: Partial<IArtistFilters> = {};
  if (album) filters.album = album as any;
  return { query, filters };
};

export const buildQueryParams = (query?: string, filters?: Partial<IArtistFilters>): string => {
  const params = new URLSearchParams();
  if (query) params.set('artist', query);
  if (filters?.album) params.set('album', String(filters.album));
  const s = params.toString();
  return s ? `?${s}` : '';
};
