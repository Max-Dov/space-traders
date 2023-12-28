import React, { ReactElement } from 'react';
import { Clone, CloneProps, useAnimations, useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { ErrorBoundary } from 'react-error-boundary';
import { useGltfSceneAnimationsHook } from '@utils';

// based on drei types
type CloneComponentProps = CloneProps & Omit<GroupProps, 'children'>;

interface GltfModelProps extends Omit<CloneComponentProps, 'object' | 'ref'> {
  /**
   * Url to load model from.
   */
  url: string;
  /**
   * Fallback component in case of load failure.
   */
  fallback: ReactElement;
}

/**
 * Loads model by url into <Clone />. Can handle load failures.
 */
export const GltfModel = ({ url, fallback, ...cloneProps }: GltfModelProps) =>
  <ErrorBoundary fallback={fallback}>
    <GltfModelLoader {...cloneProps} url={url} />
  </ErrorBoundary>;

interface GltfModelLoaderProps extends Omit<CloneComponentProps, 'object' | 'ref'> {
  /**
   * Url to load model from.
   */
  url: string;
}

const GltfModelLoader = ({ url, ...cloneProps }: GltfModelLoaderProps) => {
  const model = useGLTF(url);
  const { ref, actions } = useAnimations(model.animations);
  useGltfSceneAnimationsHook(actions);

  return <Clone
    {...cloneProps}
    // @ts-ignore conflict with drei and react types.
    ref={ref}
    object={model.scene}
  />;
};