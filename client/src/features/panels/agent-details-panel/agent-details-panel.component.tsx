import React from 'react';
import { Currency, Icon, Panel, Placeholder } from '@shared';
import { useMyAgentDetailsStore, getMyAgentDetails, closePanel } from '@zustand';
import { useAuthorizedEffect } from '@utils';
import './agent-details-panel.styles.scss';
import classNames from 'classnames';

interface AgentDetailsPanelProps {
  panelId: string;
}

export const AgentDetailsPanel = ({ panelId }: AgentDetailsPanelProps) => {
  const { agentDetails } = useMyAgentDetailsStore();

  useAuthorizedEffect(() => {
    if (agentDetails === null) {
      getMyAgentDetails();
    }
  }, []);

  return (
    <Panel
      className="agent-details"
      panelTitle="AGENT DETAILS"
      panelButtons={
        <div className="flex-row">
          <button className="inline-button" onClick={getMyAgentDetails}>
            <Icon name="Reload" />
          </button>
          <button className="inline-button" onClick={() => closePanel(panelId)}>
            <Icon name="Close" />
          </button>
        </div>
      }
    >
      {agentDetails ? (
        <>
          <div className="agent">
            <span
              className={classNames('faction', agentDetails.startingFaction.toLowerCase())}>[{agentDetails.startingFaction}]</span>{' '}
            <span className="symbol">{agentDetails.symbol}</span>
          </div>
          <div className="field">
            Headquarters:
            <div className="value">{agentDetails.headquarters}</div>
          </div>
          <div className="field">
            Credits:
            <Currency amount={agentDetails.credits} />
          </div>
        </>
      ) : (
        <Placeholder>
          No data available.
        </Placeholder>
      )}
    </Panel>
  );
};
