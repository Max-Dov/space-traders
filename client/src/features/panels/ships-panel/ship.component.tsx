import React from 'react';
import { Ship as ShipInterface } from '@types';
import './ship.styles.scss';
import classNames from 'classnames';

interface ShipProps {
  ship: ShipInterface;
}

/**
 * Ship representation in ships panel.
 */
export const Ship = ({ ship }: ShipProps) => {
  const { registration, frame } = ship;
  return <section className="ship">
    <div className="flex-row">
      <img className="frame-image" alt={frame.name} src={`/${frame.symbol.toLowerCase()}.webp`} />
      <div>
        <div className="name">{registration.name}</div>
        <div className="flex-row">
          <span className="role">{registration.role.toLowerCase()}</span>
          <span className="frame">{frame.name}</span>
        </div>
      </div>
    </div>
  </section>;
};