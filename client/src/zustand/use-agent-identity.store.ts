import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Agent, CreateAgent } from '@types';
import { postAgentIdentityRequest } from '@utils';

interface AgentIdentityStore {
  agentToken: string | null;
  agentSymbol: Agent['symbol'] | null;
  /**
   * Send identity to API and refill store based on values returned.
   */
  postAgentIdentity: (agentIdentity: CreateAgent) => void;
}

export const useAgentIdentityStore = create<AgentIdentityStore>()(persist(
  (set) => ({
    agentToken: null,
    agentSymbol: null,
    // TODO update other stores with data from response
    postAgentIdentity: (agentIdentity) => {
      postAgentIdentityRequest(agentIdentity).then(data => {
        const agentSymbol = data.agent.symbol;
        const agentToken = data.token;
        set({ agentToken, agentSymbol });
      });
    },
  }),
  { name: 'agent-identity-storage' },
));