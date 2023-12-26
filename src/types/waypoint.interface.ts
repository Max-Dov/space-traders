import { ValueOf } from '@types';

/**
 * A waypoint is a location that ships can travel to such as a Planet, Moon or Space Station.
 * API model, reference: https://spacetraders.stoplight.io/docs/spacetraders/e380122173013-waypoint
 */
export interface Waypoint {
  symbol: string;
  type: ValueOf<WaypointTypes>;
  systemSymbol: string;
  x: number;
  y: number;
  orbitals: Array<{
    symbol: string;
  }>;
  faction: {
    symbol: string;
  };
  traits: Array<{
    // todo create enum for symbols
    symbol: string;
    name: string;
    description: string;
  }>;
  modifiers: Array<{
    // todo create enum for symbols
    symbol: string;
    name: string;
    description: string;
  }>;
  isUnderConstruction: boolean;
  /**
   * The symbol of the parent waypoint, if this waypoint is in orbit around another waypoint.
   * Otherwise, this value is undefined.
   */
  orbits?: string;
  chart?: {
    waypointSymbol: string;
    submittedBy: string;
    submittedOn: string; // Date
  };
}

export enum WaypointTypes {
  PLANET = 'PLANET',
  GAS_GIANT = 'GAS_GIANT',
  MOON = 'MOON',
  ORBITAL_STATION = 'ORBITAL_STATION',
  JUMP_GATE = 'JUMP_GATE',
  ASTEROID_FIELD = 'ASTEROID_FIELD',
  ASTEROID = 'ASTEROID',
  ENGINEERED_ASTEROID = 'ENGINEERED_ASTEROID',
  ASTEROID_BASE = 'ASTEROID_BASE',
  NEBULA = 'NEBULA',
  DEBRIS_FIELD = 'DEBRIS_FIELD',
  GRAVITY_WELL = 'GRAVITY_WELL',
  ARTIFICIAL_GRAVITY_WELL = 'ARTIFICIAL_GRAVITY_WELL',
  FUEL_STATION = 'FUEL_STATION',
}