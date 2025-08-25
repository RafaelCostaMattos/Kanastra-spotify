import { IArtistFilters, IArtistSearchAction, IArtistSearchState } from '@interfaces/artist.interface';
// import { useArtistSearch } from '@hooks/useArtistSearch.hook';
import React, { createContext, useReducer, useContext, useMemo, ReactNode, Dispatch, useEffect } from 'react';
import { buildQueryParams, parseQueryParams } from '@utils/urlFilters';
import { artistReducer, initialArtistSearchState } from '@reducers/artist.reducer';
import { useInitialArtistsQuery, useArtistsQuery } from '@queries/artits.querie';
import type { IArtist } from '@interfaces/artist.interface';
import i18next from '@i18n/index';

type ArtistContextValue = IArtistSearchState & {
  results: IArtist[];
  loading: boolean;
  error: unknown;
  total: number;
  totalPages: number;
};

const ArtistStateCtx = createContext<ArtistContextValue | undefined>(undefined);
const ArtistDispatchCtx = createContext<Dispatch<IArtistSearchAction> | undefined>(undefined);

interface ProviderProps { children: ReactNode; }

export const ArtistProvider: React.FC<ProviderProps> = ({ children }) => {
  const getInitial = (): IArtistSearchState => {
    if (typeof window === 'undefined') return initialArtistSearchState;
    const parsed = parseQueryParams(window.location.search);
    return {
      ...initialArtistSearchState,
      query: parsed.query ?? initialArtistSearchState.query,
      filters: { ...initialArtistSearchState.filters, ...parsed.filters },
      searchType: 'artist',
      page: 0,
    };
  };

  const [state, dispatch] = useReducer(artistReducer, undefined, getInitial);

  const isSearching = !!state.query.trim();
  const page = state.page ?? 0;

  const initialQ = useInitialArtistsQuery(isSearching || state.searchType !== 'artist' ? 0 : page);

  const enableSearch = state.searchType === 'album' || isSearching;

  const searchQ = useArtistsQuery(state.query, page, state.searchType, enableSearch);

  const activeQuery = enableSearch
    ? searchQ
    : initialQ;

  const results = activeQuery?.data?.items ?? [];
  const loading = activeQuery?.isLoading ?? false;
  const error = activeQuery?.error;
  const total = activeQuery?.data?.total ?? 0;
  const pageSize = results.length > 0 ? results.length : 20;
  const totalPages = pageSize ? Math.ceil(total / pageSize) : 0;

  const value: ArtistContextValue = useMemo(
    () => ({ ...state, results, loading, error, total, totalPages }),
    [state, results, loading, error, total, totalPages]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const qs = buildQueryParams(state.query, state.filters, i18next.language); // adiciona lang
    const newUrl = `${window.location.pathname}${qs}`;
    if (newUrl !== window.location.pathname + window.location.search) {
      window.history.replaceState(null, '', newUrl);
    }
  }, [state.query, state.filters, i18next.language]);

  return (
    <ArtistStateCtx.Provider value={value}>
      <ArtistDispatchCtx.Provider value={dispatch}>{children}</ArtistDispatchCtx.Provider>
    </ArtistStateCtx.Provider>
  );
};

export const useArtistState = () => {
  const ctx = useContext(ArtistStateCtx);
  if (!ctx) throw new Error('useArtistState must be used within ArtistProvider');
  return ctx;
};

export const useArtistDispatch = () => {
  const ctx = useContext(ArtistDispatchCtx);
  if (!ctx) throw new Error('useArtistDispatch must be used within ArtistProvider');
  return ctx;
};

export const useArtistActions = () => {
  const dispatch = useArtistDispatch();
  return {
    setQuery: (data: string) => dispatch({ type: 'SET_QUERY', payload: data }),
    setFilters: (data: Partial<IArtistFilters>) => dispatch({ type: 'SET_FILTERS', payload: data }),
    resetFilters: () => dispatch({ type: 'RESET_FILTERS' }),
    selectArtist: (data?: string) => dispatch({ type: 'SELECT_ARTIST', payload: data }),
    setSearchType: (data: 'artist' | 'album') => dispatch({ type: 'SET_SEARCH_TYPE', payload: data }),
    setPage: (p: number) => dispatch({ type: 'SET_PAGE', payload: p }),
  };
};
