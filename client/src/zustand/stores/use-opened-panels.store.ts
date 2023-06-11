import { create } from 'zustand';
import { PanelComponentsIds } from '@constants';
import { persist } from 'zustand/middleware';

interface Panel {
  panelId: string;
  /**
   * React component representation of a panel.
   */
  componentId: PanelComponentsIds;
  isMainSectionPanel: boolean;
}

interface OpenedPanelsStore {
  openedPanels: Array<Panel>;
  openPanel: (id: Panel['componentId']) => void;
  closePanel: (id: Panel['panelId']) => void;
}

export const useOpenedPanelsStore = create<OpenedPanelsStore>()(persist((set, get) => ({
  openedPanels: [],
  openPanel: (componentId) => {
    const newPanel: Panel = {
      panelId: componentId || `${new Date().getTime()}`,
      componentId,
      isMainSectionPanel: FEATURE_ID_TO_IS_MAIN_SECTION[componentId],
    };
    const newPanels = [newPanel, ...get().openedPanels];
    set({ openedPanels: newPanels });
  },
  closePanel: (id) => {
    const panels = [...get().openedPanels];
    const panelIndex = panels.findIndex((panel) => panel.panelId === id);
    if (panelIndex !== -1) {
      panels.splice(panelIndex, 1);
      set({ openedPanels: panels });
    }
  },
}), { name: 'opened-panels-store', version: 1 }));

/**
 * Facing weird bugs if placing these constants under @constants.
 * For some reason it can not import EXACTLY AgentIdentityPanel from that root via @features.
 * And other panels (like NetworkPanel) need to be imported with precise "@feature/panels/.." import.
 */
export const FEATURE_ID_TO_IS_MAIN_SECTION = {
  [PanelComponentsIds.AGENT_ID]: true,
  [PanelComponentsIds.FACTIONS]: true,
  // Side panels below
  [PanelComponentsIds.NETWORK]: false,
  [PanelComponentsIds.SERVER_STATUS]: false,
  [PanelComponentsIds.CONTRACTS]: false,
  [PanelComponentsIds.LEADERBOARDS]: false,
  [PanelComponentsIds.AGENT_DETAILS]: false,
};