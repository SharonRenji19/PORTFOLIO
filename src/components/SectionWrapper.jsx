import React, { useRef } from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

/**
 * SectionWrapper
 * 
 * Wraps content to apply scroll-based opacity and scale transformations.
 * It uses a ref to manipulate the DOM element's style directly for performance.
 * 
 * @param {children} - Content to wrap
 * @param {offset} - Integer index of the section (0, 1, 2, etc.)
 * @param {factor} - Duration factor (default 1 page)
 */
const SectionWrapper = ({ children, offset, factor = 1 }) => {
    const ref = useRef();
    const scroll = useScroll();

    useFrame(() => {
        if (!ref.current) return;

        // Normalize offset: logic assumes 'offset' is an integer index (0, 1, 2...)
        // We convert it to 0..1 range.
        const pageDuration = 1 / scroll.pages;
        const start = offset * pageDuration;

        // Calculate progress as we scroll away from this section
        const y = scroll.range(start, pageDuration * factor);

        // Zoom Out / Fade Out on departure
        ref.current.style.opacity = Math.max(0, 1 - y);
        // Scale goes from 1 to 0.8
        ref.current.style.transform = `scale(${1 - y * 0.2})`;
    });

    return (
        <div ref={ref} className="w-full h-screen relative flex flex-col justify-center items-center">
            {children}
        </div>
    );
};

export default SectionWrapper;
