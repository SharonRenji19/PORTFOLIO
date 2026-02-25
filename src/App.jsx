import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import AutomotiveBackground from './components/AutomotiveBackground';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Navbar from './components/Navbar';

function App() {
    return (
        <>
            <Navbar />

            {/* 3D Background - Fixed Position */}
            <div className="fixed inset-0 z-0 bg-carbon">
                <Canvas camera={{ position: [0, 1, 5], fov: 75 }}>
                    <Suspense fallback={null}>
                        <AutomotiveBackground />
                    </Suspense>
                </Canvas>
            </div>

            {/* Main Content - Native Scroll */}
            <main className="relative z-10 w-full overflow-x-hidden selection:bg-brand-cyan selection:text-black">
                <Hero />
                <Experience />
                <Projects />
                <Skills />
                <Contact />
            </main>

            <Loader />
        </>
    );
}

export default App;
