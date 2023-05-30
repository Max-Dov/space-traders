import React from 'react';
import { ServerStatus, AgentCreator } from '@features';

export const App = () => {

  return <div className="app">
    <h1 className="display-font">Space Traders</h1>
    <ServerStatus/>
    <AgentCreator/>
  </div>;
};