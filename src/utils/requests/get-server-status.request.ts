import { ApiUrls } from '@constants';
import { ServerStatus } from '@types';
import { makeApiRequest } from '@utils';

export const getServerStatus = (): Promise<ServerStatus | null> =>
  makeApiRequest({
    method: 'GET',
    url: ApiUrls.BASE_API_URL,
    omitAuthToken: true,
  });