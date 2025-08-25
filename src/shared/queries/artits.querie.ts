import { useQuery, useQueryClient } from 'react-query';
import {
  fetchSearchArtists,
  fetchArtistDetails,
  fetchArtistTopTracks,
  fetchRelatedArtists,
  fetchArtists
} from '@services/artits.service';

const qk = {
  initial: (page: number) => ['artists', 'initial', page] as const,
  list: (term: string, page: number) => ['artists', 'search', term || '_', page] as const,
  detail: (id: string) => ['artist', id] as const,
  top: (id: string) => ['artist', id, 'top'] as const,
  related: (id: string) => ['artist', id, 'related'] as const,
};

// Novo hook: lista inicial (sem termo)
export function useInitialArtistsQuery(page = 0) {
  return useQuery(
    qk.initial(page),
    () => fetchArtists(page),
    { staleTime: 60_000, keepPreviousData: true }
  );
}

export function useArtistsQuery(term: string, page: number, enabled = true) {
  return useQuery(
    qk.list(term, page),
    () => fetchSearchArtists(term, page),
    { keepPreviousData: true, staleTime: 60_000, enabled: enabled && !!term }
  );
}

export function useArtistDetailQuery(id?: string) {
  return useQuery(
    id ? qk.detail(id) : ['artist', 'empty'],
    () => fetchArtistDetails(id!),
    { enabled: !!id, staleTime: 120_000 }
  );
}

export function useArtistTopTracksQuery(id?: string, market = 'US') {
  return useQuery(
    id ? qk.top(id) : ['artist', 'top', 'empty'],
    () => fetchArtistTopTracks(id!, market),
    { enabled: !!id, staleTime: 120_000 }
  );
}

export function useRelatedArtistsQuery(id?: string) {
  return useQuery(
    id ? qk.related(id) : ['artist', 'related', 'empty'],
    () => fetchRelatedArtists(id!),
    { enabled: !!id, staleTime: 300_000 }
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