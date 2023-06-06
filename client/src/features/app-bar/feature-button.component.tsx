import React, { HTMLAttributes, useCallback } from 'react';
import classNames from 'classnames';
import { FEATURE_ID_TO_COMPONENT, FeaturePanelsIds, FEATURE_ID_TO_IS_MAIN_SECTION } from '@constants';
import { useOpenedPanelsStore } from '@zustand';

const useFeaturePanelStatus = (featurePanelId: FeaturePanelsIds) => {
  const { openedPanels, openPanel, closePanel } = useOpenedPanelsStore();
  const isFeaturePanelOpen = openedPanels.some(panel => panel.id === featurePanelId);

  const openFeaturePanel = useCallback(() => openPanel({
    isMainSectionPanel: FEATURE_ID_TO_IS_MAIN_SECTION[featurePanelId],
    featurePanelId,
    component: FEATURE_ID_TO_COMPONENT[featurePanelId],
  }), [featurePanelId]);

  const closeFeaturePanel = useCallback(() => closePanel(featurePanelId), [featurePanelId]);

  return {
    isFeaturePanelOpen,
    openFeaturePanel,
    closeFeaturePanel,
  };
};

interface FeatureButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  featureId: FeaturePanelsIds;
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