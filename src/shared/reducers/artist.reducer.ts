import { IArtistSearchAction, IArtistSearchState } from "@interfaces/artist.interface";

const initialArtistSearchState: IArtistSearchState = {
    query: '',
    filters: {},
    searchType: 'artist'
};

const artistReducer = (state = initialArtistSearchState, action: IArtistSearchAction): IArtistSearchState => {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'RESET_FILTERS':
      return { ...state, filters: {} };
    case 'SELECT_ARTIST':
      return { ...state, selectedArtistId: action.payload };
    case 'SET_SEARCH_TYPE':
      return { ...state, searchType: action.payload as 'artist' | 'album' };
    default:
      return state;
  }
};

export  {artistReducer, initialArtistSearchState};