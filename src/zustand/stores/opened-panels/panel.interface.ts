import { PanelComponentsIds } from '@constants';

export type PanelPlacement = 'main-section' | 'side-section' | 'floating';

/**
 * Panel representation in OpenedPanels store.
 */
export interface Panel {
  /**
   * Panel ID assigned by OpenedPanel store for "singleton" panels or anywhere in code for "misc" panels.
   * ID purposes:
   *   1. Is to be passed to panel itself, so Panel would be able to close itself.
   *   2. For feature panels (that are expected to be singletons),
   *      OpenedPanel store can control amount of opened feature panels.
   */
  panelId: string;
  /**
   * React component representation of a panel.
   */
  componentId: PanelComponentsIds;
  /**
   * Where panel should reside right now.
   */
  placement: PanelPlacement;
}