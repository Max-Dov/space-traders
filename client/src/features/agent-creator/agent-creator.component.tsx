import React, { useState } from 'react';
import { Window } from '@shared';
import { Agent } from '@types';
import { Factions } from '@constants';
import './agent-creator.styles.scss';
import classNames from 'classnames';

export const AgentCreator = () => {
  const [newAgent, setNewAgent] = useState<Partial<Agent> | null>();

  return <Window className="agent-identity">
    <h2>Agent Identity</h2>
    <p className="helper-text">
      Create new Agent identity by submitting the form below.
    </p>
    <p>
      {newAgent?.faction
        ? <div>
          <span>Selected faction: </span><span
          className={classNames('selected-faction', newAgent.faction.toLowerCase())}>{newAgent.faction}</span>
        </div>
        : <div>
          Select faction to join. Starter faction provides 1st contract to start making money from.
        </div>}
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