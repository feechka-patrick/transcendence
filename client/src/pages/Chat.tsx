import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {
  Button,
  Col, Container, Row, Stack,
} from 'react-bootstrap';
import classNames from 'classnames';
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
      setUsers(users.filter((user: string) => {
        console.log('user', user, 'myId', myId, 'myIdData', myIdData);
        return user !== myId;
      }));
    });

    socket.on(SocketEvents.LIST, ({
      usersData,
      channelsData,
    }) => {
      setUsers(usersData.filter((user: string) => {
        console.log('user', user, 'myId', myId);
        return user !== myId;
      }));
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
    <Container fluid className={styles.chatWrapper}>
      <Row fluid className="no-gutters">
        <Col>
          <h1>
            My ID:
            {' '}
            {myId}
          </h1>
        </Col>
      </Row>
      <Row fluid className={classNames('no-gutters', styles.chat)}>
        <Col sm={2} xs={12} fluid>
          <div className={styles.channels}>
            {!channels ? <h4>There is no channels...</h4>
              : (
                <>
                  <h4>Channels:</h4>
                  <div className={styles.channelsItems}>
                    {channels && Object.keys(channels)
                      .map((channel: string) => (
                        <Button
                          className="text-truncate"
                          key={channel}
                          onClick={() => handleChangeActiveChat(channel)}
                          variant={`${activeChat !== channel ? 'outline-' : ''}primary`}
                        >
                          {channel}
                        </Button>
                      ))}
                  </div>
                </>
              )}

          </div>
        </Col>
        <Col sm={8} xs={12}>
          <div className={classNames(styles.messenger, 'd-flex flex-shrink-0')}>
            {!activeChat
              ? <h3 className="text-center align-self-center px-5 w-100">Choose the user or channel to start chatting!</h3>
              : (
                <Messenger
                  myId={myId}
                  chatMessages={activeChat.startsWith('@') ? channelsMessages[activeChat as ChannelId].messages : directMessages[activeChat].messages}
                  sendMessage={sendMessage}
                />
              )}
          </div>
        </Col>
        <Col sm={2} xs={12}>
          <div className={styles.users}>
            {users?.length < 1 ? <h3>No users...</h3>
              : (
                <div className={styles.usersItems}>
                  <h3>Users:</h3>
                  {users.map((user) => (
                    <Button
                      key={user}
                      onClick={() => handleChangeActiveChat(user)}
                      variant={`${activeChat !== user ? 'outline-' : ''}primary`}
                      className="text-truncate"
                    >
                      {user}
                    </Button>
                  ))}
                </div>
              )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Chat;
