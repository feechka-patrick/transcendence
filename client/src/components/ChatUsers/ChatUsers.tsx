import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { ActiveChat, UsersList } from '../../types';
import styles from './index.module.scss';

interface ChatUsersProps {
  activeChat: ActiveChat,
  users: UsersList,
  onClickUser: (userId: string) => void
}

const ChatUsers:FC<ChatUsersProps
> = ({ activeChat, users, onClickUser }) => (
  <div className={styles.users}>
    {users?.length < 1 ? <h3>No users...</h3>
      : (
        <div className={styles.items}>
          <h3>Users:</h3>
          {users.map((user) => (
            <Button
              key={user}
              onClick={() => onClickUser(user)}
              variant={`${activeChat !== user ? 'outline-' : ''}primary`}
              className="text-truncate"
            >
              {user}
            </Button>
          ))}
        </div>
      )}
  </div>
);

export default ChatUsers;
