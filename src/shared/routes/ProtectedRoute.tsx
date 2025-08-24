import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, ...routeProps }) => {
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <Route {...routeProps} />;
};

export default ProtectedRoute;