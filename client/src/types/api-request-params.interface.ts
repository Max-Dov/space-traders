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
  }
}