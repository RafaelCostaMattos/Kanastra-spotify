
import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { FaSpotify } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="default" elevation={1} sx={{ backgroundColor: '#121212', borderBottom: '1px solid #222' }}>
      <Toolbar>
        <IconButton
            edge="start"
            component={Link}
            to="/"
            aria-label="Inicio"
            sx={{ mr: 1, color: '#1DB954' }}
        >
          <FaSpotify size={28} />
        </IconButton>
        <Typography
          component={Link}
          to="/"
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;