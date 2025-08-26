export interface IArtist {
  id: string;
  name: string;
  genre: string;
  imageUrl: string;
  topTracks: string[];
  albums: string[];
  bio: string;
}

export interface IArtistFilters {
  album?: string;
  [key: string]: any;
}

export interface IArtistSearchState {
  query: string;
  filters: IArtistFilters;
  selectedArtistId?: string;
  searchType: 'artist' | 'album';
  page?: number;
}

export type IArtistSearchAction =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_FILTERS'; payload: IArtistFilters }
  | { type: 'RESET_FILTERS' }
  | { type: 'SELECT_ARTIST'; payload?: string }
  | { type: 'SET_SEARCH_TYPE'; payload: 'artist' | 'album' }
  | { type: 'SET_PAGE'; payload: number };

export interface ISpotifyImage {
  url: string;
  width?: number;
  height?: number;
}

export interface IArtist {
  id: string;
  name: string;
  genres: string[];
  images: ISpotifyImage[];
  popularity: number;
  followers?: { total: number };
  external_urls?: { spotify?: string };
  type: 'artist';
}
