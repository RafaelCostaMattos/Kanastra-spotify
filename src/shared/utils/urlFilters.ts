import { IArtistFilters } from '@interfaces/artist.interface';

export const parseQueryParams = (search: string): any => {
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
  const query = params.get('artist') || undefined;
  const album = params.get('album') || undefined;
  const lang = params.get('lang') || undefined; // novo
  const filters: Partial<IArtistFilters> = {};
  if (album) filters.album = album as any;
  return { query, filters, lang };
};

export const buildQueryParams = (
  query?: string,
  filters?: Partial<IArtistFilters>,
  lang?: string
): string => {
  const params = new URLSearchParams();
  if (query) params.set('artist', query);
  if (filters?.album) params.set('album', String(filters.album));
  if (lang) params.set('lang', lang); // novo
  const data = params.toString();
  return data ? `?${data}` : '';
};
