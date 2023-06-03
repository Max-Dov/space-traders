import { ApiUrls } from '@constants/api-urls.constant';
import axios from 'axios';
import { ServerStatus } from '@types';

export const getServerStatus = (): Promise<ServerStatus> =>
  axios.get(ApiUrls.BASE_API_URL).then(response => response.data);

