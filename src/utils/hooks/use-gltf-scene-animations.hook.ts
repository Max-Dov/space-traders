import { AnimationAction } from 'three';
import { useEffect } from 'react';

/**
 * Enables all GLTF scene animations.
 */
export const useGltfSceneAnimationsHook = (animations: { [p: string]: AnimationAction | null }) => {
  useEffect(() => {
    for (const property in animations) {
      animations[property]?.play();
    }
  }, []);
};