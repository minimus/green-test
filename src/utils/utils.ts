import { IIncomingMsgData, IMessage } from '../types/types';

export const getSize = (val: string | undefined): string => {
  switch (val) {
    case 'xSmall':
      return '150px';
    case 'small':
      return '300px';
    case 'half':
      return '50%';
    case 'big':
      return '75%';
    case 'fill':
      return '100%';
    default:
      return '150px';
  }
};

export const filterIncomingMessages = (messages: IIncomingMsgData[] | null, chatId: string, msgType = 'textMessage'): IIncomingMsgData[] =>
  (messages ?? []).filter((item) => item?.body?.messageData?.typeMessage === msgType).filter((item) => item?.body?.senderData?.chatId === chatId);

export const convertIncomingMessages = (messages: IIncomingMsgData[] | null): IMessage[] =>
  (messages ?? []).map((item) => ({
    direction: 'incoming',
    timestamp: item?.body?.timestamp,
    idMessage: item?.body?.idMessage,
    textMessage: item?.body?.messageData?.textMessageData?.textMessage,
  }));
