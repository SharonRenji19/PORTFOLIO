import React from 'react';
import { resumeData } from '../data/resume';
import Section from './Section';

const Contact = () => {
    const { header } = resumeData;

    return (
        <Section id="contact" className="py-20 mb-20 text-center">
            <h2 className="text-neon-blue font-mono text-sm mb-4 tracking-widest border border-neon-blue inline-block px-4 py-1">04. FINAL_TRANSMISSION</h2>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 uppercase italic transform -skew-x-6">Get In Touch</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-12 text-lg font-mono">
                // Currently scanning for new opportunities as an Automation Engineer or Personal Assistant.
            // Channel open for communications.
            </p>

            <a
                href={`mailto:${header.email}`}
                className="inline-block px-8 py-4 bg-neon-red text-black hover:bg-white hover:text-black transition-all text-lg font-bold font-mono uppercase tracking-widest skew-x-[-10deg]"
            >
                <span className="skew-x-[10deg] inline-block">INITIATE_CONTACT</span>
            </a>

            <footer className="absolute bottom-5 left-0 w-full text-center text-gray-600 text-xs font-mono">
                <p>SYSTEM_ID: SHARON_PORTFOLIO_V2.0 // DEPLOYED</p>
            </footer>
        </Section>
    );
};

export default Contact;
