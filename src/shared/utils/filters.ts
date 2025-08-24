export const filterByName = (items: any[], name: string) => {
    return items.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
};

export const filterByArtist = (items: any[], artist: string) => {
    return items.filter(item => item.artist.toLowerCase().includes(artist.toLowerCase()));
};

export const filterByAlbum = (items: any[], album: string) => {
    return items.filter(item => item.album.toLowerCase().includes(album.toLowerCase()));
};