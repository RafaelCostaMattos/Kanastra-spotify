import ArtistCircleCard from '@components/artists/ArtistCard';
import { ITEMS_PER_PAGE_HOME } from '@constants/config.constant';
import {
  ArtistProvider,
  useArtistActions,
  useArtistState,
} from '@contexts/artist.context';
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const HomeInner: React.FC = () => {
  const { results, loading, error, query, searchType, page, total } =
    useArtistState() as any;
  const { setQuery, setSearchType, setPage } = useArtistActions() as any;
  const history = useHistory();
  const { t, i18n } = useTranslation();

  const handleChangeType = (type: 'artist' | 'album') => {
    setSearchType(type);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h5" fontWeight={600}>
          {searchType === 'artist' ? t('home.artists') : t('home.albums')}
        </Typography>
      </Stack>
      <Stack
        flex={0}
        direction="row"
        spacing={1}
        alignItems="center"
        mb={3}
        flexWrap="wrap"
      >
        <TextField
          size="small"
          label={
            searchType === 'artist'
              ? t('home.searchArtists')
              : t('home.searchAlbums')
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ maxWidth: 320 }}
        />
        <Chip
          label={t('home.artists')}
          color={searchType === 'artist' ? 'primary' : 'default'}
          variant={searchType === 'artist' ? 'filled' : 'outlined'}
          onClick={() => handleChangeType('artist')}
          size="medium"
        />
        <Chip
          label={t('home.albums')}
          color={searchType === 'album' ? 'primary' : 'default'}
          variant={searchType === 'album' ? 'filled' : 'outlined'}
          onClick={() => handleChangeType('album')}
          size="medium"
        />
      </Stack>
      {loading && (
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <CircularProgress size={20} />{' '}
          <Typography variant="body2">{t('home.loading')}</Typography>
        </Box>
      )}
      {error && (
        <Typography color="error" variant="body2" mb={2}>
          Erro ao buscar resultados
        </Typography>
      )}
      {!loading && !error && results.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          {searchType === 'artist' ? t('home.noArtists') : t('home.noAlbums')}
        </Typography>
      )}
      <Grid container spacing={2}>
        {results.map((a: any) => {
          const image =
            a.imageUrl ||
            a.images?.[0]?.url ||
            (Array.isArray(a.images) && a.images.length > 0
              ? a.images[0].url
              : undefined);
          return (
            <Grid item xs={6} sm={4} md={3} lg={2} key={a.id}>
              <ArtistCircleCard
                id={a.id}
                name={a.name}
                imageUrl={image}
                onClick={(id) => {
                  const langQs = `?lang=${i18n.language}`;
                  history.push(
                    `/${
                      searchType === 'artist' ? 'artist' : 'album'
                    }/${id}${langQs}`,
                  );
                }}
              />
            </Grid>
          );
        })}
      </Grid>

      {total > 0 && (
        <Box mt={3} display="flex" justifyContent="center">
          <Paper variant="outlined" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
            <TablePagination
              component="div"
              page={page}
              count={total}
              rowsPerPage={ITEMS_PER_PAGE_HOME}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[]}
              sx={{
                bgcolor: 'rgba(255,255,255,0.02)',
                borderTop: '1px solid rgba(255,255,255,0.08)',
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
