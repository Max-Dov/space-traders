import React, { useState } from 'react';
import classNames from 'classnames';
import { Input, Window } from '@shared';
import { CreateAgent } from '@types';
import { Factions } from '@constants';
import './agent-creator.styles.scss';

export const AgentCreator = () => {
  const [newAgent, setNewAgent] = useState<Partial<CreateAgent> | null>();
  const [identityVariant, setIdentityVariant] = useState<'existing' | 'new' | 'random'>('new');

  return <Window className="agent-identity">
    <h2 className="header-font">Agent Identity</h2>
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
    <h3 className="header-font">Symbol</h3>
    <p>
      Come up with your agent symbol - that is how others would see you.
    </p>
    <Input
      id="agent-symbol"
      className="agent-symbol-input"
      onChange={(agentSymbol) => setNewAgent({ ...newAgent, symbol: agentSymbol.toUpperCase() })}
      value={newAgent?.symbol || ''}
      placeholder="Enter agent symbol.."
    />
    <h3 className="header-font">Faction</h3>
    <p>
      {newAgent?.faction
        ? <span>
          <span>Selected faction: </span>
          <span
            className={classNames('selected-faction', newAgent.faction.toLowerCase())}>{newAgent.faction}
          </span>
        </span>
        : <span>
          Select faction to join. Starter faction provides 1st contract to start making money from.
        </span>}
    </p>
    <div className="factions-buttons">
      <button className="void" onClick={() => setNewAgent({ ...newAgent, faction: Factions.VOID })}>
        {Factions.VOID}
      </button>
      <button className="galactic" onClick={() => setNewAgent({ ...newAgent, faction: Factions.GALACTIC })}>
        {Factions.GALACTIC}
      </button>
      <button className="cosmic" onClick={() => setNewAgent({ ...newAgent, faction: Factions.COSMIC })}>
        {Factions.COSMIC}
      </button>
      <button className="dominion" onClick={() => setNewAgent({ ...newAgent, faction: Factions.DOMINION })}>
        {Factions.DOMINION}
      </button>
      <button className="quantum" onClick={() => setNewAgent({ ...newAgent, faction: Factions.QUANTUM })}>
        {Factions.QUANTUM}
      </button>
    </div>
  </Window>;
};