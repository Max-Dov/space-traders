import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AGENTS_TOKENS_STORE_VERSION } from '@constants';

interface AgentIdentityStore {
  /**
   * Currently used agent token by an app.
   */
  agentToken: string | null;
  /**
   * Agent tokens previously passed to an app.
   * Represented as array of [agentToken, agentSymbol] elements.
   */
  savedAgentTokens: Array<[string, string]>;
  saveAgentToken: (agentTokenAndSymbol: [string, string]) => void;
  deleteAgentToken: (agentToken: string) => void;
}

export const useAgentsTokensStore = create<AgentIdentityStore>()(persist(
  (set, get) => ({
    agentToken: null,
    savedAgentTokens: [],
    saveAgentToken: ([token, symbol]) => {
      const savedAgentTokens = get().savedAgentTokens;
      const isEntryDuplicate = savedAgentTokens.some(([existingToken]) => existingToken === token);
      if (!isEntryDuplicate) {
        set({
          savedAgentTokens: [[token, symbol], ...savedAgentTokens],
        });
      }
    },
    deleteAgentToken: (token) => {
      const savedAgentTokens = [...get().savedAgentTokens];
      const entryIndex = savedAgentTokens.findIndex(([existingToken]) => existingToken === token);
      if (entryIndex !== -1) {
        savedAgentTokens.splice(entryIndex, 1);
        set({
          savedAgentTokens,
        });
      }
    },
  }),
  { name: 'agent-token-store', version: AGENTS_TOKENS_STORE_VERSION },
));