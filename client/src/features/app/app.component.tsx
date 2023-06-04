import React from 'react';
import { ServerStatusPanel, AgentCreator } from '@features';

export const App = () => {

  return <div className="app">
    <ServerStatusPanel/>
    <AgentCreator/>
  </div>;
};