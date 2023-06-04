import { create } from 'zustand';
import { Agent } from '@types';

interface MyAgentDetailsStore {
  agentDetails: Agent | null;
}

export const useMyAgentDetailsStore = create<MyAgentDetailsStore>()(() => ({
  agentDetails: null,
}));