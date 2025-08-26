import { IFavoriteSong } from '@interfaces/favorite.interface';
import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props {
  onAdd: (id: string) => void;
  initialValues?: IFavoriteSong;
  onClose?: () => void;
}

const FavoriteSongForm: React.FC<Props> = ({
  onAdd,
  initialValues,
  onClose,
}) => {
  const computedDefaults = {
    id: initialValues?.id ?? '',
    title: initialValues?.title ?? '',
    artist: initialValues?.artist ?? '',
    album: initialValues?.album ?? '',
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFavoriteSong>({
    defaultValues: computedDefaults,
  });

  const { t } = useTranslation();

  React.useEffect(() => {
    if (initialValues) {
      reset(computedDefaults);
    }
  }, [initialValues, reset]);

  const onSubmit = () => {
    onAdd(computedDefaults.id);
    if (onClose) onClose();
    reset({ id: '', title: '', artist: '', album: '' });
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
            {t('form.registerFavorite')}
          </Typography>
          <TextField
            size="small"
            label={t('artist.title')}
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            size="small"
            label={t('artist.artist')}
            {...register('artist')}
            error={!!errors.artist}
            helperText={errors.artist?.message}
          />
          <TextField
            size="small"
            label={t('album')}
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
