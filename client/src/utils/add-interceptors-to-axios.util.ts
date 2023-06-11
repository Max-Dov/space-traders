import axios, { InternalAxiosRequestConfig } from 'axios';
import { useAgentsTokensStore } from '@zustand';

/**
 * Adds API authorization token to request headers if possible.
 */
const authorizeRequest = (config: InternalAxiosRequestConfig) => {
  const agentToken = useAgentsTokensStore.getState().agentToken;
  if (agentToken !== null) {
    config.headers.set('Authorization', `Bearer ${agentToken}`);
  }
};

const urlParamsRegexp = /(?<paramPlaceholder>:(?<paramName>[a-zA-Z]+))/g; // catches following example: ":agentSymbol"

/**
 * Adds url params to request URL.
 */
const addUrlParams = (config: InternalAxiosRequestConfig) => {
  const params = config.params;
  const url = config.url;
  if (!url || Object.entries(params).length === 0) return;
  const newUrl = url.replaceAll(urlParamsRegexp, (
    match,
    _paramPlaceholder,
    paramName,
  ) => {
    const replacement = params[paramName];
    if (!replacement) {
      console.warn('Weird: could not find url param replacement.', { url, params });
      return match;
    }
    return replacement;
  });
  config.url = newUrl;
};

/**
 * Adds authorization headers.
 * Expected to be called once.
 */
export const addInterceptorsToAxios = () => {
  axios.interceptors.request.use((config) => {
    authorizeRequest(config);
    addUrlParams(config);
    return config;
  }, (error) => {
    console.error(error);
    return Promise.reject(error);
  });
};