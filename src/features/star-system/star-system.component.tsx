import React from 'react';
import { Canvas } from '@react-three/fiber';
import { MapControls } from '@react-three/drei';
import { StarSystem as StarSystemType} from '@types';
import { Waypoint } from '@features/star-system/waypoint.component';

interface StarSystemProps {
  starSystem: StarSystemType;
  isDevMode?: boolean;
}

// todo scale waypoints with zoom, keep 'em detailed when zoning out and smaller when taking closer look
// todo add orbit lines for orbitals
// todo rotate orbitals heh?
// todo add fancy bg (consider 2 bit quantization of star maps)
// todo add zoom/dimensions control
// todo zoom out just enough to see all objects in scene
// todo rotate camera on x/y to save vertical space
// todo use orthographic camera

export const StarSystem = ({ starSystem }: StarSystemProps) => {
  const { waypoints } = starSystem;

  return <Canvas camera={{ position: [0, 0, 120] }}>
    <MapControls />
    <ambientLight intensity={2} />
    <pointLight intensity={50} decay={0.5} color="#EDB88B">
      <sphereGeometry />
      <meshBasicMaterial color={'white'} />
    </pointLight>
    {waypoints.map(waypoint =>
      <Waypoint waypoint={waypoint} key={waypoint.symbol} />
    )}
  </Canvas>;
};
