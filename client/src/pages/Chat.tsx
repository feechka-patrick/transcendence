import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {
  Col, Container, Row, Tab, Tabs,
} from 'react-bootstrap';
import Messenger from '../components/Messenger/Messenger';
import styles from './index.module.scss';

const socket = io('http://localhost:5000');

const Chat = () => {
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  // const [message, setMessage] = useState<string>('');

  const pushNewMessage = (newMessage: string) => {
    setChatMessages([...chatMessages, newMessage]);
  };

  useEffect(() => {
    socket.on('message', ({ data }) => {
      pushNewMessage(data);
    });

    return () => {
      socket.off('message');
    };
  }, [pushNewMessage]);

  return (
    <Container>
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
          <div className={styles.chat}><Messenger /></div>
        </Col>
        <Col sm={3} xs={12}>
          <div className={styles.users}>Users</div>
        </Col>
      </Row>
    </Container>
  // <div>
  //   {chatMessages?.length > 0
  //     ? <ul>{chatMessages.map((chatMessage) => (<li>{chatMessage}</li>))}</ul>
  //     : <h1>No messages</h1>}
  //   <Form onSubmit={handleSubmit}>
  //     <Form.Group>
  //       <Form.Label htmlFor="message">
  //         message
  //       </Form.Label>
  //       <Form.Control
  //         id="message"
  //         name="message"
  //         placeholder="write new message"
  //         type="text"
  //         value={message}
  //         onChange={onChange}
  //       />
  //     </Form.Group>
  //     <Button type="submit">Send</Button>
  //   </Form>
  // </div>
  );
};

export default Chat;
