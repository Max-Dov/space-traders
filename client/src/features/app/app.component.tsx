import React from 'react';
import { ServerStatus } from '@features/server-status/server-status.component';

export const App = () => {

  return <div className="app">
    <h1>Space Traders</h1>
    <ServerStatus/>
  </div>;
};