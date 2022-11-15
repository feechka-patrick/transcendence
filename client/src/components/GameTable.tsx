// @ts-nocheck
import React, { useContext, useState } from 'react';
import {
  Button, Col, Container, Form, Row,
} from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { getGamesByUser } from '../http/userAPI';
import { Context } from '../index';

const GameTable = () => {
  const { user } = useContext(Context);
  const [sgames, setGames] = useState(user.games);

  const updateGames = async () => {
    try {
      const data = await getGamesByUser(user.email);
      const games: { winner: any; time: any; }[] = data.data.map(({ winner, time }) => ({ winner, time }));

      user.setGames(games);
      setGames(games);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-center">
        <h2 className="m-auto">Game history</h2>
      </div>
      <Table
        className="m-3"
        striped
        bordered
        hover
        size="sm"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Result</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {sgames.map((game, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{game.winner ? 'win' : 'lose'}</td>
              <td>{game.time}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Form.Group as={Row} className="mb-5 m-5">
        <Col />

        {/* BUTTON UPDATE TABLE */}
        <Col sm={10}>
          <Button
            variant="outline-dark"
            onClick={updateGames}
            className="account_btn"
          >
            Update
          </Button>
        </Col>
      </Form.Group>
    </Container>
  );
};

export default GameTable;
