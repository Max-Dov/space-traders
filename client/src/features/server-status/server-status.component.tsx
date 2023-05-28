import React, { useEffect } from 'react';
import './server-status.styles.scss';
import { useServerStatusStore } from '@zustand';

export const ServerStatus = () => {
  const { serverStatus, refreshServerStatus } = useServerStatusStore();

  useEffect(() => {
    refreshServerStatus();
  }, []);

  return <section className="server-status">
    <button onClick={refreshServerStatus}>Refresh</button>
    {serverStatus &&
        <>
            <p>Status: {serverStatus.status}</p>
            <p>Version: {serverStatus.version}</p>
            <p>Big bang date: {serverStatus.resetDate}</p>
            <p>Next big bang date: {serverStatus.serverResets.next}</p>
        </>}
  </section>;

};