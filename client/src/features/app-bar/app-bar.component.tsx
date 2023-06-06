import React from 'react';
import './app-bar.styles.scss';
import { FeatureButton } from './feature-button.component';
import { PanelComponentsIds } from '@constants';

export const WindowsBar = () => {

  return <div className="app-bar">
    <div className="name-background">
      <a className="name" href="https://github.com/Max-Dov/space-traders" tabIndex={0}>
        VISOR
      </a>
    </div>
    <FeatureButton featureId={PanelComponentsIds.AGENT_ID}>
      Agent ID
    </FeatureButton>
    <FeatureButton featureId={PanelComponentsIds.FACTIONS}>
      Factions
    </FeatureButton>
    <FeatureButton featureId={PanelComponentsIds.NETWORK}>
      Network
    </FeatureButton>
    <FeatureButton featureId={PanelComponentsIds.SERVER_STATUS}>
      Server Status
    </FeatureButton>
  </div>;
};