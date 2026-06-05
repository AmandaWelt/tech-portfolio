import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group } from "three";
import CubeStack from "./CubeStack";
import GlowOrb from "./GlowOrb";
import HeroLights from "./HeroLights";
import { HERO_BG, SCENE_ROTATION } from "./constants";

const Stage: React.FC = () => {
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.y = SCENE_ROTATION.y + Math.sin(t * 0.05) * 0.02;
    ref.current.rotation.x = SCENE_ROTATION.x + Math.sin(t * 0.04) * 0.01;
  });

  return (
    <group ref={ref} position={[0, -0.2, 0]} scale={1.28}>
      <HeroLights />
      <CubeStack />
      <GlowOrb />
    </group>
  );
};

/** Simple R3F scene — blocks + lamp, default render, no post-processing */
const HeroScene: React.FC = () => (
  <Canvas
    className="hero-scene-canvas"
    camera={{ position: [0, 0.2, 6], fov: 40 }}
    gl={{ antialias: true, alpha: false }}
    dpr={[1, 1.75]}
    onCreated={({ gl }) => gl.setClearColor(HERO_BG, 1)}
  >
    <color attach="background" args={[HERO_BG]} />
    <Stage />
  </Canvas>
);

export default HeroScene;
