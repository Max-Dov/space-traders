import React from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { MapControls } from '@react-three/drei';
import { StarSystem as StarSystemType } from '@types';
import { Waypoint } from './waypoint.component';
import {
  BackSide,
  BoxGeometry, DoubleSide,
  EquirectangularReflectionMapping, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, SphereGeometry,
  SRGBColorSpace,
  TextureLoader
} from 'three';
import { texture } from 'three/examples/jsm/nodes/accessors/TextureNode';

interface StarSystemProps {
  starSystem: StarSystemType;
  isDevMode?: boolean;
}

// todo scale waypoints with zoom, keep 'em detailed when zoning out and smaller when taking closer look
// todo add orbit lines for orbitals
// todo rotate orbitals heh?
// done add fancy bg (consider 2 bit quantization of star maps)
// done add parallax
// todo add zoom/dimensions control
// todo zoom out just enough to see all objects in scene
// todo rotate camera on x/y to save vertical space
// todo use orthographic camera

export const StarSystem = ({ starSystem }: StarSystemProps) => {
  const { waypoints } = starSystem;

  return <Canvas camera={{ position: [0, 50, 120] }}>
    <Skybox />
    <MapControls />
    <ambientLight intensity={7} color="#5A395C" />
    <pointLight intensity={50} decay={0.5} color="#EDB88B">
      <sphereGeometry />
      <meshBasicMaterial color={'white'} />
    </pointLight>
    <group rotation={[Math.PI / 2, 0, 0]}>
      {waypoints.map(waypoint =>
        <Waypoint waypoint={waypoint} key={waypoint.symbol} />
      )}
    </group>
  </Canvas>;
};

const Skybox = () => {
  const { scene } = useThree();
  const loader = new TextureLoader();

  scene.background = loader.load(
    '/skybox-4.png',
    (texture) => {
      texture.mapping = EquirectangularReflectionMapping;
      texture.colorSpace = SRGBColorSpace;
      scene.background = texture;
    }
  );

  new TextureLoader().load(
    '/skybox-6.png',
    (texture) => {
      texture.mapping = EquirectangularReflectionMapping;
      texture.colorSpace = SRGBColorSpace;
      const geometry = new SphereGeometry(300);
      const material = new MeshStandardMaterial({
        map: texture,
        transparent: true,
        side: BackSide,
        alphaTest: 0.5,
      });
      const mesh = new Mesh(geometry, material);
      scene.add(mesh);
    }
  );

  new TextureLoader().load(
    '/skybox-7.png',
    (texture) => {
      texture.mapping = EquirectangularReflectionMapping;
      texture.colorSpace = SRGBColorSpace;
      const geometry = new SphereGeometry(700);
      const material = new MeshStandardMaterial({
        map: texture,
        transparent: true,
        side: BackSide,
        alphaTest: 0.5,
      });
      const mesh = new Mesh(geometry, material);
      scene.add(mesh);
    }
  );

  return null;
};