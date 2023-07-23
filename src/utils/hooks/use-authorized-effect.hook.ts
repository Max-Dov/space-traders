import { DependencyList, EffectCallback, useEffect } from 'react';
import { useAgentsTokensStore } from '@zustand';

/**
 * Similar to useEffect, but calls callback only if app has auth token.
 */
export const useAuthorizedEffect = (callback: EffectCallback, deps: DependencyList) => {
  const { agentToken } = useAgentsTokensStore();
  const isAuthorized = agentToken !== null;
  useEffect(() => {
    if (isAuthorized) {
      callback();
    }
  }, [isAuthorized, agentToken, ...deps]);
};