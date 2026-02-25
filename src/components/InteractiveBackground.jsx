import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const InteractiveBackground = (props) => {
    const ref = useRef();
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

    // State to track mouse position smoothly
    const { viewport } = useThree();

    useFrame((state, delta) => {
        if (ref.current) {
            // Basic rotation
            ref.current.rotation.x -= delta / 15;
            ref.current.rotation.y -= delta / 20;

            // Mouse interaction
            // state.pointer.x and .y are normalized (-1 to 1)
            const x = state.pointer.x * viewport.width / 5;
            const y = state.pointer.y * viewport.height / 5;

            // Smoothly interpolate current rotation to target mouse rotation
            // We add a subtle "tilt" based on mouse position

            // We can also move the whole group slightly to create parallax
            // ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, x, 0.1);
            // ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, y, 0.1);

            // Let's affect rotation speed based on mouse distance from center?
            // Or just direct tilt
            ref.current.rotation.x += state.pointer.y * 0.001;
            ref.current.rotation.y += state.pointer.x * 0.001;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#00f7ff" // brand-cyan
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={2} // Additive blending for "glow" look
                />
            </Points>
        </group>
    );
};

export default InteractiveBackground;
