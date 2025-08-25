import React, { useEffect } from 'react';
import { ArtistProvider, useArtistState, useArtistActions } from '@contexts/artist.context';
import { useHistory } from 'react-router-dom';
import { Container, Box, TextField, CircularProgress, Typography, Grid, Paper } from '@mui/material';
import { FaUser } from 'react-icons/fa';

const HomeInner: React.FC = () => {
  const { results, loading, error, query } = useArtistState() as any;
  const { setQuery } = useArtistActions() as any;
  const history = useHistory();

  useEffect(() => {
    // initial load handled by context
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={600} mb={2}>Artistas</Typography>
      <TextField
        size="small"
        label="Buscar artistas"
        value={query}
        onChange={e => setQuery(e.target.value)}
        sx={{ mb: 3, width: 300 }}
      />
      {loading && (
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <CircularProgress size={20} /> <Typography variant="body2">Carregando...</Typography>
        </Box>
      )}
      {error && <Typography color="error" variant="body2" mb={2}>Erro ao buscar artistas</Typography>}
      {!loading && !error && results.length === 0 && <Typography variant="body2" color="text.secondary">Nenhum artista.</Typography>}
      <Grid container spacing={2}>
        {results.map((a: any) => (
          <Grid item xs={6} md={3} key={a.id}>
            <ArtistCircleCard
                id={a.id}
                name={a.name}
                imageUrl={image}
                onClick={(id) => history.push(`/artist/${id}`)}
              />
          </Grid>
        ))}
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
