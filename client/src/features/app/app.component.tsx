import React, { useEffect } from 'react';
import { AppLayout } from './app-layout.component';
import { cleanStoresOnServerRestart, useServerStatusStore } from '@zustand';

export const App = () => {
  const { serverStatus } = useServerStatusStore();

  useEffect(() => {
    cleanStoresOnServerRestart();
  }, [serverStatus]);

  return <div className="app">
    <AppLayout />
  </div>;
};