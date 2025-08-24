import apiClient from './config.service';
import { IArtist } from '../interfaces/artist.interface';

export const fetchArtists = async (query: string, page: number): Promise<IArtist[]> => {
    console.log(page)
    const response = await apiClient.get('/search', {
        params: { q: query, type: 'artist' },
    });
    return response.data.artists.items;
};

export const fetchArtistDetails = async (artistId: string): Promise<IArtist> => {
    const response = await apiClient.get(`/artists/${artistId}`);
    return response.data;
};