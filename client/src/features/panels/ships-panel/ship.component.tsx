import React from 'react';
import { Ship as ShipInterface } from '@types';
import './ship.styles.scss';
import classNames from 'classnames';
import { Icon, Tooltip } from '@shared';

interface ShipProps {
  ship: ShipInterface;
}

/**
 * Ship representation in ships panel.
 */
export const Ship = ({ ship }: ShipProps) => {
  const {
    registration,
    frame,
    nav,
    fuel,
    crew,
    cargo
  } = ship;
  return <section className="ship">
    <div className="flex-row">
      <img className="frame-image" alt={frame.name} src={`/${frame.symbol.toLowerCase()}.webp`} />
      <div>
        <div className="ship-name">{registration.name}</div>
        <div>
          <span className="role">{registration.role.toLowerCase()}</span>
          {' '}
          <span className="frame">{frame.name.split(' ')[1]}</span>
        </div>
        <div>
          <span className="ship-location">{nav.waypointSymbol}</span>
        </div>
      </div>
    </div>
    <div className="ship-stats">
      <div className="info-bit">
        <div className="info-bit-header">
          <Tooltip tooltipText="Fuel" isIconTooltip customIcon={<Icon name="GasCan" />} />
        </div>
        <div className="info-bit-content">
          {fuel.current} / {fuel.capacity}
        </div>
      </div>
      <div className="info-bit">
        <div className="info-bit-header">
          Status
        </div>
        <div className="info-bit-content">
          {nav.status}
        </div>
      </div>
      <div className="info-bit">
        <div className="info-bit-header">
          Flight Mode
        </div>
        <div className="info-bit-content">
          {nav.flightMode}
        </div>
      </div>
      <div className="info-bit">
        <div className="info-bit-header">
          Crew
        </div>
        <div className="info-bit-content">
          {crew.current}
        </div>
      </div>
      <div className="info-bit">
        <div className="info-bit-header">
          Cargo
        </div>
        <div className="info-bit-content">
          {cargo.units} / {cargo.capacity}
        </div>
      </div>
    </div>
  </section>;
};