import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {
  REGISTRATION_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, ACCOUNT_ROUTE, GAME_ROUTE,
} from '../utils/consts';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/features/auth/authThunks';

const NavBar = () => {
  const { loaded } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();

  const isAuth = loaded;

  const history = useHistory();

  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const logOut = () => {
    history.push(LOGIN_ROUTE);
    dispatch(logout());
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: 'white' }} to={MAIN_ROUTE}>MY SITE</NavLink>
        {isAuth
          ? (
            <Nav className="ml-auto" style={{ color: 'white' }}>
              <Button
                variant="outline-light"
                className="ml-2"
                onClick={() => history.push(GAME_ROUTE)}
              >
                Game
              </Button>
              <Button
                variant="outline-light"
                className="ml-2"
                onClick={() => history.push(ACCOUNT_ROUTE)}
              >
                Account
              </Button>
              <Button
                variant="outline-light"
                onClick={() => logOut()}
                className="ml-2"
              >
                Log out
              </Button>
            </Nav>
          )
          : (
            <Nav className="ml-auto" style={{ color: 'white' }}>
              {!isLogin
                ? <Button variant="outline-light" onClick={() => history.push(LOGIN_ROUTE)}>Log in</Button>
                : <Button variant="outline-light" onClick={() => history.push(REGISTRATION_ROUTE)}>Log up</Button>}
            </Nav>
          )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
