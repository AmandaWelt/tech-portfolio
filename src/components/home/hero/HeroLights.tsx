const HeroLights: React.FC = () => (
  <>
    <ambientLight intensity={0.55} />
    <hemisphereLight color="#8898a8" groundColor="#111111" intensity={0.35} />
    <directionalLight position={[4, 8, 6]} intensity={0.9} color="#e0e8f0" />
    <directionalLight position={[-3, 2, 4]} intensity={0.35} color="#8090a0" />
  </>
);

export default HeroLights;
