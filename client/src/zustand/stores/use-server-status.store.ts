import { create } from 'zustand';
import { ServerStatus } from '@types';

interface ServerStatusStore {
  serverStatus: ServerStatus | null;
}

export const useServerStatusStore = create<ServerStatusStore>()(() => ({
  serverStatus: null,
}));