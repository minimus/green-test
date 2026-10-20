import React, { FC } from 'react';

import { IMessage } from '../../../types/types';

interface Props {
  messages: IMessage[];
}

const Messages: FC<Props> = (props) => {
  const { messages } = props;

  return (
    <div className="messages-root">
      {messages.map(({ direction, timestamp, idMessage, textMessage }) => (
        <div key={idMessage} className={direction}>
          <div className="message-container">{textMessage}</div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
