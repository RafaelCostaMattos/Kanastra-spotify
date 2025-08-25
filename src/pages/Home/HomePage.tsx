import React, { useEffect } from 'react';
import { ArtistProvider, useArtistState, useArtistActions } from '@contexts/artist.context';
import { useHistory } from 'react-router-dom';
import { Container, Box, TextField, CircularProgress, Typography, Grid, Paper, Chip, Stack } from '@mui/material';
import { TablePagination } from '@mui/material';
import ArtistCircleCard from '@components/artists/ArtistCard';
import { ITEMS_PER_PAGE } from '@constants/config.constant';

const HomeInner: React.FC = () => {
  const { results, loading, error, query, searchType, page, totalPages, total } = useArtistState() as any;
  const { setQuery, setSearchType, setPage } = useArtistActions() as any;
  const history = useHistory();

  const handleChangeType = (type: 'artist' | 'album') => {
    setSearchType(type);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };



  return (
    <Container sx={{ py: 4 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight={600}>
          {searchType === 'artist' ? 'Artistas' : 'Álbuns'}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" mb={3} flexWrap="wrap">
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
            onClick={() => handleChangeType('artist')}
            size="medium"
          />
          <Chip
            label="Álbuns"
            color={searchType === 'album' ? 'primary' : 'default'}
            variant={searchType === 'album' ? 'filled' : 'outlined'}
            onClick={() => handleChangeType('album')}
            size="medium"
          />
        </Stack>
      </Stack>
      {loading && (
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <CircularProgress size={20} /> <Typography variant="body2">Carregando...</Typography>
        </Box>
      )}
      {error && <Typography color="error" variant="body2" mb={2}>Erro ao buscar resultados</Typography>}
      {!loading && !error && results.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          {searchType === 'artist' ? 'Nenhum artista.' : 'Nenhum álbum.'}
        </Typography>
      )}
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
                onClick={(id) =>
                  history.push(`/${searchType === 'artist' ? 'artist' : 'album'}/${id}`)
                }
              />
            </Grid>
          );
        })}
      </Grid>

      {total  && (
        <Box mt={3} display="flex" justifyContent="center">
          <Paper variant="outlined" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
            <TablePagination
              component="div"
              page={page}
              count={total}
              rowsPerPage={ITEMS_PER_PAGE}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[]}
              sx={{
                bgcolor: 'rgba(255,255,255,0.02)',
                borderTop: '1px solid rgba(255,255,255,0.08)'
              }}
            />
          </Paper>
        </Box>
      )}
    </Container>
  );
};

const HomePage: React.FC = () => (
  <ArtistProvider>
    <HomeInner />
  </ArtistProvider>
);

export default HomePage;
