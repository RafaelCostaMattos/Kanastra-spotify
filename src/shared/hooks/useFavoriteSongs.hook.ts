import { STORAGE_KEY } from '@constants/config.constant';
import { useCallback, useEffect, useState } from 'react';

const readStorage = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v) => typeof v === 'string');
  } catch {
    return [];
  }
};

const writeStorage = (ids: string[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
};

export const useFavoriteSongs = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteIds(readStorage());
  }, []);

  const isFavorite = useCallback(
    (id: string) => favoriteIds.includes(id),
    [favoriteIds],
  );

  const addFavorite = useCallback(
    (id: string) => {
      if (!id || isFavorite(id)) return;
      setFavoriteIds((prev) => {
        const next = [id, ...prev];
        writeStorage(next);
        return next;
      });
    },
    [isFavorite],
  );

  const removeFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => {
      const next = prev.filter((x) => x !== id);
      writeStorage(next);
      return next;
    });
  }, []);

  const toggleFavorite = useCallback(
    (id: string) => {
      if (!id) return;
      if (isFavorite(id)) {
        removeFavorite(id);
      } else {
        addFavorite(id);
      }
    },
    [isFavorite, removeFavorite, addFavorite],
  );

  return {
    favoriteIds,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
};
