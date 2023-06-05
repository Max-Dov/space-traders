import React, { useEffect } from 'react';
import { Window } from '@shared';
import { getFactions, useFactionsStore } from '@zustand';
import { Faction } from '@types';
import './factions-panel.styles.scss';

export const FactionsPanel = () => {
  const { factions } = useFactionsStore();

  useEffect(() => {
    getFactions();
  }, []);

  return <Window header="FACTIONS">
    {factions.map(faction => <FactionSection key={faction.symbol} faction={faction}/>)}
  </Window>;
};

interface FactionProps {
  faction: Faction;
}

const FactionSection = ({ faction }: FactionProps) => {
  const { symbol, name, description, headquarters, traits, isRecruiting } = faction;

  return <div className="faction-container">
    <div className="name">{name}</div>
    <div className="traits">{traits.map(trait => <span key={trait.symbol}>{trait.name.toUpperCase()}</span>)}</div>
    <div className="symbol-and-hq">
      [{symbol}] HQ:{headquarters} {isRecruiting ? 'Recruiting!' : 'Private faction.'}
    </div>
    <div className="description">{description}</div>
  </div>;
};