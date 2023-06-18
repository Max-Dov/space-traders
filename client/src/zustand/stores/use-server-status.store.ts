import { create } from 'zustand';
import { ServerStatus } from '@types';
import { persist } from 'zustand/middleware';

interface ServerStatusStore {
  serverStatus: ServerStatus | null;
  /**
   * Date for looking up when to clean agent-specific stores.
   * Note: variable should be managed only by cleanStoresOnServerRestart action.
   */
  lastResetDate: string | null;
}

export const useServerStatusStore = create<ServerStatusStore>()(persist((_set) => ({
  serverStatus: null,
  lastResetDate: null,
}), { name: 'server-status-store', version: 1 }));