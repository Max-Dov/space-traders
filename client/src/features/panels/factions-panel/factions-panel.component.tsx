import React, { useEffect } from 'react';
import { Panel } from '@shared';
import { getAllFactions, useFactionsStore } from '@zustand';
import { Faction } from '@types';
import './factions-panel.styles.scss';
import classNames from 'classnames';

export const FactionsPanel = () => {
  const { factions } = useFactionsStore();

  useEffect(() => {
    if (factions.length === 0) {
      getAllFactions();
    }
  }, [factions]);

  return <Panel header="FACTIONS" className="factions-container">
    {factions.map(faction => <FactionSection key={faction.symbol} faction={faction}/>)}
  </Panel>;
};

interface FactionProps {
  faction: Faction;
}

const FactionSection = ({ faction }: FactionProps) => {
  const { symbol, name, description, headquarters, traits, isRecruiting } = faction;

  return <div className={classNames("faction-container", symbol.toLowerCase())}>
    <div className="content-wrapper">
      <div className="name">{name}</div>
      <div className="traits">{traits.map(trait => <span key={trait.symbol}>{trait.name.toUpperCase()}</span>)}</div>
      <div className="symbol-and-hq">
        [{symbol}] HQ:{headquarters} {isRecruiting ? 'Recruiting!' : 'Private faction.'}
      </div>
      <div className="description">{description}</div>
    </div>
  </div>;
};