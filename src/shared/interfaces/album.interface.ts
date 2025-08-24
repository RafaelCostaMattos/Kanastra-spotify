export interface Album {
    id: string;
    title: string;
    artistId: string;
    releaseDate: string;
    coverImageUrl: string;
    tracks: Track[];
}

export interface Track {
    id: string;
    title: string;
    duration: number;
    albumId: string;
}