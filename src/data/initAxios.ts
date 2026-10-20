import axios, { AxiosError, AxiosResponse } from 'axios';
import { EnqueueSnackbar } from 'notistack';

export const initAxios = (enqueueSnackbar: EnqueueSnackbar) => {
  axios.defaults.baseURL = 'https://api.green-api.com';
  axios.defaults.timeout = 10000;
  axios.defaults.withCredentials = false;

  axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      enqueueSnackbar(error?.message ?? 'Something went wrong', { variant: 'error' });
      return Promise.reject(error);
    },
  );
};
