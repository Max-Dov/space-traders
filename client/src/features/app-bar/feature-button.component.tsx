import React, { HTMLAttributes, useCallback } from 'react';
import classNames from 'classnames';
import { PanelComponentsIds } from '@constants';
import { useOpenedPanelsStore } from '@zustand';

const useFeaturePanelStatus = (panelId: PanelComponentsIds) => {
  const { openedPanels, openPanel, closePanel } = useOpenedPanelsStore();
  const isFeaturePanelOpen = openedPanels.some(panel => panel.panelId === panelId);

  const openFeaturePanel = useCallback(() => openPanel(panelId), [panelId]);
  const closeFeaturePanel = useCallback(() => closePanel(panelId), [panelId]);

  return {
    isFeaturePanelOpen,
    openFeaturePanel,
    closeFeaturePanel,
  };
};

interface FeatureButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  featureId: PanelComponentsIds;
}

/**
 * Button that on click opens (if closed) or closes (if opened) feature panel.
 */
export const FeatureButton = ({ featureId, children, className, ...buttonProps }: FeatureButtonProps) => {
  const { isFeaturePanelOpen, closeFeaturePanel, openFeaturePanel } = useFeaturePanelStatus(featureId);
  return (
    <button
      {...buttonProps}
      className={classNames(className, {
        'is-feature-panel-open': isFeaturePanelOpen,
        'is-feature-panel-closed': !isFeaturePanelOpen,
      })}
      onClick={isFeaturePanelOpen ? closeFeaturePanel : openFeaturePanel}
    >
      {children}
    </button>
  );
};