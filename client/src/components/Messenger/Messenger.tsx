import React, { FC, FormEventHandler, useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import Message from './Message/Message';
import { ChatMessage, UserId } from '../../types';

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
    <div>
      <Stack gap={3}>
        {chatMessages?.map((chatMessage) => <Message chatMessage={chatMessage} isUserMessage={chatMessage.author === myId} />)}
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
