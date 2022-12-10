import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { updateAuthListener } from '../store/features/auth/authThunks';
import { useAppDispatch } from '../store/hooks';
import { getToken } from '../store/token';
import { LOGIN_ROUTE } from '../utils/consts';

interface Props {
    path: string,
    component: () => JSX.Element
}

export const PrivateRoute = ({ path, component }: Props) => {
  const token = getToken();
  const dispatch = useAppDispatch();

  if (token) {
    dispatch(updateAuthListener());
    return <Route key={path} path={path} component={component} exact />;
  }

  return (
    <Redirect to={LOGIN_ROUTE} />
  );
};
