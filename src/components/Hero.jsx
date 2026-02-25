import React from 'react';
import { resumeData } from '../data/resume';
import Section from './Section';

const Hero = () => {
    const { header } = resumeData;

    return (
        <Section id="hero" className="h-screen flex items-center justify-start relative overflow-hidden pointer-events-none">
            <div className="max-w-4xl z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Panel: Driver Info */}
                <div className="pointer-events-auto">
                    <div className="hud-panel p-6 rounded-tl-3xl rounded-br-3xl mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-neon-red rounded-full animate-pulse" />
                            <h2 className="text-neon-blue font-mono text-sm tracking-widest">DRIVER_PROFILE_LOADED</h2>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-2 text-white tracking-tighter uppercase italic transform -skew-x-12">
                            {header.name}
                        </h1>
                        <h3 className="text-xl md:text-2xl text-gray-400 font-mono border-l-2 border-neon-red pl-4">
                            {header.title}
                        </h3>
                    </div>

                    <p className="text-gray-300 max-w-lg mb-8 leading-relaxed font-mono text-sm bg-black/50 p-4 border-l border-neon-blue">
                        {header.summary}
                    </p>

                    <div className="flex gap-4">
                        <a href={`mailto:${header.email}`} className="px-8 py-3 bg-neon-red/10 border border-neon-red text-neon-red hover:bg-neon-red hover:text-black transition-all font-mono uppercase tracking-wider skew-x-[-10deg] inline-block">
                            <span className="skew-x-[10deg] inline-block">Ignite Comms</span>
                        </a>
                        <a href={`https://${header.linkedin}`} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-neon-blue/10 border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-all font-mono uppercase tracking-wider skew-x-[-10deg] inline-block">
                            <span className="skew-x-[10deg] inline-block">Network Link</span>
                        </a>
                    </div>
                </div>

                {/* Right Panel: Spec Sheet */}
                <div className="hidden md:flex flex-col justify-center items-end pointer-events-auto">
                    <div className="hud-panel p-6 w-full max-w-xs">
                        <h4 className="text-neon-blue border-b border-gray-700 pb-2 mb-4 font-mono text-xs">VEHICLE SPECS</h4>
                        <div className="space-y-4 font-mono">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">MODEL</span>
                                <span className="text-white font-bold">MK-2025</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">CLASS</span>
                                <span className="text-neon-red">ENGINEER</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">STATUS</span>
                                <span className="text-green-500 animate-pulse">ONLINE</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">FOCUS</span>
                                <span className="text-white">AIML / AUTO</span>
                            </div>
                            <div className="w-full bg-gray-800 h-1 mt-2">
                                <div className="bg-neon-blue h-full w-[85%] animate-pulse"></div>
                            </div>
                            <div className="text-xs text-right text-neon-blue mt-1">SYS_OPTIMAL</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Background is handled by Canvas */}
        </Section>
    );
};

export default Hero;
