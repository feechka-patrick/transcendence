import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {
  Col, Container, Row, Tab, Tabs,
} from 'react-bootstrap';
import Messenger from '../components/Messenger/Messenger';
import styles from './index.module.scss';

const socket = io('http://localhost:5000', { path: '/chat-socket' });

const Chat = () => {
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [myId, setMyId] = useState<string>('');
  const [users, setUsers] = useState<string[]>([]);
  const [room, setRoom] = useState<string>('');

  const pushNewMessage = (newMessage: string) => {
    setChatMessages([...chatMessages, newMessage]);
  };

  useEffect(() => {
    socket.on('message', (data) => {
      console.log('message rertieved new message', data);
      pushNewMessage(data.message);
    });

    socket.on('registration', (data) => {
      console.log('registration data', data);
      setMyId(data);
    });

    socket.on('usersList', (data) => {
      setUsers(data);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = (message: string) => {
    socket.emit('message', { data: { to: room, message } });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>
            My ID:
            {myId}
          </h1>
        </Col>
      </Row>
      <Row>
        <Col sm={3} xs={12}>
          <div className={styles.channels}>
            <Tabs
              defaultActiveKey="Channels"
            >
              <Tab eventKey="Channels" title="Channels">
                TO BE DONE CHANNELS...
              </Tab>
              <Tab eventKey="DirectMessages" title="DirectMessages">
                TO BE DONE DIRECT MESSAGES...
              </Tab>
            </Tabs>
          </div>
        </Col>
        <Col sm={6} xs={12}>
          <div className={styles.chat}>
            <h2>
              Messaging with
              {room}
            </h2>
            <Messenger chatMessages={chatMessages} sendMessage={sendMessage} />
          </div>
        </Col>
        <Col sm={3} xs={12}>
          <div className={styles.users}>
            {users?.length < 1 ? <h3>Fetching users...</h3>
              : (
                <div>
                  <h3>Users</h3>
                  <ul>
                    {users.map((user) => <li key={user} onClick={() => setRoom(user)}>{user}</li>)}
                  </ul>
                </div>
              )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
