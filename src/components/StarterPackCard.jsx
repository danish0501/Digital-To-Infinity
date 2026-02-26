import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { starterFeatures } from "../data/mock";
import ContactPopup from "../components/ContactPopup";
import { useState } from 'react';

const StarterPackCard = () => {

    const [isContactOpen, setContactOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-5xl mx-auto mb-32 p-[2px] rounded-[2.5rem] overflow-hidden group"
            >
                {/* --- ANIMATED ROTATING BORDER (Violet/Blue) --- */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#8b5cf6_360deg)] opacity-70"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-50%] bg-[conic-gradient(from_90deg,transparent_0_340deg,#6366f1_360deg)] opacity-70 mix-blend-screen"
                />

                {/* INNER CARD CONTENT */}
                <div className="relative h-full bg-slate-950 rounded-[2.4rem] overflow-hidden border border-white/5">

                    {/* Floating Particles Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(10)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-violet-400/30 rounded-full"
                                initial={{ y: "100%", x: Math.random() * 100 + "%", opacity: 0 }}
                                animate={{
                                    y: "-100%",
                                    opacity: [0, 1, 0],
                                    scale: [0.5, 1.5, 0.5]
                                }}
                                transition={{
                                    duration: Math.random() * 5 + 5,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: Math.random() * 5
                                }}
                            />
                        ))}
                    </div>

                    {/* --- MAIN LAYOUT CONTAINER --- */}
                    <div className="relative z-10 p-8 md:p-12 flex max-[769px]:flex-col gap-12 items-center">

                        {/* LEFT SIDE: Sales Pitch */}
                        <div className="flex-1 max-[769px]:text-center">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                            >
                                <Sparkles className="w-3 h-3" /> Limited Time Offer
                            </motion.div>

                            <h2 className="text-4xl md:text-6xl max-[376px]:text-3xl font-black text-white mb-6 max-[376px]:mb-4 leading-tight">
                                Premium <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-300 to-blue-400 drop-shadow-lg">Starter Pack</span>
                            </h2>

                            <p className="text-slate-400 text-lg max-[321px]:text-base mb-8 max-w-md mx-auto md:mx-0 font-light">
                                Launch your digital presence with a powerful, all-in-one kit designed for speed and impact.
                            </p>

                            {/* PRICE BOX */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm inline-block w-full max-[769px]:w-[500px] max-[426px]:w-[320px] max-[376px]:w-[280px] max-[321px]:w-[220px]">
                                <div className="flex max-[376px]:flex-col items-end max-[376px]:items-center justify-start max-[769px]:justify-center gap-4">
                                    <div>
                                        <span className="block text-slate-500 text-lg font-medium line-through decoration-red-500/50 decoration-2">₹75,000</span>
                                        <span className="text-5xl max-[321px]:text-4xl font-bold text-white tracking-tighter">₹44,999</span>
                                    </div>
                                    <div className="flex flex-col justify-end pb-1">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">One-Time</span>
                                        <span className="text-xs font-bold text-green-400">Save 40%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Button */}
                            <div className="w-full flex justify-start max-[769px]:justify-center">
                                <button
                                    onClick={() => setContactOpen(true)}
                                    className="relative w-full max-[769px]:w-[500px] max-[426px]:w-[320px] max-[376px]:w-[280px] max-[321px]:w-[220px] px-10 max-[321px]:px-6 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all duration-300 group/btn overflow-hidden cursor-pointer">
                                    <span className="relative z-10 flex items-center justify-center gap-2 max-[321px]:text-base">
                                        Get Started Now <ArrowRight className="w-5 max-[321px]:w-4 h-5 max-[321px]:h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 bg-white/20 skew-x-12" />
                                </button>
                            </div>
                        </div>

                        {/* RIGHT SIDE: Features Grid */}
                        <div className="flex-1 w-full">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {starterFeatures.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 transition-colors cursor-default"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shrink-0 border border-white/10 shadow-inner group-hover:border-violet-500/30 transition-colors">
                                            <item.icon className="w-5 h-5 text-violet-400" />
                                        </div>
                                        <span className="text-sm text-slate-300 font-medium leading-snug">{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>

            {/* RENDER POPUP COMPONENT */}
            <ContactPopup
                isOpen={isContactOpen}
                onClose={() => setContactOpen(false)}
            />
        </>
    );
};

export default StarterPackCard;