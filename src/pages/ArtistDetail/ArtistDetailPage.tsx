import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useArtistDetailQuery, useArtistTopTracksQuery } from '@queries/artits.querie';
import {
  Container,
  Stack,
  Typography,
  Avatar,
  Chip,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  Grid,
  CircularProgress,
  Tooltip,
  Divider,
  TablePagination,
} from '@mui/material';
import { FaArrowLeft, FaExternalLinkAlt, FaMusic } from 'react-icons/fa';
import BasicBars from '@components/charts/basicBars';

const msToTime = (ms?: number) => {
  if (ms == null) return '-';
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const ArtistDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: artist, isLoading: loadingArtist, error: errorArtist } = useArtistDetailQuery(id);
  const { data: topTracksData, isLoading: loadingTracks, error: errorTracks } = useArtistTopTracksQuery(id, 'US');

  const tracks = topTracksData?.tracks ?? [];

  const [tracksPage, setTracksPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    setTracksPage(0);
  }, [tracks.length, rowsPerPage]);

  const paginatedTracks = tracks.slice(
    tracksPage * rowsPerPage,
    tracksPage * rowsPerPage + rowsPerPage
  );

  const handleChangeTracksPage = (_: unknown, newPage: number) => {
    setTracksPage(newPage);
  };
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setTracksPage(0);
  };

  if (loadingArtist) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, display: 'flex', justifyContent: 'center' }}>
        <Stack alignItems="center" gap={2}>
          <CircularProgress size={32} />
          <Typography variant="body2" color="text.secondary">Carregando artista...</Typography>
        </Stack>
      </Container>
    );
  }

  if (errorArtist) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography color="error">Erro ao carregar artista.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }} className="space-y-10">
      <Paper
        elevation={3}
        className="relative overflow-hidden"
        sx={{
          p: { xs: 3, md: 4 },
          background:
            'linear-gradient(135deg, rgba(29,185,84,0.15) 0%, rgba(25,25,25,0.9) 60%)',
          backdropFilter: 'blur(4px)'
        }}
      >
        <Stack direction="row" spacing={3} alignItems="flex-end" flexWrap="wrap">
          <Avatar
            src={artist?.images?.[0]?.url}
            variant="rounded"
            sx={{ width: 160, height: 160, borderRadius: 3, boxShadow: 3, bgcolor: '#1DB954' }}
          >
            <FaMusic size={48} />
          </Avatar>
          <Stack spacing={1} flex={1} minWidth={220}>
            <Typography variant="h3" fontWeight={700} lineHeight={1.1}>
              {artist?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Popularidade: {artist?.popularity ?? '-'} &nbsp;•&nbsp; Seguidores:{' '}
              {artist?.followers?.total?.toLocaleString?.() ?? '-'}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1} ml="auto">
            <IconButton
              component={RouterLink}
              to="/"
              color="primary"
              size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.05)' }}
            >
              <FaArrowLeft />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>

      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" fontWeight={600}>Top Tracks</Typography>
          {loadingTracks && <CircularProgress size={18} />}
        </Stack>
        <Divider flexItem sx={{ opacity: 0.15 }} />
        {!loadingTracks && !errorTracks && tracks.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            Nenhuma faixa encontrada.
          </Typography>
        )}
        {!loadingTracks && !errorTracks && tracks.length > 0 && (
          <Paper
            variant="outlined"
            sx={{
              overflow: 'hidden',
              borderColor: 'rgba(255,255,255,0.08)',
              background: 'linear-gradient(180deg,#181818,#121212)'
            }}
          >
            <Box sx={{ overflowX: 'auto' }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'rgba(255,255,255,0.04)' }}>
                    <TableCell sx={{ width: 40, fontWeight: 600 }}>#</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Título</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Álbum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedTracks.map((t: any, idx: number) => (
                    <TableRow
                      key={t.id}
                      hover
                      sx={{
                        '&:nth-of-type(odd)': { backgroundColor: 'rgba(255,255,255,0.02)' }
                      }}
                    >
                      <TableCell sx={{ opacity: 0.6 }}>
                        {tracksPage * rowsPerPage + idx + 1}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          {t.album?.images?.[2]?.url && (
                            <Avatar
                              src={t.album.images[2].url}
                              variant="rounded"
                              sx={{ width: 40, height: 40, borderRadius: 1 }}
                            />
                          )}
                          <Typography variant="body2" noWrap maxWidth={240}>
                            {t.name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 180 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                          title={t.album?.name}
                        >
                          {t.album?.name}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <TablePagination
              component="div"
              page={tracksPage}
              count={tracks.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangeTracksPage}
              rowsPerPageOptions={[]}
              sx={{
                bgcolor: 'rgba(255,255,255,0.02)',
                borderTop: '1px solid rgba(255,255,255,0.08)'
              }}
            />
          </Paper>
        )}
      </Stack>

      <BasicBars />
    </Container>
  );
};

export default ArtistDetailPage;