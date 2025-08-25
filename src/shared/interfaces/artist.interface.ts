export interface IArtist {
    id: string;
    name: string;
    genre: string;
    imageUrl: string;
    topTracks: string[];
    albums: string[];
    bio: string
}


export interface IArtistFilters {
  album?: string;
  [key: string]: any;
}

export interface IArtistSearchState {
  query: string;
  filters: IArtistFilters;
  selectedArtistId?: string;
}

export type IArtistSearchAction =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_FILTERS'; payload: IArtistFilters }
  | { type: 'RESET_FILTERS' }
  | { type: 'SELECT_ARTIST'; payload?: string };

