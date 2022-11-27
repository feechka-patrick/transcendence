import React, {
  FC, FormEventHandler, useEffect, useMemo, useRef, useState,
} from 'react';
import {
  Button, Col, Form, Row,
} from 'react-bootstrap';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import Message from './Message/Message';
import {
  ActiveChat, ChannelId, ChannelsMap, ChatMessage, DirectMessagesMap, UserId,
} from '../../types';
import styles from './index.module.scss';

interface MessengerProps {
  activeChat: ActiveChat,
  channelsMessages: ChannelsMap,
  directMessages: DirectMessagesMap,
  myId: UserId,
  sendMessage: (message: string) => void;
}

const Messenger: FC<MessengerProps> = ({
  activeChat,
  channelsMessages,
  directMessages,
  myId,
  sendMessage,
}) => {
  const [message, setMessage] = useState<string>('');
  const chatMessages:ChatMessage[] | undefined = useMemo(
    () => (activeChat && activeChat?.startsWith('@')
      ? channelsMessages[activeChat as ChannelId]?.messages
      : directMessages[activeChat]?.messages),
    [activeChat, channelsMessages, directMessages],
  );
  const bottomOfTheMessagesRef = useRef<HTMLDivElement>(null);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    sendMessage(message);
    setMessage('');
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setMessage(e.target.value);

  useEffect(() => {
    if (bottomOfTheMessagesRef?.current) bottomOfTheMessagesRef?.current?.scrollIntoView();
  }, [chatMessages]);

  return (
    <div className={classNames(styles.messenger, 'd-flex flex-shrink-0')}>
      {activeChat ? (
        <div className="d-flex flex-column w-100">
          <div className={styles.chatMessages}>
            {chatMessages?.map((chatMessage) => <Message key={uuidv4()} chatMessage={chatMessage} isUserMessage={chatMessage.author === myId} />)}
            <div ref={bottomOfTheMessagesRef} />
          </div>
          <Form onSubmit={handleSubmit} className={classNames('w-100 mt-auto', styles.form)}>
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
      ) : (<h3 className="text-center align-self-center px-5 w-100">Choose the user or channel to start chatting!</h3>)}
    </div>
  );
};

export default Messenger;
