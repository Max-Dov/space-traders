import React, { useRef } from 'react';
import { CommonFeaturePanelProps } from '@types';
import { Icon, Panel, Placeholder } from '@shared';
import { closePanel, getShips, useShipsStore } from '@zustand';
import { useAuthorizedEffect, useIsElementNarrow } from '@utils';
import { Ship } from './ship.component';
import './ships-panel.styles.scss';
import classNames from 'classnames';

interface ShipsPanelProps extends CommonFeaturePanelProps {
}

export const ShipsPanel = ({ panelIndex, panelId }: ShipsPanelProps) => {
  const { ships } = useShipsStore();
  const panelRef = useRef<HTMLElement>(null);
  const isPanelNarrow = useIsElementNarrow(panelRef, 700);

  useAuthorizedEffect(() => {
    if (ships.length === 0) {
      getShips();
    }
  }, []);

  return <Panel
    panelTitle="Ships"
    draggableProps={{ index: panelIndex, draggableIdAndKey: panelId }}
    className={classNames('ships-panel', { 'narrow-panel': isPanelNarrow })}
    contentContainerRef={panelRef}
    panelButtons={
      <div className="flex-row">
        <button className="inline-button" onClick={getShips}>
          <Icon name="Reload" />
        </button>
        <button className="inline-button" onClick={() => closePanel(panelId)}>
          <Icon name="Close" />
        </button>
      </div>
    }
  >
    {ships.length > 0 && (
      <>
        {ships.map((ship, index) => <Ship key={index} ship={ship} />)}
      </>
    )}
    {ships.length === 0 &&
        <Placeholder>
            Can't load ships in spaceships game, welp.
        </Placeholder>
    }
  </Panel>;
};