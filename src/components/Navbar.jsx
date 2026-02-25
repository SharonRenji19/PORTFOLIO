import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navLinks = [
        { title: "Home", id: "hero" },
        { title: "Experience", id: "experience" },
        { title: "Projects", id: "projects" },
        { title: "Skills", id: "skills" },
        { title: "Contact", id: "contact" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-gray-800' : 'bg-transparent py-6'}`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div
                    className="text-2xl font-bold font-mono text-white cursor-pointer group" // Added group
                    onClick={() => scrollToSection('hero')}
                >
                    <span className="text-brand-cyan group-hover:text-brand-purple transition-colors">&lt;</span>
                    SR
                    <span className="text-brand-cyan group-hover:text-brand-purple transition-colors">/&gt;</span>
                </div>

                <ul className="hidden md:flex flex-row space-x-8">
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <button
                                onClick={() => scrollToSection(link.id)}
                                className="text-sm font-mono text-gray-300 hover:text-brand-cyan transition-colors"
                                aria-label={`Scroll to ${link.title}`} // Added for accessibility
                            >
                                <span className="text-brand-cyan mr-1">0{navLinks.indexOf(link) + 1}.</span> {link.title}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Mobile menu button could go here */}
                <div className="md:hidden">
                    {/* Simple hamburger? */}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
