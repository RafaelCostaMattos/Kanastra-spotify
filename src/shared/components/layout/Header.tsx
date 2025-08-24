import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <header style={{ padding: '8px 16px', borderBottom: '1px solid #222' }}>
    <nav style={{ display: 'flex', gap: 16 }}>
      <Link to="/">Home</Link>
      <Link to="/artists">Artists</Link>
      <Link to="/favorites">Favorites</Link>
    </nav>
  </header>
);

export default Header;