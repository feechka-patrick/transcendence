import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import styles from './index.module.scss';
import { ChannelId, ChannelList, UserId } from '../../types';

interface ChatChannelsProps {
  channels:ChannelList,
  activeChat:ChannelId | UserId,
  onChannelClick: (channelId: string) => void
}

const ChatChannels: FC<ChatChannelsProps> = ({ channels, activeChat, onChannelClick }) => (
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
                  onClick={() => onChannelClick(channel)}
                  variant={`${activeChat !== channel ? 'outline-' : ''}primary`}
                >
                  {channel}
                </Button>
              ))}
          </div>
        </>
      )}

  </div>
);

export default ChatChannels;
