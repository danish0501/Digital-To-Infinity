import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import CountUp from 'react-countup';
import { useRef } from 'react';

const StatCard = ({ icon: Icon, value, label, prefix = "", suffix = "", delay }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // --- 3D TILT LOGIC ---
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth out the mouse movement
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);
    const brightness = useTransform(mouseY, [-0.5, 0.5], ["1.2", "0.8"]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
            style={{
                perspective: 1000,
            }}
            className="relative h-full"
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    filter: `brightness(${brightness})`,
                }}
                className="relative h-full group cursor-pointer"
            >
                {/* Neon Glow behind the card */}
                <div
                    className="absolute inset-4 bg-violet-600 rounded-xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ transform: "translateZ(-50px)" }}
                />

                {/* Main Glass Card */}
                <div className="relative h-full bg-slate-950/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl overflow-hidden">

                    {/* The "Sheen" Gradient that moves across on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:animate-sheen z-0 pointer-events-none" />

                    {/* Background Blob */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    {/* CONTENT CONTAINER - Pops out in 3D */}
                    <div style={{ transform: "translateZ(50px)" }} className="relative flex flex-col items-center justify-center z-10">

                        {/* Icon */}
                        <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-white/10 flex items-center justify-center shadow-lg group-hover:shadow-violet-500/30 group-hover:scale-110 transition-all duration-500">
                            <Icon className="w-8 h-8 text-violet-400 group-hover:text-white drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-colors duration-500" />
                        </div>

                        {/* Number */}
                        <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
                            {isInView ? (
                                <CountUp
                                    start={0}
                                    end={value}
                                    duration={2.5}
                                    separator=","
                                    prefix={prefix}
                                    suffix={suffix}
                                />
                            ) : (
                                <span>0</span>
                            )}
                        </h3>

                        {/* Label */}
                        <p className="text-sm font-bold tracking-widest text-indigo-200/60 uppercase">
                            {label}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default StatCard;