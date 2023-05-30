import { create } from 'zustand';
import { getServerStatus } from '@utils';
import { ServerStatus } from '@types';

interface ServerStatusStore {
  serverStatus: ServerStatus | null;
  refreshServerStatus: () => void;
}

export const useServerStatusStore = create<ServerStatusStore>((set) => ({
  serverStatus: null,
  refreshServerStatus: () => getServerStatus().then(serverStatus => {
    set({ serverStatus });
  }),
}));