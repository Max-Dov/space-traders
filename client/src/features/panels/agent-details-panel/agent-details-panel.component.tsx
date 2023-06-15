import React from 'react';
import { Currency, Panel } from '@shared';
import { useMyAgentDetailsStore, getMyAgentDetails } from '@zustand';
import { useAuthorizedEffect } from '@utils';
import './agent-details-panel.styles.scss';
import classNames from 'classnames';

export const AgentDetailsPanel = () => {
  const { agentDetails } = useMyAgentDetailsStore();

  useAuthorizedEffect(() => {
    if (agentDetails === null) {
      getMyAgentDetails();
    }
  }, []);

  return (
    <Panel header="AGENT DETAILS" className="agent-details">
      {agentDetails && (
        <>
            <div className="agent">
              <span className={classNames('faction',agentDetails.startingFaction.toLowerCase())}>[{agentDetails.startingFaction}]</span>{" "}
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
      )}
    </Panel>
  );
};
