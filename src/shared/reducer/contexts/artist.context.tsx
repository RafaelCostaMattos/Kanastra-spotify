import { IArtistFilters, IArtistSearchAction, IArtistSearchState } from '@interfaces/artist.interface';
import { useArtistSearch } from '@hooks/useArtistSearch.hook';
import React, { createContext, useReducer, useContext, useMemo, ReactNode, Dispatch, useEffect } from 'react';
import { buildQueryParams, parseQueryParams } from '@utils/urlFilters';
import { artistReducer, initialArtistSearchState } from '../reducer/artist.reducer';

type ArtistContextValue = IArtistSearchState & ReturnType<typeof useArtistSearch>;

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
    };
  };

  const [state, dispatch] = useReducer(artistReducer, undefined, getInitial);
  const search = useArtistSearch({ query: state.query, filters: state.filters });
  const value: ArtistContextValue = useMemo(() => ({ ...state, ...search }), [state, search]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const qs = buildQueryParams(state.query, state.filters);
    const newUrl = `${window.location.pathname}${qs}`;
    if (newUrl !== window.location.pathname + window.location.search) {
      window.history.replaceState(null, '', newUrl);
    }
  }, [state.query, state.filters]);

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
    setQuery: (q: string) => dispatch({ type: 'SET_QUERY', payload: q }),
    setFilters: (f: Partial<IArtistFilters>) => dispatch({ type: 'SET_FILTERS', payload: f }),
    resetFilters: () => dispatch({ type: 'RESET_FILTERS' }),
    selectArtist: (id?: string) => dispatch({ type: 'SELECT_ARTIST', payload: id }),
  };
};
