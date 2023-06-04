import { getServerStatus } from '@utils';
import { useServerStatusStore } from '@zustand';

export const refreshServerStatus = async () => {
  const serverStatus = await getServerStatus();
  useServerStatusStore.setState({serverStatus: serverStatus});
};