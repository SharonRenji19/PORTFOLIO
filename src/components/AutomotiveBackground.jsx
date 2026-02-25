import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';

const RoadLines = ({ count = 20, speed = 20, laneOffset = 2.5, color = "#00f7ff" }) => {
    const lines = useMemo(() => {
        return new Array(count).fill(0).map((_, i) => ({
            z: -i * 10,
            scale: [0.1, 0.05, 5]
        }));
    }, [count]);

    const ref = useRef();

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.children.forEach((child) => {
                // Move lines towards camera
                child.position.z += speed * delta;

                // Reset when too close
                if (child.position.z > 5) {
                    child.position.z = -((count * 10) - 5);
                }
            });
        }
    });

    return (
        <Instances range={count} ref={ref}>
            <boxGeometry />
            <meshBasicMaterial color={color} />
            {lines.map((data, i) => (
                <Instance
                    key={i}
                    position={[laneOffset, -1, data.z]}
                    scale={data.scale}
                />
            ))}
            {lines.map((data, i) => (
                <Instance
                    key={`left-${i}`}
                    position={[-laneOffset, -1, data.z]}
                    scale={data.scale}
                />
            ))}
        </Instances>
    );
};

const GridFloor = () => {
    // A moving grid floor
    const ref = useRef();

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.position.z += 10 * delta;
            if (ref.current.position.z > 10) {
                ref.current.position.z = 0;
            }
        }
    });

    return (
        <gridHelper
            ref={ref}
            args={[200, 50, 0x333333, 0x111111]}
            position={[0, -1.1, -50]}
        />
    );
}


const AutomotiveBackground = () => {
    const groupRef = useRef();
    const { viewport } = useThree();

    useFrame((state) => {
        if (groupRef.current) {
            // Steering effect
            // state.pointer.x is -1 to 1
            const x = state.pointer.x * 0.5;
            const y = state.pointer.y * 0.2;

            // Rotate the whole world based on mouse to simulate car turning
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -x * 0.5, 0.1);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, y * 0.2, 0.1);

            // Look into the turn
            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, -x * 5, 0.1);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Fog for distance fading */}
            <fog attach="fog" args={['#050505', 10, 50]} />

            <RoadLines color="#00f7ff" laneOffset={4} />
            <RoadLines color="#ff0f0f" laneOffset={12} speed={15} /> {/* Slower outer lane */}

            <GridFloor />

            {/* Distant skyline / mountains wireframe could go here */}

            {/* Ambient light */}
            <ambientLight intensity={0.5} />
        </group>
    );
};

export default AutomotiveBackground;
