import { Avatar } from '@mui/material';
import React, { FC } from 'react';

import { CloseIcon } from '../../../images/images';
import { IContactInfoData } from '../../../types/types';
import ToolButton from '../../buttons/ToolButton';

interface Props {
  contactInfo: IContactInfoData | null;
  onDisconnect?: () => void;
}

const ContactInfo: FC<Props> = (props) => {
  const { contactInfo, onDisconnect } = props;
  const { avatar, contactName, name } = contactInfo ?? {};

  return (
    <div className="contact-info-root">
      <Avatar src={avatar} alt={contactName ?? name} sx={{ width: 56, height: 56 }} />
      <div>{contactName ?? name ?? 'Аноним'}</div>
      <ToolButton tooltip="Покинуть чат" tooltipPlacement="bottom" onClick={onDisconnect}>
        <CloseIcon width={32} height={32} />
      </ToolButton>
    </div>
  );
};

export default ContactInfo;
