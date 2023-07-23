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
      <span>
        <span className="role">({registration.role.toLowerCase()}</span>
        {' '}
        <span className="frame">
          <Tooltip tooltipText={frame.description}>{frame.name.split(' ')[1]}</Tooltip>
          )
        </span>
      </span>
      <Icon name="ArrowRight" />
      <span className="ship-location">{nav.waypointSymbol}</span>
    </div>

    <div className="flex-row image-with-stats-row">
      <img className="frame-image" alt={frame.name} src={`/${frame.symbol.toLowerCase()}.webp`} />
      <div className="stats-column">

        <div className="info-bit">
          <div className="info-bit-header">
            Status
          </div>
          <div className="info-bit-content">
            <span className={classNames({ 'dimmed': nav.status !== 'IN_TRANSIT' })}>In Transit</span>
            {' / '}
            <span className={classNames({ 'dimmed': nav.status !== 'IN_ORBIT' })}>In Orbit</span>
            {' / '}
            <span className={classNames({ 'dimmed': nav.status !== 'DOCKED' })}>Docked</span>
          </div>
        </div>

        <div className="info-bit">
          <div className="info-bit-header">
            <Tooltip tooltipText="The ship's set speed when traveling between waypoints or systems.">Engines</Tooltip>
          </div>
          <div className="info-bit-content">
            <span className={classNames({ 'dimmed': nav.flightMode !== 'CRUISE' })}>Cruise</span>
            {' / '}
            <span className={classNames({ 'dimmed': nav.flightMode !== 'DRIFT' })}>Drift</span>
            {' / '}
            <span className={classNames({ 'dimmed': nav.flightMode !== 'STEALTH' })}>Stealth</span>
            {' / '}
            <span className={classNames({ 'dimmed': nav.flightMode !== 'BURN' })}>Burn</span>
          </div>
        </div>

        <div className="flex-row fuel-cargo-crew-row">

          <div className="info-bit">
            <div className="info-bit-header">
              Fuel
            </div>
            <div className="info-bit-content">
              <Tooltip tooltipText="The current amount of fuel in the ship's tanks.">{fuel.current}</Tooltip>
              {' / '}
              <Tooltip tooltipText="The maximum amount of fuel the ship's tanks can hold.">{fuel.capacity}</Tooltip>
            </div>
          </div>

          <div className="info-bit">
            <div className="info-bit-header">
              Cargo
            </div>
            <div className="info-bit-content">
              <Tooltip tooltipText="The number of items currently stored in the cargo hold.">{cargo.units}</Tooltip>
              {' / '}
              <Tooltip
                tooltipText="The max number of items that can be stored in the cargo hold.">{cargo.capacity}</Tooltip>
            </div>
          </div>

          <div className="info-bit">
            <div className="info-bit-header">
              Crew
            </div>
            <div className="info-bit-content">
              <span className="dimmed">
                [
                <Tooltip tooltipText="The minimum number of crew members required to maintain the ship.">
                  {crew.required}
                </Tooltip>
              </span>
              <span className="dimmed">{' - '}</span>
              <Tooltip tooltipText="The current number of crew members on the ship.">
                {crew.current}
              </Tooltip>
              <span className="dimmed">{' - '}</span>
              <span className="dimmed">
                <Tooltip tooltipText="The maximum number of crew members the ship can support.">
                  {crew.capacity}
                </Tooltip>
                ]
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>;
};