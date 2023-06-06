import { create } from 'zustand';
import { JSX } from 'react';
import { FeaturePanelsIds } from '@constants';

interface Panel {
  id: string | FeaturePanelsIds;
  /**
   * Component with panelId prop. panelId is required in order for component to know how to close itself.
   */
  component: ({ panelId }: { panelId: Panel['id'] }) => JSX.Element;
  isMainSectionPanel: boolean;
}

interface OpenPanelProps extends Omit<Panel, 'id'> {
  /**
   * ID should be provided for single-instance feature panels.
   */
  featurePanelId?: FeaturePanelsIds;
}

interface OpenedPanelsStore {
  openedPanels: Array<Panel>;
  openPanel: (args: OpenPanelProps) => void;
  closePanel: (id: Panel['id']) => void;
}

export const useOpenedPanelsStore = create<OpenedPanelsStore>()((set, get) => ({
  openedPanels: [],
  openPanel: ({ component, isMainSectionPanel, featurePanelId }) => {
    const id = featurePanelId || new Date().getTime();
    const panels = get().openedPanels;
    const newPanel: Panel = { id, component, isMainSectionPanel };
    set({ openedPanels: [...panels, newPanel] });
  },
  closePanel: (id) => {
    const panels = [...get().openedPanels];
    const panelIndex = panels.findIndex((panel) => panel.id === id);
    if (panelIndex !== -1) {
      panels.splice(panelIndex, 1);
      set({ openedPanels: panels });
    }
  },
}));