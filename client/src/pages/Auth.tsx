import React from 'react';
import {
  Button, Card, Container, Form,
} from 'react-bootstrap';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { emailLogin } from '../store/features/auth/authThunks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { registration } from '../http/userAPI';
import { useInput } from '../components/Validation';
import { Intra42RedirectURL } from '../constants';

const Auth = () => {
  const location = useLocation();
  const history = useHistory();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const email = useInput('', { isEmpty: true, minLength: 5, isEmail: true });
  const password = useInput('', { isEmpty: true, minLength: 3 });

  const { isAuth } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();

  const signIn = async () => {
    try {
      if (isLogin) {
        dispatch(emailLogin({ email: email.value, password: password.value }));
      } else {
        const data = await registration(email.value, password.value);
      }
      if (isAuth) history.push(MAIN_ROUTE);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Sign in to the site' : 'Registration'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Enter your email..."
            value={email.value}
            onChange={(e) => email.onChange(e)}
            onBlur={(e) => email.onBlur(e)}
          />
          {(!isLogin && email.isDirty && email.isEmpty)
            && <div style={{ color: 'red' }}>Email cannot be empty</div>}
          {(!isLogin && email.isDirty && email.minLengthError)
            && <div style={{ color: 'red' }}>Email cannot be less 5 symbols</div>}
          {(!isLogin && email.isDirty && email.emailError)
            && <div style={{ color: 'red' }}>Incorrect email</div>}
          <Form.Control
            className="mt-3"
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            placeholder="Enter your password..."
            value={password.value}
            onChange={(e) => password.onChange(e)}
            onBlur={(e) => password.onBlur(e)}
          />
          {(!isLogin && password.isDirty && password.isEmpty)
            && <div style={{ color: 'red' }}>Password cannot be empty</div>}
          {(!isLogin && password.isDirty && password.minLengthError)
            && <div style={{ color: 'red' }}>Password cannot be less 3 and more 8 symbols</div>}
        </Form>

        <Button
          disabled={false}
          variant="outline-success"
          className="mt-3"
          onClick={signIn}
        >
          {isLogin ? 'Sign in' : 'Log up'}
        </Button>

        {isLogin
          ? (
            <div className="mt-3">
              Don&apos;t have an account yet?
              <NavLink to={REGISTRATION_ROUTE}> Create an account.</NavLink>
            </div>
          )
          : (
            <div className="mt-3">
              Already have an account?
              <NavLink to={LOGIN_ROUTE}> Sign in</NavLink>
            </div>
          )}
        <a href={Intra42RedirectURL}>Login with intra 42</a>
      </Card>
    </Container>
  );
};

export default Auth;
