import useArtistDetail from '@hooks/useArtistDetail.hook';
import React from 'react';
import { useParams } from 'react-router-dom';
// import TopTracksChart from '../../components/charts/TopTracksChart';
// import FavoriteSongForm from '../../components/forms/FavoriteSongForm';

const ArtistDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { artist, loading, error } = useArtistDetail(id);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading artist details.</div>;
    }

    return (
        <div style={{ padding: 16 }}>
            <h2>Artist Detail</h2>
            <p>ID: {id}</p>
            <h1>{artist?.name}</h1>
            <p>{artist?.bio}</p>
            {/* <TopTracksChart tracks={artist?.topTracks} /> */}
            {/* <FavoriteSongForm artistId={id} /> */}
        </div>
    );
};

export default ArtistDetailPage;