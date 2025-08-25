import React from 'react';
import { Paper, Avatar, Typography, Stack } from '@mui/material';
import { FaUser } from 'react-icons/fa';

interface Props {
  id: string;
  name: string;
  imageUrl?: string;
  onClick?: (id: string) => void;
  size?: number;
}

const ArtistCircleCard: React.FC<Props> = ({ id, name, imageUrl, onClick, size = 110 }) => {
  const handleClick = () => onClick?.(id);

  return (
    <Paper
      elevation={2}
      onClick={handleClick}
      sx={{
        p: 1.5,
        cursor: 'pointer',
        bgcolor: 'background.paper',
        textAlign: 'center',
        '&:hover': {
          bgcolor: 'primary.dark',
          '& .artist-name': { color: 'primary.light' }
        },
        transition: 'background-color .2s'
      }}
    >
      <Stack spacing={1} alignItems="center">
        <Avatar
          src={imageUrl || undefined}
          alt={name}
          sx={{
            width: size,
            height: size,
            border: '2px solid',
            borderColor: 'primary.main',
            bgcolor: imageUrl ? 'transparent' : 'primary.main',
            fontSize: 0
          }}
          variant="circular"
        >
          {!imageUrl && <FaUser size={size * 0.5} />}
        </Avatar>
        <Typography
          variant="body2"
            className="artist-name"
            fontWeight={500}
            sx={{
              width: size + 16,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: 'text.primary'
            }}
            title={name}
        >
          {name}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default ArtistCircleCard;