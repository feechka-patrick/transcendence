import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { LOGIN_ROUTE } from '../utils/consts';
import { PrivateRoute } from './PrivateRoute';

const AppRouter = () => (
  <Switch>
    {authRoutes.map(({ path, Component }) => <PrivateRoute path={path} component={Component} />)}
    {publicRoutes.map(({ path, Component }) => <Route key={path} path={path} component={Component} exact />)}
    <Redirect to={LOGIN_ROUTE} />
  </Switch>
);

export default AppRouter;
