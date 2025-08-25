export function parseQueryParams(search: string) {
  const params = new URLSearchParams(search);
  let mode: 'artist' | 'album' = 'artist';
  let query = '';

  // Agora: query= para artistas, album= para álbuns
  if (params.get('album')) {
    mode = 'album';
    query = params.get('album') || '';
  } else if (params.get('query')) {
    mode = 'artist';
    query = params.get('query') || '';
  }

  const filters: Record<string, any> = {};
  return { query, filters, mode };
}

export function buildQueryParams(
  query: string,
  filters: Record<string, any>,
  mode: 'artist' | 'album'
) {
  const params = new URLSearchParams();

  if (query) {
    if (mode === 'artist') {
      params.set('query', query); // alterado de artist= para query=
    } else {
      params.set('album', query);
    }
  }

  Object.entries(filters || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') params.set(k, String(v));
  });

  const qs = params.toString();
  return qs ? `?${qs}` : '';
}
