import { Canvas } from '@react-three/fiber';
import React from 'react';

export const SolarSystem = () => {
  return <Canvas>
    <mesh>
      <boxGeometry></boxGeometry>
      <meshBasicMaterial></meshBasicMaterial>
    </mesh>
  </Canvas>
};