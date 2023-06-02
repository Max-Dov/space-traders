import React from 'react';
import { ServerStatus, AgentCreator } from '@features';

export const App = () => {

  return <div className="app">
    <ServerStatus/>
    <AgentCreator/>
  </div>;
};