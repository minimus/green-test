import React, { FC, useCallback, useState } from 'react';

import { UpIcon } from '../../../images/images';
import ToolButton from '../../buttons/ToolButton';
import TextInput from '../../inputs/TextInput';

interface Props {
  onSend?: (message: string) => void;
}

const Sender: FC<Props> = (props) => {
  const { onSend } = props;

  const [message, setMessage] = useState('');

  const onChange = useCallback((val: string | number) => {
    setMessage(val as string);
  }, []);

  const onSendClick = useCallback(() => {
    onSend?.(message);
    setMessage('');
  }, [message, onSend]);

  return (
    <div className="sender-root">
      <TextInput
        id="sender"
        caption="Сообщение"
        value={message}
        suffix={
          <ToolButton tooltip="Отправить сообщение" tooltipPlacement="top" disabled={!message} onClick={onSendClick}>
            <UpIcon />
          </ToolButton>
        }
        size="fill"
        onChange={onChange}
      />
    </div>
  );
};

export default Sender;
