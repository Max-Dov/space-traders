import { Waypoint } from '@types';

/**
 * Star System model coming from API.
 * Reference: https://spacetraders.stoplight.io/docs/spacetraders/86a14c74e1c69-system
 */
export interface StarSystem {
  symbol: string;
  sectorSymbol: string;
  type: StarSystemTypes;
  x: number;
  y: number;
  waypoints: Array<
    Omit<Waypoint, 'systemSymbol' | 'faction' | 'traits' | 'isUnderConstruction' | 'modifiers'>
  >;
  factions: Array<{
    symbol: string;
  }>;
}

export enum StarSystemTypes {
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