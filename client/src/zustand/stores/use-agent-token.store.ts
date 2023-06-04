import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AgentIdentityStore {
  agentToken: string | null;
}

export const useAgentTokenStore = create<AgentIdentityStore>()(persist(
  (_set) => ({
    agentToken: null,
  }),
  { name: 'agent-token-store' },
));