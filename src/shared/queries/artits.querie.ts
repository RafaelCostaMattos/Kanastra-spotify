import { fetchArtists } from '@services/artits.service';
import { useQuery } from 'react-query';

export const useArtistsQuery = (searchTerm: string, page: number) => {
  return useQuery(['artists', searchTerm, page], () => fetchArtists(searchTerm, page), {
    keepPreviousData: true,
  });
};