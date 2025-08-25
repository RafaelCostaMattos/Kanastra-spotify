import React, { useEffect } from 'react';
import { ArtistProvider, useArtistState, useArtistActions } from '@contexts/artist.context';
import { useHistory } from 'react-router-dom';
import { Container, Box, TextField, CircularProgress, Typography, Grid, Paper, Chip, Stack } from '@mui/material';
import { FaUser } from 'react-icons/fa';
import ArtistCircleCard from '@components/artists/ArtistCard';


const HomeInner: React.FC = () => {
  const { results, loading, error, query, searchType } = useArtistState() as any;
  const { setQuery, setSearchType } = useArtistActions() as any;
  const history = useHistory();

  useEffect(() => {
    // initial load handled by context
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={600} mb={2}>Artistas</Typography>
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <TextField
          size="small"
          label={`Buscar ${searchType === 'artist' ? 'artistas' : 'álbuns'}`}
          value={query}
          onChange={e => setQuery(e.target.value)}
          sx={{ width: 320 }}
        />
        <Stack direction="row" spacing={1}>
          <Chip
            label="Artistas"
            color={searchType === 'artist' ? 'primary' : 'default'}
            variant={searchType === 'artist' ? 'filled' : 'outlined'}
            onClick={() => setSearchType('artist')}
            size="small"
          />
          <Chip
            label="Álbuns"
            color={searchType === 'album' ? 'primary' : 'default'}
            variant={searchType === 'album' ? 'filled' : 'outlined'}
            onClick={() => setSearchType('album')}
            size="small"
          />
        </Stack>
      </Stack>
      {loading && (
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <CircularProgress size={20} /> <Typography variant="body2">Carregando...</Typography>
        </Box>
      )}
      {error && <Typography color="error" variant="body2" mb={2}>Erro ao buscar artistas</Typography>}
      {!loading && !error && results.length === 0 && <Typography variant="body2" color="text.secondary">Nenhum artista.</Typography>}
      <Grid container spacing={2}>
      {results.map((a: any) => {
          const image =
            a.imageUrl ||
            a.images?.[0]?.url ||
            (Array.isArray(a.images) && a.images.length > 0 ? a.images[0].url : undefined);
          return (
            <Grid item xs={6} sm={4} md={3} lg={2} key={a.id}>
              <ArtistCircleCard
                id={a.id}
                name={a.name}
                imageUrl={image}
                onClick={(id) => history.push(`/artist/${id}`)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

const HomePage: React.FC = () => (
  <ArtistProvider>
    <HomeInner />
  </ArtistProvider>
);

export default HomePage;
