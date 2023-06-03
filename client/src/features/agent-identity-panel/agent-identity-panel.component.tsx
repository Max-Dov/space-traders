import React, { useState } from 'react';
import { Input, Window } from '@shared';
import { useAgentIdentityStore } from '@zustand';
import './agent-identity-panel.styles.scss';
import { NewAgentIdentity } from '@features/agent-identity-panel/new-agent-identity.component';

export const AgentCreator = () => {
  const [identityVariant, setIdentityVariant] = useState<'existing' | 'new' | 'random'>('new');
  const { agentSymbol, agentToken } = useAgentIdentityStore();

  return <Window className="agent-identity">
    <h2 className="header-font">Agent Identity {agentSymbol && <span>- {agentSymbol}</span>}</h2>
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