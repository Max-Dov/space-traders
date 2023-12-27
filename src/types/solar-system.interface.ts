import { Waypoint } from '@types';

/**
 * Solar System model coming from API.
 * Reference: https://spacetraders.stoplight.io/docs/spacetraders/86a14c74e1c69-system
 */
export interface SolarSystem {
  symbol: string;
  sectorSymbol: string;
  type: SolarSystemTypes;
  x: number;
  y: number;
  waypoints: Array<
    Omit<Waypoint, 'systemSymbol' | 'faction' | 'traits' | 'isUnderConstruction' | 'modifiers'>
  >;
  factions: Array<{
    symbol: string;
  }>;
}

export enum SolarSystemTypes {
  NEUTRON_STAR = 'NEUTRON_STAR',
  RED_STAR = 'RED_STAR',
  ORANGE_STAR = 'ORANGE_STAR',
  BLUE_STAR = 'BLUE_STAR',
  YOUNG_STAR = 'YOUNG_STAR',
  WHITE_DWARF = 'WHITE_DWARF',
  BLACK_HOLE = 'BLACK_HOLE',
  HYPERGIANT = 'HYPERGIANT',
  NEBULA = 'NEBULA',
  UNSTABLE = 'UNSTABLE',
}