import React from 'react';
import './app-bar.styles.scss';
import { FeatureButton } from '@features/app-bar/feature-button.component';
import { FeaturePanelsIds } from '@constants';


export const WindowsBar = () => {

  return <div className="app-bar">
    <div className="name-background">
      <a className="name" href="https://github.com/Max-Dov/space-traders">
        VISOR
      </a>
    </div>
    <FeatureButton featureId={FeaturePanelsIds.AGENT_ID}>
      Agent ID
    </FeatureButton>
    <FeatureButton featureId={FeaturePanelsIds.FACTIONS}>
      Factions
    </FeatureButton>
    <FeatureButton featureId={FeaturePanelsIds.NETWORK}>
      Network
    </FeatureButton>
    <FeatureButton featureId={FeaturePanelsIds.SERVER_STATUS}>
      Server Status
    </FeatureButton>
  </div>;
};