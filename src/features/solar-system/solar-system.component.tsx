import { Canvas } from '@react-three/fiber';
import React from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';

export const SolarSystem = () => {
  const gltf = useGLTF('/orangeBig.gltf');
  console.log(gltf)

  return <Canvas>
    <OrbitControls makeDefault />

    <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
    <ambientLight intensity={ 1.5 } />
    
    <Model />
  </Canvas>
};

export function Model(props) {
  const { nodes, materials } = useGLTF("/orangeBig.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        name="body"
        castShadow
        receiveShadow
        geometry={nodes.body.geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      >
        <meshBasicMaterial color={"red"}/>
      </mesh>
      <mesh
        name="front_enge"
        castShadow
        receiveShadow
        geometry={nodes.front_enge.geometry}
        material={materials.DefaultMaterial}
        position={[-0.3676, -0.0743, 0.1454]}
        scale={100}
      />
      <mesh
        name="midle_enge"
        castShadow
        receiveShadow
        geometry={nodes.midle_enge.geometry}
        material={materials.DefaultMaterial}
        position={[-0.4125, -0.009, -0.1744]}
        scale={100}
      />
      <mesh
        name="Cylinder"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials.DefaultMaterial}
        position={[-0.1448, 0.0423, -0.3606]}
        scale={100}
      />
      <mesh
        name="Cylinder001"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={materials.DefaultMaterial}
        position={[-0.0956, 0.1782, -0.904]}
        rotation={[0, 0, -0.595]}
        scale={100}
      />
      <mesh
        name="Cube"
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.DefaultMaterial}
        position={[-0.0866, 0.218, -0.9726]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        name="front_enge001"
        castShadow
        receiveShadow
        geometry={nodes.front_enge001.geometry}
        material={materials.DefaultMaterial}
        position={[-0.3055, -0.0143, 0.1173]}
        rotation={[0, 0, 0.0815]}
        scale={100}
      />
      <mesh
        name="Plane"
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials.DefaultMaterial}
        position={[-0.4121, 0.1154, -0.1771]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload("/orangeBig.gltf");
