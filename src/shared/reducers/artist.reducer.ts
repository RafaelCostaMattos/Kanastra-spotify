import { EArtistAction } from '@enums/artist.enum';
import { IArtistSearchState } from '@interfaces/artist.interface';

export const initialArtistSearchState: IArtistSearchState = {
  query: '',
  filters: {},
  searchType: 'artist',
  page: 0,
};

export function artistReducer(
  state: IArtistSearchState,
  action: any,
): IArtistSearchState {
  switch (action.type) {
    case EArtistAction.SetQuery:
      return { ...state, query: action.payload, page: 0 };
    case EArtistAction.SetFilters:
      return { ...state, filters: action.payload, page: 0 };
    case EArtistAction.ResetFilters:
      return { ...state, filters: {}, page: 0 };
    case EArtistAction.SelectArtist:
      return { ...state, selectedArtistId: action.payload };
    case EArtistAction.SetSearchType:
      return { ...state, searchType: action.payload, page: 0, query: '' };
    case EArtistAction.SetPage:
      return { ...state, page: action.payload };
    default:
      return state;
  }
}
