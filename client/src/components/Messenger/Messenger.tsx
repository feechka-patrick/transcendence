import React, { FC, FormEventHandler, useState } from 'react';
import {
  Button, Col, Form, Row, Stack,
} from 'react-bootstrap';
import Message from './Message/Message';
import { ChatMessage, UserId } from '../../types';
import styles from './index.module.scss';

interface MessengerProps {
  chatMessages: ChatMessage[],
  myId: UserId,
  sendMessage: (message: string) => void;
}

const Messenger: FC<MessengerProps> = ({
  chatMessages,
  myId,
  sendMessage,
}) => {
  const [message, setMessage] = useState<string>('');

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    sendMessage(message);
    setMessage('');
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setMessage(e.target.value);
  console.log(chatMessages);

  return (
    <div className="d-flex flex-column w-100">
      <div className={styles.chatMessages}>
        {chatMessages?.map((chatMessage) => <Message chatMessage={chatMessage} isUserMessage={chatMessage.author === myId} />)}
      </div>
      <Form onSubmit={handleSubmit} className="w-100 mt-auto">
        <Form.Group>
          <Row>
            <Col xs={10} fluid>
              <Form.Control
                id="message"
                name="message"
                placeholder="write new message"
                type="text"
                value={message}
                onChange={onChange}
              />
            </Col>
            <Col xs={2} fluid>
              <Button type="submit" className="w-100">Send</Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Messenger;
