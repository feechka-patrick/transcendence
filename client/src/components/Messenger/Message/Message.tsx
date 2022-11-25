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
    styles.message,
    {
      [styles['message--self']]: isUserMessage,
    },
  )}
  >
    <Card.Body>
      <Card.Subtitle className={classNames('mb-2 t text-muted', styles.name)}>{author}</Card.Subtitle>
      <Card.Text>{message}</Card.Text>
    </Card.Body>
  </Card>
);

export default Message;
