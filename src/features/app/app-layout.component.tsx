import React, { JSX } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from '@shared';
import './app-layout.styles.scss';
import {
  AgentIdentityPanel,
  ContractsPanel,
  FactionsPanel,
  NetworkPanel,
  ServerStatusPanel,
  WindowsBar,
  LeaderboardsPanel,
  AgentDetailsPanel,
  MarketplacePanel,
  AgentTransactionsPanel
} from '@features';
import { Panel, PanelSections, useOpenedPanelsStore } from '@zustand';
import { PanelComponentsIds } from '@constants';
import { ShipsPanel } from '@features/panels/ships-panel/ships-panel.component';

const displayPanels = (panels: Array<Panel>) =>
  panels
  .reduce(reduceToExistingPanels, [])
  .map(displayPanel);

const reduceToExistingPanels = (existingPanels: Array<Panel>, panel: Panel) => {
  const Component = FEATURE_ID_TO_COMPONENT[panel.componentId] as PanelComponent | undefined;
  if (Component) {
    existingPanels.push(panel);
  }
  return existingPanels;
};

const displayPanel = (panel: Panel, index: number) => {
  const Component = FEATURE_ID_TO_COMPONENT[panel.componentId] as PanelComponent;
  return <Component panelId={panel.panelId} panelIndex={index} key={index} />;
};

/**
 * Displays app grid and panels in proper sections.
 */
export const AppLayout = () => {
  const { mainSectionPanels, sideSectionPanels } = useOpenedPanelsStore();

  return <div className="app-grid">
    <DragDropContext onDragEnd={useOpenedPanelsStore.getState().restructurePanels}>
      <div className="bar-row">
        <WindowsBar />
      </div>
      <div className="main-section">
        <Droppable droppableId={PanelSections.MAIN_SECTION}>
          {displayPanels(mainSectionPanels)}
        </Droppable>
      </div>
      <div className="side-section">
        <Droppable droppableId={PanelSections.SECONDARY_SECTION}>
          {displayPanels(sideSectionPanels)}
        </Droppable>
      </div>
    </DragDropContext>
  </div>;
};

type PanelComponent = (props: {
  panelId: string
  panelIndex: number
}) => JSX.Element

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
  [PanelComponentsIds.LEADERBOARDS]: LeaderboardsPanel,
  [PanelComponentsIds.AGENT_DETAILS]: AgentDetailsPanel,
  [PanelComponentsIds.MARKETPLACE]: MarketplacePanel,
  [PanelComponentsIds.AGENT_TRANSACTIONS]: AgentTransactionsPanel,
  [PanelComponentsIds.SHIPS]: ShipsPanel,
};