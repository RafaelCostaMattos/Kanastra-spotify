import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { FaSpotify } from 'react-icons/fa';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { setAppLanguage } from '@i18n/index';

const Header: React.FC = () => {
  const { i18n, t } = useTranslation();
  const nextLang = i18n.language === 'en' ? 'pt' : 'en';
  const homeWithLang = `/?lang=${i18n.language}`;

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ backgroundColor: '#121212', borderBottom: '1px solid #222' }}>
      <Toolbar>
        <IconButton
            edge="start"
            component={Link}
            to={homeWithLang}
            aria-label="Inicio"
            sx={{ mr: 1, color: '#1DB954' }}
        >
          <FaSpotify size={28} />
        </IconButton>
        <Typography
          component={Link}
          to={homeWithLang}
          variant="h6"
          sx={{
            textDecoration: 'none',
            color: 'white',
            fontWeight: 600,
            letterSpacing: '.5px',
            '&:hover': { color: '#1DB954' }
          }}
        >
          Kanastra
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="outlined"
          size="small"
          onClick={() => setAppLanguage(nextLang)}
          sx={{
            textTransform: 'none',
            borderColor: '#1DB954',
            color: '#1DB954',
            '&:hover': { borderColor: '#1DB954', background: 'rgba(29,185,84,0.1)' }
          }}
        >
          {t('language.switch')}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;