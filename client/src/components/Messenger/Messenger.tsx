import React, { FormEventHandler, useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import Message from './Message/Message';

const Messenger = () => {
  const [message, setMessage] = useState<string>('');

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // socket.emit('message', { data: message });
    setMessage('');
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setMessage(e.target.value);

  const history = [
    'Hi!',
    'How are you?',
  ];

  return (
    <div>
      <Stack gap={3}>
        {history.map((item) => <Message text={item} />)}
      </Stack>
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
export default Messenger;
