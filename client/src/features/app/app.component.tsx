import React from 'react';
import { ServerStatusPanel, AgentCreator, NetworkPanel } from '@features';

export const App = () => {

  return <div className="app">
    <ServerStatusPanel/>
    <div style={{ display: 'flex' }}>
      <AgentCreator/>
      <NetworkPanel/>
    </div>
  </div>;
};