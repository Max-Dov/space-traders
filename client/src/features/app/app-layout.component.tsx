import React from 'react';
import './app-layout.styles.scss';
import { WindowsBar } from '@features';
import { useOpenedPanelsStore } from '@zustand';

/**
 * Displays app grid and panels in proper sections.
 */
export const AppLayout = () => {
  const { openedPanels } = useOpenedPanelsStore();
  const mainSectionPanels = openedPanels.filter(panel => panel.isMainSectionPanel);
  const secondarySectionPanels = openedPanels.filter(panel => !panel.isMainSectionPanel);

  return <div className="app-grid">
    <div className="bar-row">
      <WindowsBar />
    </div>
    <div className="big-windows-section">
      {mainSectionPanels.map(panel => {
        const Component = panel.component;
        return <Component panelId={panel.id} key={panel.id} />;
      })}
    </div>
    <div className="small-windows-section">
      {secondarySectionPanels.map(panel => {
        const Component = panel.component;
        return <Component panelId={panel.id} key={panel.id} />;
      })}
    </div>
  </div>;
};