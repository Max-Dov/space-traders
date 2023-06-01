import { Factions } from '@constants';

export interface Agent {
  symbol: string;
  faction: Factions;
  email?: string;
}