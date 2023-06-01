import Joi from 'joi';
import { Factions } from '@constants';
import { Agent } from '@types';

export const agentSchema = Joi.object<Agent>({
  faction: Joi.options([
    Factions.DOMINION,
    Factions.COSMIC,
    Factions.VOID,
    Factions.GALACTIC,
    Factions.QUANTUM,
  ]),
  email: Joi.string().email(),
  symbol: Joi.string().required().min(3).max(14),
});