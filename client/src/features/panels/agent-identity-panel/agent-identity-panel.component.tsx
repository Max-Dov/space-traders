import React, { useState } from 'react';
import { Icon, Input, Panel, Tabs } from '@shared';
import {
  applyAgentToken, closePanel,
  createAgentIdentity,
  getMyAgentDetails,
  removeAgentToken,
  switchAgentToken,
  useAgentsTokensStore,
  useMyAgentDetailsStore,
} from '@zustand';
import { Factions } from '@constants';
import { CommonFeaturePanelProps, CreateAgent } from '@types';
import { useAuthorizedEffect } from '@utils';
import { NewAgentIdentity } from './new-agent-identity.component';
import './agent-identity-panel.styles.scss';

interface AgentIdentityPanelProps extends CommonFeaturePanelProps {
}

export const AgentIdentityPanel = ({ panelId, panelIndex }: AgentIdentityPanelProps) => {
  const [existingToken, setExistingToken] = useState<string | null>(null);
  const { savedAgentTokens } = useAgentsTokensStore();
  const { agentDetails } = useMyAgentDetailsStore();

  useAuthorizedEffect(() => {
    if (agentDetails === null) {
      getMyAgentDetails();
    }
  }, [agentDetails]);

  const applyNewToken = () => {
    if (existingToken !== null) {
      applyAgentToken(existingToken);
    }
  };

  const createRandomIdentity = () => {
    const randomName = `BOBINSKI_${Math.trunc(Math.random() * 10000)}`;
    const factions = [Factions.QUANTUM, Factions.VOID, Factions.COSMIC, Factions.DOMINION, Factions.GALACTIC];
    const randomFaction = factions[Math.trunc(Math.random() * factions.length)];
    const newAgent: CreateAgent = {
      symbol: randomName,
      faction: randomFaction,
    };
    createAgentIdentity(newAgent);
  };

  return <Panel
    className="agent-identity"
    panelTitle={<>
      AGENT ID
      {agentDetails?.symbol && (
        <>: <strong className="agent-name">{agentDetails.symbol}</strong></>
      )}
    </>}
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
    draggableProps={{ index: panelIndex, draggableIdAndKey: panelId }}
  >
    {savedAgentTokens.length > 0 && <TokenSelector />}
    <p className="helper-text">
      <strong>Create new</strong> Agent or <strong>Enter existing</strong> Agent token or <strong>Generate
      random</strong> identity.
    </p>
    <Tabs tabs={[{
      header: 'New Identity',
      content: <NewAgentIdentity />,
    }, {
      header: 'Random Identity',
      content: <>
        <h3 className="header-font">Generate Random Identity</h3>
        <p>
          Don't like filling forms?
          Press button below to create <strong>semi-random name and faction</strong>.
        </p>
        <button onClick={createRandomIdentity}>Randomize Me!</button>
      </>,
    }, {
      header: 'Existing Identity',
      content: <>
        <h3 className="header-font">Existing Token Import</h3>
        <Input
          id="token-input"
          value={existingToken || ''}
          onChange={setExistingToken}
          placeholder="Input your token.."
          style={{ marginBottom: '1em' }}
        />
        <button onClick={applyNewToken} disabled={!existingToken}>Apply Token</button>
      </>,
    }]} />
  </Panel>;
};

const TokenSelector = () => {
  const { savedAgentTokens, agentToken: currentAgentToken } = useAgentsTokensStore();

  return <section className="token-selector">
    <h3>
      Saved IDs
    </h3>
    <table>
      <thead>
      <tr>
        <th>Symbol</th>
        <th>Token</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      {savedAgentTokens.map(([agentToken, agentSymbol]) => {
        const isCurrentIdentity = currentAgentToken === agentToken;

        return <tr key={agentToken}>
          <td>
            {isCurrentIdentity ? <strong>{agentSymbol}</strong> : agentSymbol}
          </td>
          <td>
            <TokenDisplay agentToken={agentToken} />
          </td>
          <td>
            {isCurrentIdentity
              ? <strong className="current-id-label">Current ID</strong>
              : <button onClick={() => switchAgentToken(agentToken)}>Select ID</button>
            }
            <button onClick={() => removeAgentToken(agentToken)}>Delete ID</button>
          </td>
        </tr>;
      })}
      </tbody>
    </table>
  </section>;
};

export interface TokenDisplayProps {
  agentToken: string;
}

const TokenDisplay = ({ agentToken }: TokenDisplayProps) => {
  const [shouldDisplayToken, setShouldDisplayToken] = useState(false);

  const copyTokenToClipboard = () => {
    if (agentToken) {
      window.navigator?.clipboard?.writeText(agentToken);
    }
  };

  return <div className="token-display">
    <button onClick={copyTokenToClipboard}>Copy</button>
    <button
      onClick={() => setShouldDisplayToken(!shouldDisplayToken)}>
      {shouldDisplayToken ? 'Hide' : 'Show'}
    </button>
    {shouldDisplayToken && <div className="displayed-token">
      {agentToken}
    </div>}
  </div>;
};