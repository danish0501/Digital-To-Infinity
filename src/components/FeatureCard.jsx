import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, desc, index }) => {
    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const div = divRef.current;
        const rect = div.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <motion.div
            ref={divRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 px-8 max-[376px]:px-6 py-10 max-[376px]:py-6 shadow-2xl"
        >
            {/* The Spotlight Glow Effect */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
                }}
            />

            {/* The Border Reveal Effect */}
            <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.4), transparent 40%)`,
                }}
            />

            {/* Card Content */}
            <div className="relative flex h-full flex-col items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 shadow-inner">
                    <Icon className="h-6 w-6 text-violet-400" />
                </div>
                <div>
                    <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
                    <p className="text-slate-400 leading-relaxed">{desc}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default FeatureCard;