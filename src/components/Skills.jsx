import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Sphere } from '@react-three/drei';
import { resumeData } from '../data/resume';
import Section from './Section';
import * as THREE from 'three';

const Word = ({ children, position }) => {
    const ref = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame(({ camera }) => {
        if (ref.current) {
            // Make text always face the camera
            ref.current.lookAt(camera.position);
        }
    });

    return (
        <Text
            ref={ref}
            position={position}
            fontSize={hovered ? 0.25 : 0.15}
            color={hovered ? "#ff0f0f" : "#00f7ff"}
            anchorX="center"
            anchorY="middle"
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            font="/fonts/GeistMono-Regular.ttf" // Fallback to default if not found, but prop is safe
        >
            {children}
        </Text>
    );
};

const Cloud = ({ skills, radius = 2 }) => {
    // Distribute words on a sphere
    const words = useMemo(() => {
        const temp = [];
        const phiSpan = Math.PI * (3 - Math.sqrt(5)); // Golden Angle

        skills.forEach((skill, i) => {
            const y = 1 - (i / (skills.length - 1)) * 2;
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = phiSpan * i;
            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;
            temp.push([new THREE.Vector3(x * radius, y * radius, z * radius), skill]);
        });
        return temp;
    }, [skills, radius]);

    const groupRef = useRef();

    useFrame((state, delta) => {
        // Auto rotate
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {words.map(([pos, word], i) => (
                <Word key={i} position={pos}>{word}</Word>
            ))}
            {/* Holographic Wireframe Core */}
            <Sphere args={[radius * 0.8, 16, 16]}>
                <meshBasicMaterial color="#ff0f0f" wireframe transparent opacity={0.1} />
            </Sphere>
        </group>
    );
};

const Skills = () => {
    const allSkills = [
        ...resumeData.skills.technical,
        ...resumeData.skills.soft,
        ...resumeData.skills.languages
    ];

    return (
        <Section id="skills" className="py-20 min-h-screen flex flex-col items-center justify-center pointer-events-none">
            <div className="hud-panel p-4 mb-8 pointer-events-auto z-10">
                <h2 className="text-4xl font-bold text-center text-white uppercase tracking-widest">
                    <span className="text-neon-red">03.</span> ENGINE_CORE
                </h2>
                <div className="w-full h-1 bg-neon-blue mt-2 animate-pulse" />
            </div>

            <div className="w-full h-[600px] pointer-events-auto">
                <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                    <fog attach="fog" args={['#050505', 0, 15]} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} color="#00f7ff" />
                    <Cloud skills={allSkills} radius={2.5} />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            <div className="text-neon-blue font-mono text-xs mt-4 animate-bounce">
                // HOVER TO INSPECT COMPONENTS
            </div>
        </Section>
    );
};

export default Skills;
