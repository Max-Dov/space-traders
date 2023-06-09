import React, { useEffect, useState } from 'react';
import { Input, Window } from '@shared';
import { createAgentIdentity, getMyAgentDetails, useAgentTokenStore, useMyAgentDetailsStore } from '@zustand';
import { Factions } from '@constants';
import { CreateAgent } from '@types';
import { NewAgentIdentity } from './new-agent-identity.component';
import './agent-identity-panel.styles.scss';

export const AgentIdentityPanel = () => {
  const [identityVariant, setIdentityVariant] = useState<'existing' | 'new' | 'random'>('new');
  const [shouldDisplayToken, setShouldDisplayToken] = useState(false);
  const [existingToken, setExistingToken] = useState<string | null>(null);
  const { agentToken } = useAgentTokenStore();
  const { agentDetails } = useMyAgentDetailsStore();

  useEffect(() => {
    if (agentDetails === null) {
      getMyAgentDetails();
    }
  }, [agentToken]);

  const copyTokenToClipboard = () => {
    if (agentToken) {
      window.navigator?.clipboard?.writeText(agentToken);
    }
  };

  const applyNewToken = () => {
    useAgentTokenStore.setState({ agentToken: existingToken });
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

  return <Window
    className="agent-identity"
    header={<>
      AGENT ID
      {agentDetails?.symbol && (
        <span>: <strong className="agent-name">{agentDetails.symbol}</strong></span>
      )}
    </>}
  >
    {agentToken &&
        <>
            <h3>Token</h3>
            <p className="token-action-items">
                <button onClick={copyTokenToClipboard}>Copy Token To Clipboard</button>
                <span>or</span>
                <button
                    onClick={() => setShouldDisplayToken(!shouldDisplayToken)}>{shouldDisplayToken ? 'Hide Token' : 'Display Token'}</button>
            </p>
          {shouldDisplayToken && <p className="token-data">
            {agentToken}
          </p>}
        </>}
    <p className="helper-text">
      <strong>Create new</strong> Agent or <strong>Enter existing</strong> Agent token or <strong>Generate
      random</strong> identity.
    </p>
    <div className="identity-variant-bar">
      <Input
        name="identity"
        id="new-identity"
        type="radio"
        onClick={() => setIdentityVariant('new')}
        value={identityVariant}
        label="New Identity"
        checked={identityVariant === 'new'}
      />
      <Input
        name="identity"
        id="random-identity"
        type="radio"
        onClick={() => setIdentityVariant('random')}
        value={identityVariant}
        label="Random Identity"
      />
      <Input
        name="identity"
        id="existing-identity"
        type="radio"
        onClick={() => setIdentityVariant('existing')}
        value={identityVariant}
        label="Existing Identity"
      />
    </div>
    {identityVariant === 'new' && (<NewAgentIdentity/>)}
    {identityVariant === 'existing' && (
      <>
        <h3 className="header-font">Existing Token Import</h3>
        <Input
          id="token-input"
          value={existingToken || ''}
          onChange={setExistingToken}
          placeholder="Input your token.."
          style={{ marginBottom: '1em' }}
        />
        <button onClick={applyNewToken} disabled={!existingToken}>Apply Token</button>
      </>
    )}
    {identityVariant === 'random' && (
      <>
        <h3 className="header-font">Generate Random Identity</h3>
        <p>
          Don't like filling forms?
          Press button below to create <strong>semi-random name and faction</strong>.
        </p>
        <button onClick={createRandomIdentity}>Randomize Me!</button>
      </>
    )}
  </Window>;
};