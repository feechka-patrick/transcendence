import React, { FormEventHandler, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Button, Form } from 'react-bootstrap';

const socket = io('http://localhost:5000');

const Chat = () => {
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');

  const pushNewMessage = (newMessage: string) => {
    setChatMessages([...chatMessages, newMessage]);
  };

  useEffect(() => {
    console.log('init');
    socket.on('message', ({ data }) => {
      console.log('data income', data);
      pushNewMessage(data);
      // setChatMessages([...chatMessages, data]);
    });

    return () => {
      socket.off('message');
    };
  }, [pushNewMessage]);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // console.log('sending', message);
    socket.emit('message', { data: message });
    setMessage('');
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setMessage(e.target.value);

  return (
    <div>
      {chatMessages?.length > 0
        ? <ul>{chatMessages.map((chatMessage) => (<li>{chatMessage}</li>))}</ul>
        : <h1>No messages</h1>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="message">
            message
          </Form.Label>
          <Form.Control
            id="message"
            name="message"
            placeholder="write new message"
            type="text"
            value={message}
            onChange={onChange}
          />
        </Form.Group>
        <Button type="submit">Send</Button>
      </Form>
    </div>
  );
};

export default Chat;
