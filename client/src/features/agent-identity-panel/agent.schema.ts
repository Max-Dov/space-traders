import Joi from 'joi';
import { Factions } from '@constants';
import { CreateAgent } from '@types';

export const agentSchema = Joi.object<CreateAgent>({
  faction: Joi.string().required().allow(
    Factions.DOMINION,
    Factions.COSMIC,
    Factions.VOID,
    Factions.GALACTIC,
    Factions.QUANTUM,
  ),
  symbol: Joi.string().required().min(3).max(14),
  email: Joi.string().email({ tlds: { allow: false } }),
});