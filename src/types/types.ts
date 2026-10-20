import { ReactNode } from 'react';

export interface ITextInput {
  id: string;
  caption: string;
  tooltip?: string | ReactNode;
  contentType?: string;
  value: unknown;
  prefix?: string | ReactNode;
  suffix?: string | ReactNode;
  size?: 'xSmall' | 'small' | 'half' | 'big' | 'fill';
  big?: boolean;
  inside?: boolean;
  disabled?: boolean;
  button?: boolean;
  onChange?: (val: string | number) => void | undefined;
}

export interface ICheckData {
  exist: boolean;
  chatId: string;
  fromCache: boolean;
}

export interface IContactInfoData {
  avatar: string;
  name: string;
  contactName: string;
  chatId: string;
  chatType: string;
  lastSeen: number;
  phoneNumber: number;
  phoneNumberTimestamp: number;
}

export interface IIncomingMsgCountData {
  count: number;
}

export interface IIncomingMsgData {
  receiptId: number;
  body: {
    typeWebhook: string;
    instanceData: {
      idInstance: number;
      wid: string;
      typeInstance: string;
    };
    timestamp: number;
    idMessage: string;
    senderData: {
      chatId: string;
      chatName: string;
      chatType: string;
      sender: string;
      senderName: string;
      senderType: string;
      senderContactName: string;
      senderPhoneNumber: number;
    };
    messageData: {
      typeMessage: string;
      textMessageData: {
        textMessage: string;
      };
    };
  };
}

export interface IMessage {
  direction: 'incoming' | 'outgoing';
  timestamp: number;
  idMessage: string;
  textMessage: string;
}

export interface IOutgoingMessageResponse {
  idMessage: string;
}

export interface IOpenChatData {
  exist: boolean;
  chatId: string;
  contactInfo?: IContactInfoData | null;
}
