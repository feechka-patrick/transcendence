import React, { useState } from 'react';
import {
  Button, Card, Col, Container, Form, Row,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { MAIN_ROUTE } from '../utils/consts';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { alert } from '../store/features/alertSlice';
import { useInput } from '../components/Validation';

const Account = () => {
  const history = useHistory();

  const { user } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();

  const email = useInput(user?.email, { isEmpty: true, minLength: 5, isEmail: true });
  const [password, setPassword] = useState('');


  const changeData = async () => {
    try {
      history.push(MAIN_ROUTE);
    } catch (e : any) {
      dispatch(alert({ message: e.response.data.message }));
    }
  };

  const deleteData = async () => {
    try {
      history.push(MAIN_ROUTE);
    } catch (e : any) {
      dispatch(alert({ message: e.response.data.message }));
    }
  };

  return (
    <Container className="mt-5">
      <Card className="m-5 p-5">
        {/* TITLE */}
        <div className="d-flex justify-content-center">
          <h2 className="m-auto">Personal data</h2>
        </div>
        <Form className="mt-5">
          {/* EMAIL */}
          {/* <Form className="mt-5">
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Email"
                value={email.value}
                onChange={e => email.onChange(e)}
                onBlur={e => email.onBlur(e)} />
              {(email.isDirty && email.isEmpty) &&
                <div style={{ color: 'red' }}>Email cannot be empty</div>}
              {(email.isDirty && email.minLengthError) &&
                <div style={{ color: 'red' }}>Email cannot be less 5 symbols</div>}
              {(email.isDirty && email.emailError) &&
                <div style={{ color: 'red' }}>Incorrect email</div>}
            </Col>
          </Form.Group> */}

          <Form>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="Enter username" />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email.value}
                  onChange={(e) => email.onChange(e)}
                  onBlur={(e) => email.onBlur(e)}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St" />
            </Form.Group>

          </Form>

          {/* PASSWORD */}
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                placeholder="Enter current password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-5 m-5">
            <Col />

            {/* BUTTON SAVE CHANGE */}
            <Col sm={5}>
              <Button
                variant="outline-dark"
                onClick={changeData}
                disabled={!email.inputValid}
                className="account_btn"
              >
                Save change
              </Button>
            </Col>

            {/* BUTTON DELETE USER */}
            <Col sm={5}>
              <Button
                variant="outline-danger"
                onClick={deleteData}
                style={{ float: 'right' }}
                className="account_btn"
              >
                Delete account
              </Button>
            </Col>
          </Form.Group>
        </Form>

        {/* GAME HISTORY TABLE */}
        {/* <GameTable /> */}

      </Card>
    </Container>
  );
};

export default Account;
