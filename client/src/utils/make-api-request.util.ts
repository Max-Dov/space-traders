import axios, { AxiosError } from 'axios';
import { useNetworkStore } from '@zustand';
import { ApiRequestParams } from '@types';

/**
 * Axios wrapper for making api requests with additional logging into network panel.
 */
export const makeApiRequest = async <ResponseType = unknown>({
  method,
  url,
  data,
  listParams,
}: ApiRequestParams): Promise<ResponseType | null> => {
  const requestLog = logToNetworkPanel(method, url);
  try {
    const response = await axios.request<ResponseType>({
      method,
      url,
      data,
      params: listParams
    });
    const responseCode = response.status;
    useNetworkStore.getState().updateRequest({ ...requestLog, response: responseCode });
    return response.data;
  } catch (error) {
    const responseCode = (error as AxiosError).response?.status as number || 'no internet';
    const errorMessage = (
      (error as any).response?.data?.error?.message
      || (error as any).message) as string;
    useNetworkStore.getState().updateRequest({
      ...requestLog,
      response: responseCode,
      errorMessage,
    });
    return null;
  }
};

const logToNetworkPanel = (method: string, url: string) => {
  const shortenedUrl = url?.length === 30 ? '/server-status' : url?.slice(30);
  const id = `${shortenedUrl}@${new Date().getTime()}`;
  const newRequestLog = {
    id,
    method: method as string,
    url: shortenedUrl as string,
    response: null,
  };
  useNetworkStore.getState().addRequest(newRequestLog);
  return newRequestLog;
};