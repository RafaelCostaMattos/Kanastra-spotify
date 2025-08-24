import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ArtistDetailPage from '../../pages/ArtistDetail/ArtistDetailPage';
import FavoritesPage from '../../pages/Favorites/FavoritesPage';
import NotFoundPage from '../../pages/NotFound/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import HomePage from '../../pages/Home/HomePage';

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <ProtectedRoute path="/artist/:id" component={ArtistDetailPage} isAuthenticated={false} />
      <ProtectedRoute path="/favorites" component={FavoritesPage} isAuthenticated={false} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};

export default AppRoutes;