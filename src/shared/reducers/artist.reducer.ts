import { IArtistSearchAction, IArtistSearchState } from "@interfaces/artist.interface";

const initialArtistSearchState: IArtistSearchState = {
    query: '',
    filters: {}
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
    default:
      return state;
  }
};

export  {artistReducer, initialArtistSearchState};