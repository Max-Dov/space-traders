import React, { useState } from 'react';
import { Vector3 } from '@react-three/fiber';
import { StarSystem as StarSystemType } from '@types';
import { GltfModel } from '@shared';

type StarSystemWaypoint = StarSystemType['waypoints'][number];

interface WaypointProps {
  waypoint: StarSystemWaypoint;
}

export const Waypoint = ({ waypoint }: WaypointProps) => {
  const { x, y, type } = waypoint;
  const [isHovered, setIsHovered] = useState(false);
  const position = [x / 10, y / 10, 0] as Vector3;

  return <GltfModel
    url={`waypoint_${type.toLowerCase()}.gltf`}
    position={position} scale={isHovered ? 1.2 : 1}
    onPointerEnter={() => setIsHovered(true)}
    onPointerLeave={() => setIsHovered(false)}
    rotation={[Math.PI / 2, 0, 0]}
    fallback={
      <mesh position={position}>
        <sphereGeometry />
        <meshPhongMaterial color="red" />
      </mesh>
    }
  />;
};
