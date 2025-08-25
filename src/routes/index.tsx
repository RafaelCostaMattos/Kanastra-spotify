import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import ArtistDetailPage from 'pages/ArtistDetail/ArtistDetailPage';
import NotFoundPage from 'pages/NotFound/NotFoundPage';

const routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route  path="/artit/:id" component={ArtistDetailPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default routes;
