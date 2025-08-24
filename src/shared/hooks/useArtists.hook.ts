import { fetchArtists } from '@services/artits.service';
import { useEffect, useState } from 'react';

const useArtists = () => {
    const [artists, setArtists] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const loadArtists = async () => {
            try {
                const data = await fetchArtists('', 0);
                setArtists(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadArtists();
    }, []);

    return { artists, loading, error };
};

export default useArtists;