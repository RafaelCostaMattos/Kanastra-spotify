import {
  FavoriteSong,
  FavoriteSongSchema,
} from '@validation/favoriteSong.validation';
import { useCallback, useEffect, useState } from 'react';

export type IFavoriteSong = FavoriteSong;

const STORAGE_KEY = 'favorite_songs';

const readStorage = (): IFavoriteSong[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => {
      const res = FavoriteSongSchema.partial().safeParse(item);
      return res.success;
    });
  } catch {
    return [];
  }
};

const writeStorage = (data: IFavoriteSong[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const normalize = (data: string) => data.trim().toLowerCase();

export const useFavoriteSongs = () => {
  const [songs, setSongs] = useState<IFavoriteSong[]>([]);

  useEffect(() => {
    setSongs(readStorage());
  }, []);

  const persist = useCallback(
    (updater: (prev: IFavoriteSong[]) => IFavoriteSong[]) => {
      setSongs((data) => {
        const next = updater(data);
        writeStorage(next);
        return next;
      });
    },
    [],
  );

  const isFavorite = useCallback(
    (title: string, artist: string) => {
      const nt = normalize(title);
      const na = normalize(artist);
      return songs.some(
        (s) => normalize(s.title) === nt && normalize(s.artist) === na,
      );
    },
    [songs],
  );

  const addFavorite = useCallback(
    (song: any) => {
      const title = song.title?.trim();
      const artist = song.artist?.trim();
      if (!title || !artist) return;
      if (isFavorite(title, artist)) return;
      const base: IFavoriteSong = {
        ...song,
        title,
        artist,
        album: song.album?.trim() || undefined,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      };
      persist((prev) => [base, ...prev]);
    },
    [persist, isFavorite],
  );

  const addFavoriteFromTrack = useCallback(
    (track: any, artistName: string) => {
      addFavorite({
        title: track?.name || 'Unknown',
        artist: artistName || 'Unknown',
        album: track?.album?.name || '',
      });
    },
    [addFavorite],
  );

  const toggleFavorite = useCallback(
    (title: string, artist: string, album?: string) => {
      if (isFavorite(title, artist)) {
        persist((prev) =>
          prev.filter(
            (s) =>
              normalize(s.title) !== normalize(title) ||
              normalize(s.artist) !== normalize(artist),
          ),
        );
      } else {
        addFavorite({ title, artist, album });
      }
    },
    [isFavorite, addFavorite, persist],
  );

  const removeFavorite = useCallback(
    (id: string) => {
      persist((prev) => prev.filter((s) => s.id !== id));
    },
    [persist],
  );

  const clearFavorites = useCallback(() => {
    persist(() => []);
  }, [persist]);

  return {
    songs,
    addFavorite,
    addFavoriteFromTrack,
    toggleFavorite,
    isFavorite,
    removeFavorite,
    clearFavorites,
  };
};
