import React from 'react';
import { ServerStatusPanel, AgentCreator, NetworkPanel, FactionsPanel } from '@features';

export const App = () => {

  return <div className="app">
    <div style={{ display: 'flex' }}>
      <FactionsPanel/>
      <AgentCreator/>
      <NetworkPanel/>
    </div>
    <div style={{ display: 'flex' }}>
      <ServerStatusPanel/>
    </div>
  </div>;
};