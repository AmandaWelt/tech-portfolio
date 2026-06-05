import React from "react";
import { CUBE_COLORS, CUBE_LAYOUT } from "./constants";

/**
 * Stacked blocks — MeshPhong reads lights directly, no HDR env map needed.
 * Different color per face = visible 3D on black.
 */
const CubeStack: React.FC = () => (
  <group>
    {CUBE_LAYOUT.map(([x, y, z, size], i) => {
      const c = CUBE_COLORS[i] ?? CUBE_COLORS[0];
      const mat = { shininess: 28, specular: "#222830" };
      return (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[size, size, size]} />
          <meshPhongMaterial attach="material-0" color={c.side} {...mat} />
          <meshPhongMaterial attach="material-1" color={c.side} {...mat} />
          <meshPhongMaterial attach="material-2" color={c.top} shininess={40} specular="#443828" />
          <meshPhongMaterial attach="material-3" color={c.bottom} shininess={12} specular="#111111" />
          <meshPhongMaterial attach="material-4" color={c.side} {...mat} />
          <meshPhongMaterial attach="material-5" color={c.side} {...mat} />
        </mesh>
      );
    })}
  </group>
);

export default CubeStack;
