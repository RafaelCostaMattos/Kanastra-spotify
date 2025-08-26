import { useFavoriteSongs } from '@hooks/useFavoriteSongs.hook';
import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import FavoriteSongForm from './FavoriteSongForm';

const FavoriteSongsPanel: React.FC = () => {
  const { songs, addFavorite, removeFavorite, clearFavorites } =
    useFavoriteSongs();

  return (
    <Stack spacing={3}>
      {' '}
      <FavoriteSongForm onAdd={addFavorite} />{' '}
      <Stack spacing={1}>
        {' '}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {' '}
          <Typography variant="subtitle1" fontWeight={600}>
            {' '}
            Minhas favoritas ({songs.length}){' '}
          </Typography>{' '}
          {songs.length > 0 && (
            <Button size="small" color="error" onClick={clearFavorites}>
              {' '}
              Limpar{' '}
            </Button>
          )}{' '}
        </Stack>{' '}
        <Divider flexItem sx={{ opacity: 0.12 }} />{' '}
        <List dense disablePadding>
          {' '}
          {songs.map((s) => (
            <ListItem
              key={s.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={() => s.id && removeFavorite(s.id)}
                >
                  {' '}
                  <FaTrash size={14} />{' '}
                </IconButton>
              }
              sx={{ py: 0.5, borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              {' '}
              <ListItemText
                primaryTypographyProps={{ variant: 'body2', noWrap: true }}
                secondaryTypographyProps={{ variant: 'caption', noWrap: true }}
              />{' '}
            </ListItem>
          ))}
          {songs.length === 0 && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ px: 1, py: 1 }}
            >
              {' '}
              Nenhuma música adicionada ainda.{' '}
            </Typography>
          )}{' '}
        </List>{' '}
      </Stack>{' '}
    </Stack>
  );
};

export default FavoriteSongsPanel;
