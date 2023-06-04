import React, { useEffect, useState } from 'react';
import { Input, Window } from '@shared';
import { useAgentTokenStore, useMyAgentDetailsStore, getMyAgentDetails } from '@zustand';
import { NewAgentIdentity } from './new-agent-identity.component';
import './agent-identity-panel.styles.scss';

export const AgentCreator = () => {
  const [identityVariant, setIdentityVariant] = useState<'existing' | 'new' | 'random'>('new');
  const { agentToken } = useAgentTokenStore();
  const { agentDetails } = useMyAgentDetailsStore();

  useEffect(() => {
    getMyAgentDetails();
  }, [agentToken])

  return <Window className="agent-identity">
    <h2 className="header-font">Agent Identity {agentDetails?.symbol && <span>- {agentDetails.symbol}</span>}</h2>
    {agentToken &&
        <>
            <h3>Token</h3>
            <p>{agentToken}</p>
        </>}
    <p className="helper-text">
      <strong>Create new</strong> Agent identity or <strong>Enter existing</strong> Agent token or <strong>Generate
      random</strong> identity (would not be saved on page reload).
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
  </Window>;
};