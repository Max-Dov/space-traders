import React, { JSX } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
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
      <div className="big-windows-section">
        <Droppable droppableId={PanelSections.MAIN_SECTION}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{ backgroundColor: snapshot.isDraggingOver ? '#353535' : 'transparent' }}
              {...provided.droppableProps}
            >
              {
                mainSectionPanels
                .reduce((totalPanels, panel) => {
                  const Component = FEATURE_ID_TO_COMPONENT[panel.componentId] as ComponentWithPanelId | undefined;
                  if (Component) {
                    totalPanels.push(panel);
                  }
                  return totalPanels;
                }, [] as Array<Panel>)
                .map((panel, index) => {
                  const Component = FEATURE_ID_TO_COMPONENT[panel.componentId as PanelComponentsIds] as ComponentWithPanelId;
                  return <Draggable draggableId={`${panel.panelId}`} index={index} key={index}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Component panelId={panel.panelId} />
                        </div>
                      );
                    }}
                  </Draggable>;
                })
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <div className="small-windows-section">
        <Droppable droppableId={PanelSections.SECONDARY_SECTION}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{ backgroundColor: snapshot.isDraggingOver ? '#353535' : 'transparent' }}
              {...provided.droppableProps}
            >
              {
                sideSectionPanels
                .reduce((totalPanels, panel) => {
                  const Component = FEATURE_ID_TO_COMPONENT[panel.componentId] as ComponentWithPanelId | undefined;
                  if (Component) {
                    totalPanels.push(panel);
                  }
                  return totalPanels;
                }, [] as Array<Panel>)
                .map((panel, index) => {
                  const Component = FEATURE_ID_TO_COMPONENT[panel.componentId as PanelComponentsIds] as ComponentWithPanelId;
                  return <Draggable draggableId={`draggable-${index}`} index={index} key={index}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Component panelId={panel.panelId} />
                        </div>
                      );
                    }}
                  </Draggable>;
                })
              }
              {provided.placeholder}
            </div>
          )}
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