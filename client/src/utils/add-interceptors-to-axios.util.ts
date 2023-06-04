import axios, { InternalAxiosRequestConfig } from 'axios';
import { useAgentTokenStore } from '@zustand';

/**
 * Adds API authorization token to request headers if possible.
 */
const authorizeRequest = (config: InternalAxiosRequestConfig) => {
  const agentToken = useAgentTokenStore.getState().agentToken;
  if (agentToken !== null) {
    config.headers.set('Authorization', `Bearer ${agentToken}`);
  }
};

/**
 * Adds authorization headers.
 * Expected to be called once.
 */
export const addInterceptorsToAxios = () => {
  axios.interceptors.request.use((config) => {
    authorizeRequest(config)
    return config;
  }, (error) => {
    console.error(error);
    return Promise.reject(error);
  });
};