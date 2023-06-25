import React from 'react';
import { CommonFeaturePanelProps } from '@types';
import { Panel, Placeholder } from '@shared';
import { getShips, useShipsStore } from '@zustand';
import { useAuthorizedEffect } from '@utils';
import { Ship } from './ship.component';
import './ships-panel.styles.scss';

interface ShipsPanelProps extends CommonFeaturePanelProps {
}

export const ShipsPanel = ({ panelIndex, panelId }: ShipsPanelProps) => {
  const { ships } = useShipsStore();

  useAuthorizedEffect(() => {
    if (ships.length === 0) {
      getShips();
    }
  }, []);

  return <Panel
    panelTitle="Ships"
    draggableProps={{ index: panelIndex, draggableIdAndKey: panelId }}
    className="ships-panel"
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