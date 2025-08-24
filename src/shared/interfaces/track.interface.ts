export interface Track {
    popularity: any;
    name: any;
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: number; 
    releaseDate: string; 
    genre: string[];
    isFavorite: boolean;
    tracks: {
        id: string;
        name: string;
        popularity: number;
        preview_url?: string;
      }[];
}