import React from 'react';
import { ServerStatusPanel, AgentCreator, NetworkPanel, FactionsPanel } from '@features';

export const App = () => {

  return <div className="app">
    <ServerStatusPanel/>
    <div style={{ display: 'flex' }}>
      <AgentCreator/>
      <FactionsPanel/>
      <NetworkPanel/>
    </div>
  </div>;
};