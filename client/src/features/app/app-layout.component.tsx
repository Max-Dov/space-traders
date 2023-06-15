import React, { JSX } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable, Draggable } from '@shared';
import './app-layout.styles.scss';
import {
  AgentIdentityPanel,
  ContractsPanel,
  FactionsPanel,
  NetworkPanel,
  ServerStatusPanel,
  WindowsBar,
  LeaderBoardPanel,
  AgentDetailsPanel,
} from '@features';
import { Panel, PanelSections, useOpenedPanelsStore } from '@zustand';
import { PanelComponentsIds } from '@constants';

const displayPanels = (panels: Array<Panel>) =>
  panels.reduce((totalPanels, panel) => {
    const Component = FEATURE_ID_TO_COMPONENT[panel.componentId] as ComponentWithPanelId | undefined;
    if (Component) {
      totalPanels.push(panel);
    }
    return totalPanels;
  }, [] as Array<Panel>)
  .map((panel, index) => {
    const Component = FEATURE_ID_TO_COMPONENT[panel.componentId as PanelComponentsIds] as ComponentWithPanelId;
    return <Draggable draggableId={`${panel.panelId}`} index={index} key={index} className="draggable-panel">
      <Component panelId={panel.panelId} />
    </Draggable>;
  });

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
  [PanelComponentsIds.LEADERBOARDS]: LeaderBoardPanel,
  [PanelComponentsIds.AGENT_DETAILS]: AgentDetailsPanel,
};