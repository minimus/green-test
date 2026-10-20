import axios, { AxiosError } from 'axios';

import { ICheckData, IContactInfoData, IIncomingMsgCountData, IIncomingMsgData, IOpenChatData, IOutgoingMessageResponse } from '../types/types';

export const checkAccount = async (id: string, token: string, phone: string): Promise<ICheckData> => {
  if (id && token && phone) {
    try {
      const res = await axios.post<ICheckData>(`/waInstance${id}/checkAccount/${token}`, { phoneNumber: phone });
      return res.data;
    } catch (error: unknown) {
      throw new Error((error as AxiosError).message);
    }
  } else {
    return {
      exist: false,
      chatId: '',
      fromCache: false,
    };
  }
};

export const getContactInfo = async (id: string, token: string, chatId: string): Promise<IContactInfoData | null> => {
  if (id && token && chatId) {
    try {
      const res = await axios.post<IContactInfoData>(`/waInstance${id}/getContactInfo/${token}`, { chatId });
      return res.data;
    } catch (error: unknown) {
      throw new Error((error as AxiosError).message);
    }
  } else {
    return null;
  }
};

export const getMessagesCount = async (id: string, token: string): Promise<IIncomingMsgCountData> => {
  if (id && token) {
    try {
      const res = await axios.get<IIncomingMsgCountData>(`/waInstance${id}/getWebhooksCount/${token}`);
      return res.data;
    } catch (error: unknown) {
      throw new Error((error as AxiosError).message);
    }
  } else {
    return { count: 0 };
  }
};

export const getMessage = async (id: string, token: string): Promise<IIncomingMsgData | null> => {
  if (id && token) {
    try {
      const res = await axios.get<IIncomingMsgData>(`/waInstance${id}/receiveNotification/${token}`);
      const data = res.data;
      const receiptId = data.receiptId;
      await axios.delete(`/waInstance${id}/deleteNotification/${token}/${receiptId}`);
      return data;
    } catch (error: unknown) {
      throw new Error((error as AxiosError).message);
    }
  } else {
    return null;
  }
};

export const getMessages = async (id: string, token: string): Promise<IIncomingMsgData[]> => {
  if (id && token) {
    try {
      const { count } = await getMessagesCount(id, token);
      if (count) {
        let msgs: IIncomingMsgData[] = [];
        let i = count;
        while (i > 0) {
          const msg = await getMessage(id, token);
          if (msg !== null) {
            msgs = [...msgs, msg];
          }
          i -= 1;
        }
        return msgs;
      } else {
        return [];
      }
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log((error as AxiosError).message);
      return [];
    }
  } else {
    return [];
  }
};

export const sendMessage = async (id: string, token: string, chatId: string, message: string): Promise<IOutgoingMessageResponse | null> => {
  if (id && token && chatId && message) {
    try {
      const res = await axios.post<IOutgoingMessageResponse>(`/waInstance${id}/sendMessage/${token}`, { chatId, message });
      return res.data;
    } catch (error: unknown) {
      throw new Error((error as AxiosError).message);
    }
  } else {
    return null;
  }
};

export const openChat = async (id: string, token: string, phone: string): Promise<IOpenChatData> => {
  if (id && token && phone) {
    try {
      const { chatId, exist } = await checkAccount(id, token, phone);
      if (exist) {
        const contactInfo = await getContactInfo(id, token, chatId);
        return { exist, chatId, contactInfo: contactInfo ?? null };
      } else {
        return { exist, chatId, contactInfo: null };
      }
    } catch (error: unknown) {
      throw new Error((error as AxiosError).message);
    }
  }
  return { exist: false, chatId: '', contactInfo: null };
};
