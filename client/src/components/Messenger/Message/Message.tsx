import React, { FC } from 'react';
import classNames from 'classnames';
import { Card } from 'react-bootstrap';
import styles from './index.module.scss';
import { ChatMessage } from '../../../types';

const Message: FC<{ chatMessage: ChatMessage, isUserMessage: boolean }> = (
  {
    chatMessage: { author, message },
    isUserMessage,
  },
) => (
  <Card className={classNames(
    'text-white bg-primary',
    styles.message,
    {
      'text-white bg-secondary ml-auto': isUserMessage,
    },
  )}
  >
    <Card.Body>
      <Card.Subtitle className={classNames('mb-2', styles.name)}>{author}</Card.Subtitle>
      <Card.Text>{message}</Card.Text>
    </Card.Body>
  </Card>
);

export default Message;
