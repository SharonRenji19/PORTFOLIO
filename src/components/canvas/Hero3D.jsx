import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Torus } from '@react-three/drei';

const AnimatedCore = () => {
    const sphereRef = useRef();
    const torusRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (sphereRef.current) {
            sphereRef.current.rotation.y = t * 0.5;
            sphereRef.current.rotation.z = t * 0.2;
        }
        if (torusRef.current) {
            torusRef.current.rotation.x = t * 0.3;
            torusRef.current.rotation.y = t * 0.4;
        }
    });

    return (
        <group
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            scale={hovered ? 1.2 : 1}
        >
            <Sphere ref={sphereRef} args={[1.5, 64, 64]}>
                <MeshDistortMaterial
                    color={hovered ? "#bd0bff" : "#00f7ff"}
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
            <Torus ref={torusRef} args={[2.2, 0.1, 16, 100]} rotation={[1.5, 0, 0]}>
                <meshStandardMaterial color="#ffffff" wireframe />
            </Torus>
        </group>
    );
};

const Hero3D = () => {
    return (
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-full md:w-1/2 h-full z-0 opacity-50 md:opacity-100 pointer-events-auto">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#bd0bff" />
                <AnimatedCore />
            </Canvas>
        </div>
    );
};

export default Hero3D;
