import { OnDragEndResponder } from 'react-beautiful-dnd';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PanelComponentsIds } from '@constants';
import { Panel, PanelPlacement } from './panel.interface';
import { PanelSections } from '@zustand/stores/opened-panels/panel-sections.enum';

interface OpenedPanelsStore {
  mainSectionPanels: Array<Panel>;
  sideSectionPanels: Array<Panel>;
  floatingPanels: Array<Panel>;
  openPanel: (id: Panel['componentId']) => void;
  closePanel: (id: Panel['panelId']) => void;
  /**
   * Restructure main and side sections panels based on drag-n-drop action.
   */
  restructurePanels: OnDragEndResponder;
}

/**
 * Store that contains info on exact location of panels and functions to change theirs location.
 */
export const useOpenedPanelsStore = create<OpenedPanelsStore>()(persist((set, get) => ({
  mainSectionPanels: [],
  sideSectionPanels: [],
  floatingPanels: [],
  openPanel: (componentId) => {
    const placement = COMPONENT_ID_TO_DEFAULT_PLACEMENT[componentId];
    const newPanel: Panel = {
      // TODO panelId should be something obscure for floating/non-singleton panels, e.g. `${new Date().getTime()}`
      panelId: componentId,
      componentId,
      placement,
    };
    if (placement === 'main-section') {
      set({ mainSectionPanels: [newPanel, ...get().mainSectionPanels] });
    } else if (placement === 'side-section') {
      set({ sideSectionPanels: [newPanel, ...get().sideSectionPanels] });
    } else { // then its floating panels
      set({ floatingPanels: get().floatingPanels.concat(newPanel) });
    }
  },
  closePanel: (id) => {
    const { mainSectionPanels, sideSectionPanels, floatingPanels } = get();
    let panelIndex: number;
    panelIndex = mainSectionPanels.findIndex((panel) => panel.panelId === id);
    if (panelIndex !== -1) {
      const panels = [...mainSectionPanels];
      panels.splice(panelIndex, 1);
      set({ mainSectionPanels: panels });
      return;
    }
    panelIndex = sideSectionPanels.findIndex((panel) => panel.panelId === id);
    if (panelIndex !== -1) {
      const panels = [...sideSectionPanels];
      panels.splice(panelIndex, 1);
      set({ sideSectionPanels: panels });
      return;
    }
    panelIndex = floatingPanels.findIndex((panel) => panel.panelId === id);
    if (panelIndex !== -1) {
      const panels = [...floatingPanels];
      panels.splice(panelIndex, 1);
      set({ floatingPanels: panels });
      return;
    }
  },
  restructurePanels: (actionResult) => {
    if (!actionResult.destination) return;
    const { droppableId: sourceSection, index: sourceIndex } = actionResult.source;
    const { droppableId: destinationSection, index: destinationIndex } = actionResult.destination;
    const isSourceSectionMain = sourceSection === PanelSections.MAIN_SECTION; // else assume its SIDE_SECTION
    const isDestinationSectionMain = destinationSection === PanelSections.MAIN_SECTION; // else assume its SIDE_SECTION

    // update source section panels (remove panel that was dragged away)
    let sourcePanels: Array<Panel>;
    if (isSourceSectionMain) {
      sourcePanels = [...get().mainSectionPanels];
    } else {
      sourcePanels = [...get().sideSectionPanels];
    }
    const panel = sourcePanels.splice(sourceIndex, 1)[0];

    // update destination section panels (add panel that was dragged in)
    let destinationPanels: Array<Panel> = [];
    if (sourceSection === destinationSection) {
      sourcePanels.splice(destinationIndex, 0, panel);
    } else {
      destinationPanels = isDestinationSectionMain
        ? [...get().mainSectionPanels]
        : [...get().sideSectionPanels];
      destinationPanels.splice(destinationIndex, 0, panel);
    }

    // finally, update store
    if (isSourceSectionMain) {
      set({ mainSectionPanels: sourcePanels });
    } else {
      set({ sideSectionPanels: sourcePanels });
    }
    if (sourceSection !== destinationSection) {
      if (isDestinationSectionMain) {
        set({ mainSectionPanels: destinationPanels });
      } else {
        set({ sideSectionPanels: destinationPanels });
      }
    }
  },
}), { name: 'opened-panels-store', version: 4 }));

/**
 * Default placement for feature panels.
 *
 * Bugs notice:
 * Facing weird bugs if placing these constants under @constants.
 * For some reason it can not import EXACTLY AgentIdentityPanel from that root via @features.
 * And other panels (like NetworkPanel) need to be imported with precise "@feature/panels/.." import.
 */
const COMPONENT_ID_TO_DEFAULT_PLACEMENT: {
  [key in PanelComponentsIds]: PanelPlacement
} = {
  [PanelComponentsIds.AGENT_ID]: 'main-section',
  [PanelComponentsIds.FACTIONS]: 'main-section',
  // Side panels below
  [PanelComponentsIds.NETWORK]: 'side-section',
  [PanelComponentsIds.SERVER_STATUS]: 'side-section',
  [PanelComponentsIds.CONTRACTS]: 'side-section',
  [PanelComponentsIds.LEADERBOARDS]: 'side-section',
  [PanelComponentsIds.AGENT_DETAILS]: 'side-section',
};