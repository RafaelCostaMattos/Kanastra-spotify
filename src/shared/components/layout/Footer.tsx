import React from 'react';

const Footer: React.FC = () => (
  <footer style={{ padding: '12px 16px', borderTop: '1px solid #222', marginTop: 32, fontSize: 12, opacity: 0.7 }}>
    Kanastra Spotify &copy; {new Date().getFullYear()}
  </footer>
);

export default Footer;