import React, { useEffect } from 'react';
import { AppLayout } from './app-layout.component';
import { cleanStoresOnServerRestart, refreshServerStatus, useServerStatusStore } from '@zustand';

export const App = () => {
  const { serverStatus } = useServerStatusStore();

  useEffect(() => {
    cleanStoresOnServerRestart();
  }, [serverStatus]);

  useEffect(() => {
    refreshServerStatus();
  }, []);

  return <div className="app">
    <AppLayout />
  </div>;
};