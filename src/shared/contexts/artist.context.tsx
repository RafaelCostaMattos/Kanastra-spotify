import {
  IArtistFilters,
  IArtistSearchAction,
  IArtistSearchState,
} from '@interfaces/artist.interface';
// import { useArtistSearch } from '@hooks/useArtistSearch.hook';
import { EArtistAction } from '@enums/artist.enum';
import i18next from '@i18n/index';
import type { IArtist } from '@interfaces/artist.interface';
import {
  useArtistsQuery,
  useInitialArtistsQuery,
} from '@queries/artits.querie';
import {
  artistReducer,
  initialArtistSearchState,
} from '@reducers/artist.reducer';
import { buildQueryParams, parseQueryParams } from '@utils/urlFilters';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

type ArtistContextValue = IArtistSearchState & {
  results: IArtist[];
  loading: boolean;
  error: unknown;
  total: number;
  totalPages: number;
};

const ArtistStateCtx = createContext<ArtistContextValue | undefined>(undefined);
const ArtistDispatchCtx = createContext<
  Dispatch<IArtistSearchAction> | undefined
>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const ArtistProvider: React.FC<ProviderProps> = ({ children }) => {
  const getInitial = (): IArtistSearchState => {
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

  const initialQuery = useInitialArtistsQuery(
    isSearching || state.searchType !== 'artist' ? 0 : page,
  );

  const enableSearch = state.searchType === 'album' || isSearching;

  const searchQuery = useArtistsQuery(
    state.query,
    page,
    state.searchType,
    enableSearch,
  );

  const activeQuery = enableSearch ? searchQuery : initialQuery;

  const results = activeQuery?.data?.items ?? [];
  const loading = activeQuery?.isLoading ?? false;
  const error = activeQuery?.error;
  const total = activeQuery?.data?.total ?? 0;
  const pageSize = results.length > 0 ? results.length : 20;
  const totalPages = pageSize ? Math.ceil(total / pageSize) : 0;

  const value: ArtistContextValue = useMemo(
    () => ({ ...state, results, loading, error, total, totalPages }),
    [state, results, loading, error, total, totalPages],
  );

  useEffect(() => {
    const qs = buildQueryParams(state.query, state.filters, i18next.language);
    const newUrl = `${window.location.pathname}${qs}`;
    if (newUrl !== window.location.pathname + window.location.search) {
      window.history.replaceState(null, '', newUrl);
    }
  }, [state.query, state.filters, i18next.language]);

  return (
    <ArtistStateCtx.Provider value={value}>
      <ArtistDispatchCtx.Provider value={dispatch}>
        {children}
      </ArtistDispatchCtx.Provider>
    </ArtistStateCtx.Provider>
  );
};

export const useArtistState = () => {
  const ctx = useContext(ArtistStateCtx);
  if (!ctx)
    throw new Error('useArtistState must be used within ArtistProvider');
  return ctx;
};

export const useArtistDispatch = () => {
  const ctx = useContext(ArtistDispatchCtx);
  if (!ctx)
    throw new Error('useArtistDispatch must be used within ArtistProvider');
  return ctx;
};

export const useArtistActions = () => {
  const dispatch = useArtistDispatch();
  return {
    setQuery: (data: string) =>
      dispatch({ type: EArtistAction.SetQuery, payload: data }),
    setFilters: (data: IArtistFilters) =>
      dispatch({ type: EArtistAction.SetFilters, payload: data }),
    setSearchType: (data: 'artist' | 'album') =>
      dispatch({ type: EArtistAction.SetSearchType, payload: data }),
    setPage: (data: number) =>
      dispatch({ type: EArtistAction.SetPage, payload: data }),
  };
};
