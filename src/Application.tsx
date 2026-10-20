import { useSnackbar } from 'notistack';
import React, { FC, useCallback, useEffect, useEffectEvent, useState } from 'react';

import 'tippy.js/dist/tippy.css';

import './index.css';
import Chat from './components/Chat/Chat';
import SignIn from './components/SignIn/SignIn';
import { getMessages, initAxios, openChat, sendMessage } from './data';
import { IContactInfoData, IMessage } from './types/types';
import { convertIncomingMessages, filterIncomingMessages } from './utils/utils';

const Application: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  initAxios(enqueueSnackbar);

  const [idInstance, setIdInstance] = useState<string>('');
  const [apiTokenInstance, setApiTokenInstance] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [chatId, setChatId] = useState<string>('');
  const [exists, setExists] = useState(false);
  const [contactInfo, setContactInfo] = useState<IContactInfoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [needListenNotifications, setNeedListenNotifications] = useState(false);

  const onReady = useCallback((instance: string, token: string, phone: string) => {
    setLoading(true);
    setIdInstance(instance);
    setApiTokenInstance(token);
    setPhoneNumber(phone);
    void openChat(instance, token, phone).then((res) => {
      setExists(res.exist);
      setChatId(res.chatId);
      setContactInfo(res?.contactInfo ?? null);
      setNeedListenNotifications(true);
      setLoading(false);
    });
  }, []);

  const onDisconnectChat = useCallback(() => {
    setChatId('');
    setExists(false);
    setNeedListenNotifications(false);
  }, []);

  const onSendMessage = useCallback(
    (message: string) => {
      if (message && chatId && idInstance && apiTokenInstance) {
        void sendMessage(idInstance, apiTokenInstance, chatId, message).then((res) => {
          const mess: IMessage = { direction: 'outgoing', idMessage: res?.idMessage ?? '0', textMessage: message, timestamp: Date.now().valueOf() };
          setMessages([...messages, mess]);
        });
      }
    },
    [apiTokenInstance, chatId, idInstance, messages],
  );

  const updateNeedListenNotifications = useEffectEvent(() => {
    setNeedListenNotifications(true);
  });

  const listenNotifications = useEffectEvent(() => {
    void getMessages(idInstance, apiTokenInstance).then((res) => {
      const msgs = convertIncomingMessages(filterIncomingMessages(res, chatId));
      setMessages([...messages, ...msgs]);
      setNeedListenNotifications(false);
    });
  });

  useEffect(() => {
    if (!needListenNotifications && exists) {
      window.setTimeout(updateNeedListenNotifications, 15000);
    }
  }, [exists, needListenNotifications]);

  useEffect(() => {
    if (needListenNotifications && exists) {
      listenNotifications();
    }
  }, [exists, needListenNotifications]);

  if (chatId && exists && !loading) {
    return <Chat chatId={chatId} contactInfo={contactInfo} messages={messages} onDisconnect={onDisconnectChat} onSend={onSendMessage} />;
  }

  return <SignIn loading={loading} instance={idInstance} tokenInstance={apiTokenInstance} phone={phoneNumber} onReady={onReady} />;
};

export default Application;
