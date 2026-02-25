import { motion } from 'framer-motion';
import clsx from 'clsx';

const Section = ({ children, className, id }) => {
    return (
        <section
            id={id}
            className={clsx(
                "min-h-screen w-full flex flex-col justify-center items-center p-8 md:p-16 relative z-10",
                className
            )}
        >
            <div className="max-w-6xl w-full mx-auto">
                {children}
            </div>
        </section>
    );
};

export default Section;
