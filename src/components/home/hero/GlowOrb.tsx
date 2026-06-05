import React from "react";
import { CENTER_CUBE_SIZE, CENTER_CUBE_Y } from "./constants";

const ORB_RADIUS = 0.28;
/** Extra lift so the orb sits above the stack and reads in the hero */
const ORB_LIFT = 0.42;

const GlowOrb: React.FC = () => {
  const y = CENTER_CUBE_Y + CENTER_CUBE_SIZE / 2 + ORB_RADIUS + ORB_LIFT;

  return (
    <group position={[0, y, 0.22]}>
      <mesh>
        <sphereGeometry args={[ORB_RADIUS * 2.4, 24, 24]} />
        <meshBasicMaterial color="#ff5500" transparent opacity={0.22} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[ORB_RADIUS, 32, 32]} />
        <meshBasicMaterial color="#ffcc55" />
      </mesh>
      <pointLight color="#ff8833" intensity={18} distance={7} decay={1.8} />
    </group>
  );
};

export default GlowOrb;
