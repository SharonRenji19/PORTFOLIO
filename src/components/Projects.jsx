import React from 'react';
import { resumeData } from '../data/resume';
import Section from './Section';
import { motion } from 'framer-motion';

const Projects = () => {
    return (
        <Section id="projects" className="py-20">
            <h2 className="text-4xl font-bold mb-12 text-center text-white font-mono uppercase tracking-widest"><span className="text-neon-red">02.</span> TRACK_RECORDS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {resumeData.projects.map((project, index) => (
                    <TiltCard key={index} project={project} />
                ))}
            </div>
        </Section>
    );
};

const TiltCard = ({ project }) => {
    const ref = React.useRef(null);
    const [rotation, setRotation] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transition: 'transform 0.1s ease-out'
            }}
            className="hud-panel p-8 transition-all duration-300 rounded-none group relative overflow-hidden"
        >
            <div className="flex justify-between items-start mb-4 border-b border-gray-800 pb-2">
                <h3 className="text-2xl font-bold text-white group-hover:text-neon-red transition-colors font-mono">{project.title}</h3>
                <span className="text-xs text-neon-blue font-mono border border-neon-blue px-2 py-1">SYS_ACTIVE</span>
            </div>

            <ul className="space-y-3 mt-4">
                {project.details.map((detail, i) => (
                    <li key={i} className="text-gray-400 text-sm leading-relaxed flex items-start font-mono">
                        <span className="text-neon-red mr-2">{'>'}</span>
                        {detail}
                    </li>
                ))}
            </ul>

            <div className="absolute bottom-2 right-2 flex gap-1">
                <div className="w-1 h-1 bg-neon-blue"></div>
                <div className="w-1 h-1 bg-neon-blue"></div>
                <div className="w-1 h-1 bg-neon-blue"></div>
            </div>
        </motion.div>
    );
};


export default Projects;
