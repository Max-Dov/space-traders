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

    {/** Header with ship name, class, location */}
    <div className="flex-row header-info">
      <span className="ship-name">{registration.name}</span>
      {' '}
      <span className="role">({registration.role.toLowerCase()}</span>
      {' '}
      <span className="frame">{frame.name.split(' ')[1]})</span>
      {' '}
      <Icon name="ArrowRight" />
      {' '}
      <span className="ship-location">{nav.waypointSymbol}</span>
    </div>

    <div className="flex-row">
      <img className="frame-image" alt={frame.name} src={`/${frame.symbol.toLowerCase()}.webp`} />
      <div>

        <div className="info-bit">
          <div className="info-bit-header">
            Status
          </div>
          <div className="info-bit-content">
            <div className="flex-row">
              <span className={classNames({ 'dimmed': nav.status !== 'IN_TRANSIT' })}>In Transit</span>
              /
              <span className={classNames({ 'dimmed': nav.status !== 'IN_ORBIT' })}>In Orbit</span>
              /
              <span className={classNames({ 'dimmed': nav.status !== 'DOCKED' })}>Docked</span>
            </div>
          </div>
        </div>

        <div className="info-bit">
          <div className="info-bit-header">
            Engines
          </div>
          <div className="info-bit-content">
            <div className="flex-row">
              <span className={classNames({ 'dimmed': nav.flightMode !== 'CRUISE' })}>Cruise</span>
              /
              <span className={classNames({ 'dimmed': nav.flightMode !== 'DRIFT' })}>Drift</span>
              /
              <span className={classNames({ 'dimmed': nav.flightMode !== 'STEALTH' })}>Stealth</span>
              /
              <span className={classNames({ 'dimmed': nav.flightMode !== 'BURN' })}>Burn</span>
            </div>
          </div>
        </div>

        <div className="flex-row">

          <div className="info-bit">
            <div className="info-bit-header column-header">
              <Tooltip tooltipText="Fuel" isIconTooltip customIcon={<Icon name="GasCan" />} />
            </div>
            <div className="info-bit-content">
              {fuel.current} / {fuel.capacity}
            </div>
          </div>

          <div className="info-bit">
            <div className="info-bit-header column-header">
              Cargo
            </div>
            <div className="info-bit-content">
              {cargo.units} / {cargo.capacity}
            </div>
          </div>

          <div className="info-bit">
            <div className="info-bit-header column-header">
              Crew
            </div>
            <div className="info-bit-content">
              <span className="dimmed">[{crew.required} - </span>
              {crew.current}
              <span className="dimmed"> - {crew.capacity}]</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>;
};