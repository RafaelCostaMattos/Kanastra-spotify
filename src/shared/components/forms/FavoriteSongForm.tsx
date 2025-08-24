
import React, { useState } from 'react';
import { z } from 'zod';

const FavoriteSongForm: React.FC = () => {
    const { addFavorite } = useFavorites();

    const [songName, setSongName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            addFavorite({ songName, artistName });
            setSongName('');
            setArtistName('');
            setError('');
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.errors.map(e => e.message).join(', '));
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded border border-gray-200 shadow-sm bg-white max-w-md">
            <div className="flex flex-col">
                <label htmlFor="songName" className="text-sm font-medium mb-1">Song Name:</label>
                <input
                    type="text"
                    id="songName"
                    value={songName}
                    onChange={(e) => setSongName(e.target.value)}
                    required
                    className="border rounded px-2 py-1 focus:outline-none focus:ring focus:ring-primary/40"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="artistName" className="text-sm font-medium mb-1">Artist Name:</label>
                <input
                    type="text"
                    id="artistName"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    required
                    className="border rounded px-2 py-1 focus:outline-none focus:ring focus:ring-primary/40"
                />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition">
                Add to Favorites
            </button>
        </form>
    );
};

export default FavoriteSongForm;

function useFavorites(): { addFavorite: any; } {
    throw new Error('Function not implemented.');
}
