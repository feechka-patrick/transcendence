import React, { FC } from 'react';
import styles from './index.module.scss';

const Message: FC<{ text: string }> = ({ text }) => <div className={styles.message}>{text}</div>;

export default Message;
