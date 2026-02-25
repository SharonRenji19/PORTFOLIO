import React from 'react';
import { resumeData } from '../data/resume';
import Section from './Section';

const Experience = () => {
    return (
        <Section id="experience" className="py-20">
            <h2 className="text-4xl font-bold mb-12 text-center text-white font-mono uppercase tracking-widest"><span className="text-neon-blue">01.</span> CAREER_CIRCUIT</h2>
            <div className="space-y-12 relative">
                {/* Timeline Line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-800 transform md:-translate-x-1/2 hidden md:block">
                    <div className="w-1 h-full bg-gradient-to-b from-transparent via-neon-red to-transparent opacity-50"></div>
                </div>

                {resumeData.experience.map((job, index) => (
                    <div key={index} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="flex-1 w-full text-left md:text-right">
                            {index % 2 === 0 && (
                                <TiltCard>
                                    <h3 className="text-xl font-bold text-white group-hover:text-neon-red transition-colors font-mono">{job.role}</h3>
                                    <p className="text-neon-blue text-sm mb-2 font-mono tracking-widest">{job.company}</p>
                                    <p className="text-gray-500 text-xs mb-4 font-mono">{job.period}</p>
                                    <ul className="list-none space-y-2">
                                        {job.description.map((desc, i) => (
                                            <li key={i} className="text-gray-400 text-sm font-mono border-l border-gray-800 pl-2">{desc}</li>
                                        ))}
                                    </ul>
                                </TiltCard>
                            )}
                        </div>

                        <div className="w-4 h-4 rounded-full bg-black border border-neon-red shadow-[0_0_10px_#ff0f0f] z-10 shrink-0 mx-auto md:mx-0 relative">
                            <div className="absolute inset-0 bg-neon-red opacity-50 animate-ping rounded-full"></div>
                        </div>

                        <div className="flex-1 w-full text-left">
                            {index % 2 !== 0 && (
                                <TiltCard>
                                    <h3 className="text-xl font-bold text-white group-hover:text-neon-red transition-colors font-mono">{job.role}</h3>
                                    <p className="text-neon-blue text-sm mb-2 font-mono tracking-widest">{job.company}</p>
                                    <p className="text-gray-500 text-xs mb-4 font-mono">{job.period}</p>
                                    <ul className="space-y-2">
                                        {job.description.map((desc, i) => (
                                            <li key={i} className="text-gray-400 text-sm font-mono border-l border-gray-800 pl-2">{desc}</li>
                                        ))}
                                    </ul>
                                </TiltCard>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

const TiltCard = ({ children }) => {
    const ref = React.useRef(null);
    const [rotation, setRotation] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Max 5 deg rotation for experience
        const rotateY = ((x - centerX) / centerX) * 5;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transition: 'transform 0.1s ease-out'
            }}
            className="hud-panel p-6 rounded-none group relative"
        >
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-neon-red"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-neon-blue"></div>
            {children}
        </div>
    );
};


export default Experience;
