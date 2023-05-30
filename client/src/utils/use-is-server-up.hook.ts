import { useServerStatusStore } from '@zustand';

export const useIsServerUp = () => {
  const { serverStatus } = useServerStatusStore();
  return serverStatus !== null && serverStatus.status === 'SpaceTraders is currently online and available to play';
};