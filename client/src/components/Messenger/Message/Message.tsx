import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import { ChatMessage } from '../../../types';

const Message: FC<{ chatMessage: ChatMessage, isUserMessage: boolean }> = (
  {
    chatMessage: { author, message },
    isUserMessage,
  },
) => (
  <div className={classNames(
    styles.message,
    { [styles['message-self']]: isUserMessage },
  )}
  >
    Author:
    {author}
    , message:
    {message}
  </div>
);

export default Message;
