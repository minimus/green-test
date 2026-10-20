import { Button } from '@mui/material';
import React, { FC, useCallback, useEffect, useEffectEvent, useMemo, useState } from 'react';

import { AddIcon, CloseIcon } from '../../images/images';
import ToolButton from '../buttons/ToolButton';
import TextInput from '../inputs/TextInput';

interface Props {
  loading: boolean;
  instance?: string;
  tokenInstance?: string;
  phone?: string;
  onReady?: (instance: string, token: string, phone: string) => void;
}

const SignIn: FC<Props> = (props) => {
  const { loading, instance = '', tokenInstance = '', phone = '', onReady } = props;

  const [idInstance, setIdInstance] = useState<string>(instance);
  const [apiTokenInstance, setApiTokenInstance] = useState<string>(tokenInstance);
  const [phoneNumber, setPhoneNumber] = useState<string>(phone);

  const connectDisabled: boolean = useMemo(() => !idInstance || !apiTokenInstance || !phoneNumber, [apiTokenInstance, idInstance, phoneNumber]);

  const onReadyClick = useCallback(() => {
    onReady?.(idInstance, apiTokenInstance, phoneNumber);
  }, [apiTokenInstance, idInstance, onReady, phoneNumber]);

  const updateData = useEffectEvent(() => {
    if (idInstance !== instance) {
      // eslint-disable-next-line react-x/set-state-in-effect
      setIdInstance(instance);
    }
    if (apiTokenInstance !== tokenInstance) {
      // eslint-disable-next-line react-x/set-state-in-effect
      setApiTokenInstance(tokenInstance);
    }
    if (phoneNumber !== phone) {
      // eslint-disable-next-line react-x/set-state-in-effect
      setPhoneNumber(phone);
    }
  });

  useEffect(() => {
    updateData();
  }, [phone, instance, tokenInstance]);

  const onInstanceIdChange = useCallback((val: string | number) => {
    setIdInstance(val as string);
  }, []);

  const onApiTokenInstanceChange = useCallback((val: string | number) => {
    setApiTokenInstance(val as string);
  }, []);

  const onPhoneNumberChange = useCallback((val: string | number) => {
    setPhoneNumber(val as string);
  }, []);

  const onInstanceIdClearClick = useCallback(() => {
    setIdInstance('');
  }, []);

  const onApiTokenInstanceClearClick = useCallback(() => {
    setApiTokenInstance('');
  }, []);

  const onPhoneNumberClearClick = useCallback(() => {
    setPhoneNumber('');
  }, []);

  return (
    <div className="sign-in-container">
      <div className="sign-in-root">
        <TextInput
          id="instance-id"
          caption="Номер инстанса"
          value={idInstance}
          size="fill"
          suffix={
            <ToolButton color="alert" tooltip="Очистить" tooltipPlacement="top" disabled={!idInstance} onClick={onInstanceIdClearClick}>
              <CloseIcon />
            </ToolButton>
          }
          onChange={onInstanceIdChange}
        />
        <TextInput
          id="token-id"
          caption="Ключа доступа"
          value={apiTokenInstance}
          size="fill"
          suffix={
            <ToolButton color="alert" tooltip="Очистить" tooltipPlacement="top" disabled={!apiTokenInstance} onClick={onApiTokenInstanceClearClick}>
              <CloseIcon />
            </ToolButton>
          }
          onChange={onApiTokenInstanceChange}
        />
        <TextInput
          id="phone-id"
          caption="Номер телефона"
          value={phoneNumber}
          contentType="number"
          size="fill"
          prefix={
            <div className="input-prefix-root">
              <AddIcon height={20} width={20} />
            </div>
          }
          suffix={
            <ToolButton color="alert" tooltip="Очистить" tooltipPlacement="top" disabled={!phoneNumber} onClick={onPhoneNumberClearClick}>
              <CloseIcon />
            </ToolButton>
          }
          onChange={onPhoneNumberChange}
        />
        <div className="actions-panel">
          <Button variant="contained" size="medium" loading={loading} disabled={connectDisabled} onClick={onReadyClick}>
            Подключиться
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
