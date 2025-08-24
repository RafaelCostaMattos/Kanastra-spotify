import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
  <div style={{ padding: 16 }}>
    <h2>404 - Not Found</h2>
    <Link to="/">Go Home</Link>
  </div>
);

export default NotFoundPage;