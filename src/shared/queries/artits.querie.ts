import { IArtist } from '@interfaces/artist.interface';
import {
  fetchArtistDetails,
  fetchArtistTopTracks,
  fetchArtists,
  fetchSearchArtists,
} from '@services/artits.service';
import { useQuery, useQueryClient } from 'react-query';

const qk = {
  initial: (page: number) => ['artists', 'initial', page],
  list: (query: string, page: number, type: string) => [
    'artists',
    'search',
    type,
    query ?? '_',
    page,
  ],
  detail: (id: string) => ['artist', id],
  top: (id: string) => ['artist', id, 'top'],
  related: (id: string) => ['artist', id, 'related'],
};

export function useInitialArtistsQuery(page = 0) {
  return useQuery(qk.initial(page), () => fetchArtists(page), {
    staleTime: 60_000,
    keepPreviousData: true,
  });
}

export function useArtistsQuery(
  query: string,
  page: number,
  type: 'artist' | 'album',
  enabled = true,
) {
  return useQuery(
    qk.list(query, page, type),
    () => fetchSearchArtists(query, page, 20, type),
    { keepPreviousData: true, staleTime: 60_000, enabled },
  );
}

export function useArtistDetailQuery(id?: string) {
  return useQuery<IArtist>(
    id ? qk.detail(id) : ['artist', 'empty'],
    () => fetchArtistDetails(id!),
    { enabled: !!id, staleTime: 60_000 },
  );
}

export function useArtistTopTracksQuery(id?: string, market = 'US') {
  return useQuery(
    id ? qk.top(id) : ['artist', 'top', 'empty'],
    () => fetchArtistTopTracks(id!, market),
    { enabled: !!id, staleTime: 60_000 },
  );
}

export function usePrefetchArtist() {
  const qc = useQueryClient();
  return async (id: string) => {
    await Promise.all([
      qc.prefetchQuery(qk.detail(id), () => fetchArtistDetails(id)),
      qc.prefetchQuery(qk.top(id), () => fetchArtistTopTracks(id)),
    ]);
  };
}
