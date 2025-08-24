
import { IArtist } from '@interfaces/artist.interface';
import { fetchArtistDetails } from '@services/artits.service';
import { useEffect, useState } from 'react';

const useArtistDetail = (artistId: string) => {
    const [artist, setArtist] = useState<IArtist | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getArtistDetail = async () => {
            try {
                setLoading(true);
                const data = await fetchArtistDetails(artistId);
                setArtist(data);
            } catch (err) {
                setError('Failed to fetch artist details');
            } finally {
                setLoading(false);
            }
        };

        getArtistDetail();
    }, [artistId]);

    return { artist, loading, error };
};

export default useArtistDetail;