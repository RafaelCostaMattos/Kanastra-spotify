import { useEffect, useState } from 'react';

const STORAGE_KEY = 'favoriteSongs';

export const saveToLocalStorage = (songs: any) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
};

export const getFromLocalStorage = () => {
    const storedSongs = localStorage.getItem(STORAGE_KEY);
    return storedSongs ? JSON.parse(storedSongs) : [];
};

export const clearLocalStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
};

export const useFavoriteSongs = () => {
    const [favoriteSongs, setFavoriteSongs] = useState(getFromLocalStorage());

    useEffect(() => {
        saveToLocalStorage(favoriteSongs);
    }, [favoriteSongs]);

    return [favoriteSongs, setFavoriteSongs];
};