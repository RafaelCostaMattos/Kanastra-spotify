import { IArtistSearchAction, IArtistSearchState } from "@interfaces/artist.interface";

const initialArtistSearchState: IArtistSearchState = {
    query: '',
    filters: {},
    searchType: 'artist',
    page: 0,
};

const artistReducer = (state = initialArtistSearchState, action: IArtistSearchAction): IArtistSearchState => {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload, page: 0 };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload }, page: 0 };
    case 'RESET_FILTERS':
      return { ...state, filters: {}, page: 0 };
    case 'SELECT_ARTIST':
      return { ...state, selectedArtistId: action.payload };
    case 'SET_SEARCH_TYPE':
      return { ...state, searchType: action.payload as 'artist' | 'album', page: 0 };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

export  {artistReducer, initialArtistSearchState};