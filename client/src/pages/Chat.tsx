import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {
  Button,
  Col, Container, Row, Tab, Tabs,
} from 'react-bootstrap';
import Messenger from '../components/Messenger/Messenger';
import styles from './index.module.scss';

const socket = io('http://localhost:5000', { path: '/chat-socket' });

const Chat = () => {
  const [chatMessages, setChatMessages] = useState<{ [key: string]: string[] }>({});
  const [myId, setMyId] = useState<string>('');
  const [users, setUsers] = useState<string[]>([]);
  const [receiver, setReceiver] = useState<string>('');
  const [showChannels, setShowChannels] = useState<boolean>(false);

  const pushNewMessage = ({ from, message }: { from: string, message: string }): void => {
    setChatMessages((prevChatMessages) => ({
      ...prevChatMessages,
      [from]:
                prevChatMessages[from]?.length > 0
                  ? [...prevChatMessages[from], message]
                  : [message],
    }));
  };

  useEffect(() => {
    socket.on('message', ({ from, message }) => {
      console.log('message', { from, message });
      pushNewMessage({ from, message });
    });

    socket.on('registration', ({ myIdData }) => {
      setUsers(users.filter((userId: string) => userId !== myIdData));
      setMyId(myIdData);
    });

    socket.on('usersList', ({ usersData }) => {
      setUsers(usersData.filter((userId: string) => userId !== myId));
    });

    socket.on('sent', ({ to, message }: { to: string, message: string }) => {
      pushNewMessage({ from: to, message });
    });
  }, []);

  const sendMessage = (message: string) => {
    socket.emit('message', { to: receiver, message });
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
          <div className={styles.channels} />
        </Col>
        <Col sm={6} xs={12}>
          <div className={styles.chat}>
            <h3>
              {receiver ? `Chatting with ${receiver}` : 'Please choose some one you want from start a chat'}
            </h3>
            {receiver && <Messenger chatMessages={chatMessages[receiver]} sendMessage={sendMessage} />}
          </div>
        </Col>
        <Col sm={3} xs={12}>
          <div className={styles.users}>
            {users?.length < 1 ? <h3>Fetching users...</h3>
              : (
                <div>
                  <h3>Users</h3>
                  <ul>
                    {users.map((user) => (
                      <li
                        key={user}
                      >
                        <Button onClick={() => setReceiver(user)}>
                          {user}
                        </Button>
                      </li>
                    ))}
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
