import React from 'react';
import './app-layout.styles.scss';
import { AgentCreator, FactionsPanel, NetworkPanel, ServerStatusPanel, WindowsBar } from '@features';

/**
 * Displays app grid and panels in proper sections.
 */
export const AppLayout = () => {
  return <div className="app-grid">
    <div className="bar-row">
      <WindowsBar/>
    </div>
    <div className="big-windows-section">
      <FactionsPanel/>
      <AgentCreator/>
    </div>
    <div className="small-windows-section">
      <NetworkPanel/>
      <ServerStatusPanel/>
    </div>
  </div>;
};