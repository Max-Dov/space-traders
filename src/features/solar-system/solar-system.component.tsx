import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { MapControls } from '@react-three/drei';
import { SolarSystem as SolarSystemType, WaypointTypes } from '@types';

interface SolarSystemProps {
  solarSystem: SolarSystemType;
}

// todo scale waypoints with zoom, keep 'em detailed when zoning out and smaller when taking closer look
// todo add orbit lines for orbitals
// todo rotate orbitals heh?
// todo add fancy bg (consider 2 bit quantization of star maps)
// todo add zoom/dimensions control

export const SolarSystem = ({ solarSystem }: SolarSystemProps) => {

  const { waypoints } = solarSystem;
  console.table(waypoints);

  return <Canvas className="solar-system-canvas" camera={{ position: [0, 0, 120] }}>

    <MapControls />

    {/*<pointLight castShadow position={[0, 0, 5]} intensity={4000} />*/}
    <ambientLight intensity={5} />

    <mesh position={[0, 0, 0]} scale={1}>
      <meshPhongMaterial color={'white'} />
      <sphereGeometry />
    </mesh>

    {waypoints.map(waypoint =>
      <Waypoint waypoint={waypoint} key={waypoint.symbol} />
    )}

  </Canvas>;
};

type SolarSystemWaypoint = SolarSystemType['waypoints'][number];

const WAYPOINT_TYPE_TO_COLOR: { [key in WaypointTypes]: string } = {
  [WaypointTypes.PLANET]: '#FF322F',
  [WaypointTypes.GAS_GIANT]: '#FFF0AB',
  [WaypointTypes.MOON]: '#288E8A',
  [WaypointTypes.ORBITAL_STATION]: '#FFC038',
  [WaypointTypes.JUMP_GATE]: '#3E92CC',
  [WaypointTypes.ASTEROID_FIELD]: '#E26D5A',
  [WaypointTypes.ASTEROID]: '#AF4D98',
  [WaypointTypes.ENGINEERED_ASTEROID]: '#66101F',
  [WaypointTypes.ASTEROID_BASE]: '#084887',
  [WaypointTypes.NEBULA]: '#E34A6F',
  [WaypointTypes.DEBRIS_FIELD]: '#F7B2BD',
  [WaypointTypes.GRAVITY_WELL]: '#2BC016',
  [WaypointTypes.ARTIFICIAL_GRAVITY_WELL]: '#7C72A0',
  [WaypointTypes.FUEL_STATION]: '#FCAB64',
};

interface WaypointProps {
  waypoint: SolarSystemWaypoint;
}

const Waypoint = ({ waypoint }: WaypointProps) => {
  const { x, y, type } = waypoint;
  const [isHovered, setIsHovered] = useState(false);

  return <mesh
    position={[x / 10, y / 10, 0]} scale={isHovered ? 2 : 1}
    onPointerEnter={() => setIsHovered(true)}
    onPointerLeave={() => setIsHovered(false)}
  >
    <meshPhongMaterial color={isHovered ? 'yellow': WAYPOINT_TYPE_TO_COLOR[type]} />
    <sphereGeometry />
  </mesh>;
};