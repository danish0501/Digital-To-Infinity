import { useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { modules } from '../data/mock';
import ContactPopup from "../components/ContactPopup";

const StackedCard = ({ module, total }) => {
    const colorClasses = {
        orange: "text-orange-400 border-orange-500/30 bg-orange-500/10",
        yellow: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
        pink: "text-pink-400 border-pink-500/30 bg-pink-500/10",
        emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
        violet: "text-violet-400 border-violet-500/30 bg-violet-500/10",
        blue: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    };

    const bgGlow = {
        orange: "bg-orange-500",
        yellow: "bg-yellow-500",
        pink: "bg-pink-500",
        emerald: "bg-emerald-500",
        violet: "bg-violet-500",
        blue: "bg-blue-500",
    };

    return (
        <div className="sticky top-24 md:top-32 mb-12 md:mb-24 w-full" style={{ willChange: "transform" }}>
            <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.95 }}
                whileInView={{ y: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`relative overflow-hidden rounded-3xl border border-white/10 bg-[#0f1115] ${module.shadow}`}
            >
                {/* Top Gradient Bar */}
                <div className={`h-2 w-full bg-gradient-to-r ${module.gradient}`} />

                {/* Content Container */}
                <div className="relative p-6 md:p-10 lg:p-12">

                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                    {/* Glowing Orb in Background */}
                    <div className={`absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[80px] opacity-10 pointer-events-none ${bgGlow[module.theme]}`} />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                        {/* Left Column: Title & Info */}
                        <div className="lg:col-span-5 flex flex-col justify-between h-full">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold tracking-widest border uppercase ${colorClasses[module.theme]}`}>
                                        Module {module.id}/{total}
                                    </div>
                                    <div className="h-px flex-1 bg-white/10" />
                                </div>

                                <h2 className="text-3xl max-[426px]:text-2xl max-[321px]:text-xl md:text-5xl font-black text-white mb-2 tracking-tight">
                                    {module.title}
                                </h2>
                                <p className={`text-sm font-bold tracking-wider uppercase mb-6 opacity-80 ${colorClasses[module.theme].split(' ')[0]}`}>
                                 // {module.subtitle}
                                </p>

                                <p className="text-slate-400 text-lg max-[321px]:text-base leading-relaxed mb-8">
                                    {module.description}
                                </p>
                            </div>

                            <div className="hidden lg:block">
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/5 bg-white/5 text-sm text-slate-300 italic`}>
                                    <Zap className={`w-4 h-4 ${colorClasses[module.theme].split(' ')[0]}`} />
                                    "{module.tagline}"
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Features List */}
                        <div className="lg:col-span-7 bg-white/5 rounded-2xl p-6 md:p-8 border border-white/5 backdrop-blur-sm">
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`p-3 rounded-xl ${colorClasses[module.theme]}`}>
                                    <module.icon className="w-6 max-[376px]:w-5 max-[321px]:w-3 h-6 max-[376px]:h-5 max-[321px]:h-3" />
                                </div>
                                <h3 className="text-xl max-[376px]:text-lg max-[321px]:text-sm font-bold text-white">System Capabilities</h3>
                            </div>

                            <ul className="space-y-4 max-[426px]:space-y-3">
                                {module.features.map((feature, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="flex items-start gap-4"
                                    >
                                        <CheckCircle2 className={`w-5 max-[426px]:w-4 h-5 max-[426px]:h-4 mt-1 shrink-0 ${colorClasses[module.theme].split(' ')[0]}`} />
                                        <span className="text-slate-300 text-base max-[426px]:text-[13px] max-[376px]:text-[11px] leading-snug">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="lg:hidden mt-8 pt-6 border-t border-white/10">
                                <p className="text-sm italic text-slate-400">"{module.tagline}"</p>
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
const GrowthEngine = () => {

    const [isContactOpen, setContactOpen] = useState(false);
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            <div className="min-h-screen bg-[#050505] font-sans text-white overflow-hidden relative selection:bg-indigo-500/30">

                {/* Global Ambient Background */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-blue-900/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-1/4 w-[800px] h-[600px] bg-purple-900/10 rounded-full blur-[100px]" />
                </div>

                <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

                    {/* HERO HEADER */}
                    <div className="text-center max-w-4xl mx-auto mb-32 relative">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-white"
                        >
                            GROWTH <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-purple-600">
                                ENGINE
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
                        >
                            The comprehensive system designed to scale your business.
                            <span className="text-white font-semibold"> 6 Powerful Modules</span> working in perfect synchronization.
                        </motion.p>
                    </div>

                    {/* STACKING CONTAINER */}
                    <div className="relative flex flex-col md:flex-row gap-8">

                        {/* Progress Bar (Left Side) - Desktop Only */}
                        <div className="hidden md:block w-1 relative mt-32">
                            <div className="absolute top-0 bottom-0 w-px bg-white/10 left-1/2 -translate-x-1/2" />
                            <motion.div
                                style={{ scaleY, transformOrigin: "top" }}
                                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 left-1/2 -translate-x-1/2 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                            />
                        </div>

                        {/* Cards Column */}
                        <div className="flex-1">
                            {modules.map((module, index) => (
                                <StackedCard
                                    key={module.id}
                                    module={module}
                                    index={index}
                                    total={modules.length}
                                />
                            ))}
                        </div>
                    </div>

                    {/* FINAL CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-32 max-[426px]:mt-4 text-center"
                    >
                        <div className="relative inline-block group">
                            <button
                                onClick={() => setContactOpen(true)}
                                className="relative px-16 max-[321px]:px-12 py-4 max-[321px]:py-3 bg-white text-black rounded-full font-bold text-xl max-[321px]:text-lg flex items-center gap-4 transition-all duration-300 hover:shadow-[0_0_35px_rgba(255,255,255,0.8)] hover:bg-white cursor-pointer"
                            >
                                <div className="flex flex-col items-start leading-none">
                                    <span>Get Started Now</span>
                                </div>
                                <ArrowRight className="w-6 max-[321px]:w-5 h-6 max-[321px]:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* RENDER POPUP COMPONENT */}
            <ContactPopup
                isOpen={isContactOpen}
                onClose={() => setContactOpen(false)}
            />
        </>
    );
};

export default GrowthEngine;