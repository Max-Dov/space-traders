import { Method } from 'axios';

/**
 * Params for api requests via makeApiRequest function.
 */
export interface ApiRequestParams {
  method: Method;
  url: string;
  data?: any;
  listParams?: {
    limit: number;
    page: number;
  };
  urlParams?: {
    [key in string]: string | number;
  };
  /**
   * If true, then auth token would not be included in request headers.
   */
  omitAuthToken?: boolean;
}