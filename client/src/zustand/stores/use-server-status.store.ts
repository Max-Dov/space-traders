import { create } from 'zustand';
import { ServerStatus } from '@types';
import { persist } from 'zustand/middleware';
import { SERVER_STATUS_STORE } from '@constants';

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
}), { name: 'server-status-store', version: SERVER_STATUS_STORE }));