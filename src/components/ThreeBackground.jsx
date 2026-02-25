import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const ThreeBackground = (props) => {
    const ref = useRef();
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));
    const scroll = useScroll(); // Access scroll data

    useFrame((state, delta) => {
        if (ref.current) {
            // Constant rotation
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;

            // Scroll-based movement
            // As we scroll down (offset 0 -> 1), move the group "forward" or rotate it more
            // Let's make it feel like travelling through space
            const offset = scroll.offset; // 0 to 1

            // Move camera or group based on scroll
            // Here we move the group slightly to give parallax
            ref.current.position.z = offset * 2; // Zoom in/out effect
            ref.current.rotation.z = offset * Math.PI; // Spin effect on scroll
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#00f7ff" // brand-cyan
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

export default ThreeBackground;
