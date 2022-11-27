import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {
  Col, Container, Row,
} from 'react-bootstrap';
import Messenger from '../components/Messenger/Messenger';
import {
  SocketEvents, ChannelsMap, DirectMessagesMap, ChannelId, UserId, ChatMessage, ChannelList, UsersList,
} from '../types';
import ChatChannels from '../components/ChatChannels/ChatChannels';
import ChatUsers from '../components/ChatUsers/ChatUsers';

const socket = io('http://localhost:5000', { path: '/chat-socket' });

const Chat = () => {
  // TODO - move to redux
  const [channelsMessages, setChannelsMessages] = useState<ChannelsMap>({});
  const [directMessages, setDirectMessages] = useState<DirectMessagesMap>({});
  const [activeChat, setActiveChat] = useState<ChannelId | UserId>('');

  const [myId, setMyId] = useState<string>('');
  const [users, setUsers] = useState<UsersList>([]);
  const [channels, setChannels] = useState<ChannelList>({});

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
    // TODO - use custom hook here https://dev.to/droidmakk/custom-hooks-and-sockets-2i56
    socket.on(SocketEvents.REGISTRATION, ({ myIdData }) => {
      setMyId(myIdData);
      setUsers(users.filter((user: string) => user !== myId));
    });

    socket.on(SocketEvents.LIST, ({
      usersData,
      channelsData,
    }) => {
      setUsers(usersData.filter((user: string) => user !== myId));
      setChannels(channelsData);
    });

    socket.on(SocketEvents.MESSAGE, ({
      author,
      where,
      message,
    }: ChatMessage) => {
      pushNewMessage({
        author,
        where,
        message,
      });
    });
  }, []);

  const sendMessage = (message: string) => {
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
    <Container fluid>
      <Row fluid className="no-gutters">
        <Col>
          <h1>
            My ID:
            {' '}
            {myId}
          </h1>
        </Col>
      </Row>
      <Row fluid className="no-gutters">
        <Col sm={2} xs={12} fluid>
          <ChatChannels
            channels={channels}
            activeChat={activeChat}
            onChannelClick={handleChangeActiveChat}
          />
        </Col>
        <Col sm={8} xs={12}>
          <Messenger
            activeChat={activeChat}
            myId={myId}
            channelsMessages={channelsMessages}
            directMessages={directMessages}
            sendMessage={sendMessage}
          />
        </Col>
        <Col sm={2} xs={12}>
          <ChatUsers
            activeChat={activeChat}
            users={users}
            onClickUser={handleChangeActiveChat}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default Chat;
