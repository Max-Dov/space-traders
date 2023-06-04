import { Factions } from '@constants';

/**
 * Object used for creating an Agent identity.
 */
export interface CreateAgent {
  symbol: string;
  faction: Factions;
  email?: string;
}