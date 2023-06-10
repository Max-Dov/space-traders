import { DependencyList, EffectCallback, useEffect } from 'react';
import { useIsAuthorized } from '@utils';

/**
 * Similar to useEffect, but calls callback only if app has auth token.
 */
export const useAuthorizedEffect = (callback: EffectCallback, deps: DependencyList) => {
  const isAuthorized = useIsAuthorized()
  useEffect(() => {
    if (isAuthorized) {
      callback()
    }
  }, [isAuthorized, ...deps])
}