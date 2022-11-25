import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {
  Button,
  Col, Container, Row,
} from 'react-bootstrap';
import Messenger from '../components/Messenger/Messenger';
import styles from './index.module.scss';
import {
  SocketEvents, ChannelsMap, DirectMessagesMap, ChannelId, UserId, ChatMessage,
} from '../types';

const socket = io('http://localhost:5000', { path: '/chat-socket' });

const Chat = () => {
  const [channelsMessages, setChannelsMessages] = useState<ChannelsMap>({});
  const [directMessages, setDirectMessages] = useState<DirectMessagesMap>({});
  const [activeChat, setActiveChat] = useState<ChannelId | UserId>('');

  const [myId, setMyId] = useState<string>('');
  const [users, setUsers] = useState<UserId[]>([]);
  const [channels, setChannels] = useState<{ [key: ChannelId]: UserId[] }>({});

  const pushNewMessage = (chatMessage: ChatMessage): void => {
    const { where } = chatMessage;
    if (where.startsWith('@')) {
      setChannelsMessages((prevState) => ({
        ...prevState,
        [where]: {
          ...prevState[where as ChannelId],
          messages: [...(prevState[where as ChannelId]?.messages ?? []), chatMessage],
        },
      }));
    } else {
      setDirectMessages((prevState) => ({
        ...prevState,
        [where]: {
          ...prevState[where],
          messages: [...(prevState[where]?.messages ?? []), chatMessage],
        },
      }));
    }
  };

  useEffect(() => {
    socket.on(SocketEvents.REGISTRATION, ({ myIdData }) => {
      setMyId(myIdData);
    });

    socket.on(SocketEvents.LIST, ({
      usersData,
      channelsData,
    }) => {
      setUsers(usersData);
      setChannels(channelsData);
    });

    socket.on(SocketEvents.MESSAGE, ({
      author,
      where,
      message,
    }: ChatMessage) => {
      console.log(SocketEvents.MESSAGE, {
        author,
        where,
        message,
      });
      pushNewMessage({
        author,
        where,
        message,
      });
    });
  }, []);

  const sendMessage = (message: string) => {
    console.log('sending message');
    socket.emit(SocketEvents.MESSAGE, {
      to: activeChat,
      message,
    });
  };

  const handleChangeActiveChat = (newActiveChat: string) => {
    if (newActiveChat.startsWith('@')) {
      if (!channelsMessages[newActiveChat as ChannelId]) {
        setChannelsMessages((prevState) => ({
          ...prevState,
          [newActiveChat]: {
            messages: [],
          },
        }));
      }
    } else if (!directMessages[newActiveChat]) {
      setDirectMessages((prevState) => ({
        ...prevState,
        [newActiveChat]: {
          messages: [],
        },
      }));
    }

    setActiveChat(newActiveChat);
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
            <h4>Channels:</h4>
            {channels && Object.keys(channels)
              .map((channel: string) => <Button key={channel} onClick={() => handleChangeActiveChat(channel)} variant={`${activeChat !== channel ? 'outline-' : ''}primary`}>{channel}</Button>)}
          </div>
        </Col>
        <Col sm={6} xs={12}>
          <div className={styles.chat}>
            <h3>
              {activeChat ? `Chatting with ${activeChat}` : 'Please choose some one you want from start a chat'}
            </h3>
            {activeChat
            && (
              <Messenger
                myId={myId}
                chatMessages={activeChat.startsWith('@') ? channelsMessages[activeChat as ChannelId].messages : directMessages[activeChat].messages}
                sendMessage={sendMessage}
              />
            )}
          </div>
        </Col>
        <Col sm={3} xs={12}>
          <div className={styles.users}>
            {users?.length < 1 ? <h3>No users...</h3>
              : (
                <div>
                  <h3>Users</h3>
                  <ul>
                    {users.map((user) => (
                      <li
                        key={user}
                      >
                        <Button onClick={() => handleChangeActiveChat(user)} variant={`${activeChat !== user ? 'outline-' : ''}primary`}>
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
