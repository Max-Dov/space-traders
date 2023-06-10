import React, { JSX } from 'react';
import './app-layout.styles.scss';
import {
  AgentIdentityPanel,
  ContractsPanel,
  FactionsPanel,
  NetworkPanel,
  ServerStatusPanel,
  WindowsBar,
  LeaderBoardPanel
} from '@features';
import { useOpenedPanelsStore } from '@zustand';
import { PanelComponentsIds } from '@constants';

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
        const Component = FEATURE_ID_TO_COMPONENT[panel.componentId] as ComponentWithPanelId;
        return <Component panelId={panel.panelId} key={panel.panelId} />;
      })}
    </div>
    <div className="small-windows-section">
      {secondarySectionPanels.map(panel => {
        const Component = FEATURE_ID_TO_COMPONENT[panel.componentId] as ComponentWithPanelId;
        return <Component panelId={panel.panelId} key={panel.panelId} />;
      })}
    </div>
  </div>;
};

type ComponentWithPanelId = ({ panelId }: { panelId: string }) => JSX.Element

/**
 * Facing weird bugs if placing these constants under @constants.
 * For some reason it can not import EXACTLY AgentIdentityPanel from that root via @features.
 * And other panels (like NetworkPanel) need to be imported with precise "@feature/panels/.." import.
 */
export const FEATURE_ID_TO_COMPONENT = {
  [PanelComponentsIds.AGENT_ID]: AgentIdentityPanel,
  [PanelComponentsIds.NETWORK]: NetworkPanel,
  [PanelComponentsIds.FACTIONS]: FactionsPanel,
  [PanelComponentsIds.SERVER_STATUS]: ServerStatusPanel,
  [PanelComponentsIds.CONTRACTS]: ContractsPanel,
  [PanelComponentsIds.LEADER_BOARD]: LeaderBoardPanel,
};