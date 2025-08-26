import ArtistDetailPage from 'pages/ArtistDetail/ArtistDetailPage';
import NotFoundPage from 'pages/NotFound/NotFoundPage';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';

const routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/artist/:id" component={ArtistDetailPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default routes;
