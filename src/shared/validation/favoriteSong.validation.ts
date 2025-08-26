import { z } from 'zod';

export const FavoriteSongSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Título obrigatório'),
  artist: z.string().min(1, 'Artista obrigatório'),
  album: z.string().optional().nullable(),
  createdAt: z.number().optional(),
});

export const FavoriteSongFormSchema = FavoriteSongSchema.omit({
  id: true,
  createdAt: true,
});

export type FavoriteSong = z.infer<typeof FavoriteSongSchema>;
export type FavoriteSongFormValues = z.infer<typeof FavoriteSongFormSchema>;
