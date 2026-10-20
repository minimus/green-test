import React, { FC } from 'react';

import { IContactInfoData, IMessage } from '../../types/types';

import ContactInfo from './components/ContactInfo';
import Messages from './components/Messages';
import Sender from './components/Sender';

interface Props {
  chatId: string;
  contactInfo: IContactInfoData | null;
  messages: IMessage[];
  onDisconnect?: () => void;
  onSend?: (message: string) => void;
}

const Chat: FC<Props> = (props) => {
  const { messages, contactInfo, onDisconnect, onSend } = props;

  return (
    <div className="chat-container">
      <div className="info-container">
        <ContactInfo contactInfo={contactInfo} onDisconnect={onDisconnect} />
      </div>
      <div className="messages-container">
        <Messages messages={messages} />
      </div>
      <div className="sender-container">
        <Sender onSend={onSend} />
      </div>
    </div>
  );
};

export default Chat;
