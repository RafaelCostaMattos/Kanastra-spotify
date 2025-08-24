import React from 'react';
import ArtistCard from './ArtistCard';
import { IArtist } from '@interfaces/artist.interface';

interface ArtistListProps {
  artists: IArtist[];
}

const ArtistList: React.FC<ArtistListProps> = ({ artists }) => {

  const onClick = () => {

  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} onClick={onClick} />
      ))}
    </div>
  );
};

export default ArtistList;