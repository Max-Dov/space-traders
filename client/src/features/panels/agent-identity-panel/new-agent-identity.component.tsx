import React, { useState } from 'react';
import classNames from 'classnames';
import { Input } from '@shared';
import { Factions } from '@constants';
import { CreateAgent } from '@types';
import { createAgentIdentity } from '@zustand';
import { useValidateModel } from '@utils';
import { agentSchema } from '@features/panels/agent-identity-panel/agent.schema';

/**
 * Form for creating new agent identity
 */
export const NewAgentIdentity = () => {
  const [newAgent, setNewAgent] = useState<Partial<CreateAgent> | null>(null);
  const { isModelValid } = useValidateModel({ model: newAgent, modelSchema: agentSchema });

  const submitIdentity = () => {
    createAgentIdentity(newAgent as CreateAgent);
  };

  return (
    <>
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
      <p>
        (Optionally) input your email if you have reserved your symbol between resets.
      </p>
      <Input
        id="agent-email"
        className="agent-symbol-input"
        onChange={(email) => setNewAgent({ ...newAgent, email })}
        value={newAgent?.email || ''}
        placeholder="Enter agent email.."
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
      <button className="create-identity" disabled={!isModelValid} onClick={submitIdentity}>Create Identity</button>
    </>
  );
};