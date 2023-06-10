import { getServerStatus } from '@utils';
import { useServerStatusStore } from '@zustand';

export const refreshServerStatus = async () => {
  const serverStatus = await getServerStatus();
  if (serverStatus !== null) {
    useServerStatusStore.setState({ serverStatus });
  }
};