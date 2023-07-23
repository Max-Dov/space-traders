import React, { useEffect, useRef } from 'react';
import { Icon, Panel, Placeholder } from '@shared';
import { closePanel, getAllFactions, useFactionsStore } from '@zustand';
import { CommonFeaturePanelProps, Faction } from '@types';
import './factions-panel.styles.scss';
import classNames from 'classnames';
import { useIsElementNarrow } from '@utils';

interface FactionsPanelProps extends CommonFeaturePanelProps {
}

export const FactionsPanel = ({ panelId, panelIndex }: FactionsPanelProps) => {
  const { factions } = useFactionsStore();
  const panelRef = useRef<HTMLElement>(null);
  const isPanelNarrow = useIsElementNarrow(panelRef, 700);

  useEffect(() => {
    if (factions.length === 0) {
      getAllFactions();
    }
  }, [factions]);

  return <Panel
    className={classNames('factions-container', { 'narrow-panel': isPanelNarrow })}
    contentContainerRef={panelRef}
    panelTitle="FACTIONS"
    panelButtons={
      <div className="flex-row">
        <button className="inline-button" onClick={getAllFactions}>
          <Icon name="Reload" />
        </button>
        <button className="inline-button" onClick={() => closePanel(panelId)}>
          <Icon name="Close" />
        </button>
      </div>
    }
    draggableProps={{ index: panelIndex, draggableIdAndKey: panelId }}
  >
    {factions.map(faction => <FactionSection key={faction.symbol} faction={faction} />)}
    {factions.length === 0 && <Placeholder>No data available.</Placeholder>}
  </Panel>;
};

interface FactionProps {
  faction: Faction;
}

const FactionSection = ({ faction }: FactionProps) => {
  const { symbol, name, description, headquarters, traits, isRecruiting } = faction;

  return <div className={classNames('faction-container', symbol.toLowerCase())}>
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