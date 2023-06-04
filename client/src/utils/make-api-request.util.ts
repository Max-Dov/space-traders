import axios, { AxiosError, Method } from 'axios';
import { useNetworkStore } from '@zustand';

interface RequestParams {
  method: Method;
  url: string;
  data?: any;
}

/**
 * Axios wrapper for making api requests with additional logging into network panel.
 */
export const makeApiRequest = async <ResponseType = unknown>({
  method,
  url,
  data,
}: RequestParams): Promise<ResponseType | null> => {
  const requestLog = logToNetworkPanel(method, url);
  try {
    const response = await axios.request<ResponseType>({
      method,
      url,
      data,
    });
    const responseCode = response.status;
    useNetworkStore.getState().updateRequest({ ...requestLog, response: responseCode });
    return response.data;
  } catch (error) {
    console.log(JSON.stringify(
      error
    ))
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
  const id = new Date().getTime();
  const shortenedUrl = url?.length === 30 ? '/server-status' : url?.slice(30);
  const newRequestLog = {
    id,
    method: method as string,
    url: shortenedUrl as string,
    response: null,
  };
  useNetworkStore.getState().addRequest(newRequestLog);
  return newRequestLog;
};