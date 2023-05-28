import React from 'react';
import { getServerStatus, useApi } from '@utils';

export const App = () => {

  const serverStatus = useApi(getServerStatus);

  return <div className="app">
    <h1>Space Traders</h1>
    {serverStatus && <section>
        <p>Status: {serverStatus.status}</p>
        <p>Version: {serverStatus.version}</p>
        <p>Reset Date: {serverStatus.resetDate}</p>
    </section>}
  </div>;
};