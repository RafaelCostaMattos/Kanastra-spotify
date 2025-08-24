import { IArtist } from '@interfaces/artist.interface';
import React from 'react';

interface ArtistCardProps {
  artist: IArtist;
  onClick: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClick }) => {
  return (
    <div className="cursor-pointer group rounded-lg border border-gray-200 p-4 bg-white hover:shadow-md transition" onClick={onClick}>
      <img src={artist.imageUrl} alt={artist.name} className="w-full h-40 object-cover rounded mb-3" />
      <h3 className="font-semibold text-gray-900 group-hover:text-primary truncate">{artist.name}</h3>
      <p className="text-xs text-gray-500 mt-1">{artist.genre}</p>
    </div>
  );
};

export default ArtistCard;