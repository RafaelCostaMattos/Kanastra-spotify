import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { FavoriteSongFormValues } from '@validation/favoriteSong.validation';
import React from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onAdd: (data: FavoriteSongFormValues) => void;
  initialValues?: FavoriteSongFormValues;
  onClose?: () => void;
}

const FavoriteSongForm: React.FC<Props> = ({
  onAdd,
  initialValues,
  onClose,
}) => {
  const computedDefaults = {
    title: initialValues?.title ?? '',
    artist: initialValues?.artist ?? '',
    album: initialValues?.album ?? '',
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FavoriteSongFormValues>({
    defaultValues: computedDefaults,
  });

  React.useEffect(() => {
    if (initialValues) {
      reset(computedDefaults);
    }
  }, [initialValues, reset]);

  const onSubmit = (data: FavoriteSongFormValues) => {
    onAdd(data);
    if (onClose) onClose();
    reset({ title: '', artist: '', album: '' });
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        background: 'linear-gradient(180deg,#181818,#121212)',
        borderColor: 'rgba(255,255,255,0.1)',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={600}>
            Adicionar música favorita
          </Typography>
          <TextField
            size="small"
            label="Título"
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            size="small"
            label="Artista"
            {...register('artist')}
            error={!!errors.artist}
            helperText={errors.artist?.message}
          />
          <TextField
            size="small"
            label="Álbum (opcional)"
            {...register('album')}
            error={!!errors.album}
            helperText={errors.album?.message}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Salvar
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default FavoriteSongForm;
