import { Panel, useOpenedPanelsStore } from '@zustand';

export const closePanel = (panelId: Panel['panelId']) => {
  useOpenedPanelsStore.getState().closePanel(panelId);
};