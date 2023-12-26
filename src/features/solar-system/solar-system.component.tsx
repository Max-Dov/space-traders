import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { SolarSystem as SolarSystemType } from '@types';

interface SolarSystemProps {
  solarSystem: SolarSystemType;
}

export const SolarSystem = ({ solarSystem }: SolarSystemProps) => {

  const { waypoints } = solarSystem;

  return <Canvas className="solar-system-canvas">

    <OrbitControls makeDefault enableRotate={false}/>

    <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
    <ambientLight intensity={1.5} />

    <mesh position={[0, 0, 0]} scale={3}>
      <meshPhongMaterial color={'red'} />
      <sphereGeometry />
    </mesh>

    {waypoints.map(waypoint =>
      <Waypoint waypoint={waypoint} />
    )}

  </Canvas>;
};

type SolarSystemWaypoint = SolarSystemType['waypoints'][number];

interface WaypointProps {
  waypoint: SolarSystemWaypoint;
}

const Waypoint = ({ waypoint }: WaypointProps) => {
  const { x, y } = waypoint;

  return <mesh position={[x / 10, y / 10, 0]} scale={2}>
    <meshPhongMaterial color={'green'} />
    <sphereGeometry />
  </mesh>;
};