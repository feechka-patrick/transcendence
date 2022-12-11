import React from 'react';
import {
  Button, ButtonGroup, Card, Col, Container,
  Row,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import TypeBar from '../components/TypeBar';
import { GAME_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { useAppSelector } from '../store/hooks';

const Main = () => {
  const { loaded } = useAppSelector((store) => store.auth);
  const isAuth = loaded;
  const history = useHistory();

  return (
    <Container>
      <Row className="mt-5">

        <Col md={3}>
          <TypeBar />
        </Col>

        <Col md={9}>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Крестики - нолики</Card.Title>
              <Card.Text>
                Tic Tac Toe is a logic game between two opponents on a 3-by-3 square field.
              </Card.Text>
              <ButtonGroup className="d-flex justify-content-center">
                {isAuth
                  ? <Button variant="outline-dark" onClick={() => history.push(GAME_ROUTE)}>PLay</Button>
                  : <Button variant="outline-dark" onClick={() => history.push(REGISTRATION_ROUTE)}>PLay</Button>}
              </ButtonGroup>
            </Card.Body>
          </Card>
        </Col>

      </Row>

    </Container>
  );
};

export default Main;
