import { ApiUrls } from '@constants/api-urls.constant';
import axios from 'axios';

interface ServerStatus {
  /**
   * The current status of the game server.
   */
  status: string;
  /**
   * The current version of the API.
   */
  version: string;
  /**
   * The date and time when the game server was last reset.
   */
  resetDate: string;
}

export const getServerStatus = (): Promise<ServerStatus> => axios.get(ApiUrls.BASE_API_URL).then(response => response.data);

