import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Check, Star, ArrowRight } from 'lucide-react';

const PackageCard = ({ plan, showToggle = true, staticPeriod }) => {
    const ref = useRef(null);
    const [billingCycle, setBillingCycle] = useState('monthly');

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;
        x.set(mouseXPos / rect.width - 0.5);
        y.set(mouseYPos / rect.height - 0.5);
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };

    const rotateX = useMotionTemplate`${mouseY.get() * -20}deg`;
    const rotateY = useMotionTemplate`${mouseX.get() * 20}deg`;

    const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        // Handle "K" or other suffixes if necessary, though currently they are mostly numeric strings
        const cleaned = priceStr.replace(/[₹,]/g, '').toLowerCase();
        if (cleaned.includes('k')) return parseFloat(cleaned.replace('k', '')) * 1000;
        return parseInt(cleaned) || 0;
    };

    const formatPrice = (num) => {
        return new Intl.NumberFormat('en-IN').format(num);
    };

    const currentPrice = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    const periodDisplay = showToggle ? (billingCycle === 'monthly' ? '/mo' : '/yr') : (staticPeriod || '/mo');
    const originalYearlyPrice = parsePrice(plan.monthlyPrice) * 12;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: "preserve-3d", transform: `perspective(1000px) rotateX(${rotateX}) rotateY(${rotateY}) scale(1)` }}
            className={`relative h-full w-full rounded-[2rem] transition-all duration-200 ease-out group`}
        >
            <div className={`absolute -inset-[2px] rounded-[2.1rem] bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`} />

            <div className={`relative h-full flex flex-col p-8 rounded-[2rem] bg-slate-900/90 backdrop-blur-xl border border-white/10 group-hover:border-transparent transition-all duration-300 z-10`}>

                {/* BILLING TOGGLE */}
                {showToggle && (
                    <div className="flex justify-center mb-6 relative z-20">
                        <div className="p-1 bg-white/5 border border-white/10 rounded-full flex gap-1 backdrop-blur-md">
                            {['monthly', 'yearly'].map((cycle) => (
                                <button
                                    key={cycle}
                                    onClick={() => setBillingCycle(cycle)}
                                    className={`relative px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${billingCycle === cycle ? 'text-white' : 'text-slate-500 hover:text-white'}`}
                                >
                                    {billingCycle === cycle && (
                                        <motion.div
                                            layoutId={`toggle-${plan.id}`}
                                            className="absolute inset-0 bg-violet-600 rounded-full z-0"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{cycle}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mb-8 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} p-[1px] mb-6`}>
                        <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
                            <plan.icon className={`w-7 h-7 text-white`} />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{plan.desc}</p>
                </div>

                <div className="mb-8 pb-8 border-b border-white/5 relative z-10">
                    {billingCycle === 'yearly' && originalYearlyPrice > 0 && (
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-slate-500 line-through text-lg md:text-xl font-medium decoration-slate-600">
                                ₹{formatPrice(originalYearlyPrice)}
                            </span>
                        </div>
                    )}
                    <div className="flex items-end gap-1 mb-2">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentPrice}
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="text-3xl md:text-4xl font-bold text-white tracking-tight"
                            >
                                ₹{currentPrice}
                            </motion.span>
                        </AnimatePresence>
                        <span className="text-slate-500 font-medium mb-1">{periodDisplay}</span>
                    </div>

                    {billingCycle === 'yearly' && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-block px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase mb-2"
                        >
                            Save 10% on yearly
                        </motion.div>
                    )}

                    {plan.subPrice && (
                        <p className="text-lg font-bold text-violet-400 mt-1">{plan.subPrice}</p>
                    )}
                </div>

                <ul className="space-y-4 mb-8 flex-grow relative z-10">
                    {plan.features.map((feature, i) => (
                        <li key={i} className={`flex items-start gap-3 text-sm transition-all duration-300 ${feature.included ? 'text-slate-300' : 'text-slate-500 opacity-60'}`}>
                            <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${feature.included ? 'bg-white/5 border-white/10' : 'bg-transparent border-white/5'}`}>
                                {feature.included ? (
                                    <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                    <span className="text-[10px] font-bold text-slate-600">✕</span>
                                )}
                            </div>
                            <span className={feature.included ? '' : 'line-through decoration-slate-600/50'}>
                                {feature.text}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* <button
                    className={`relative w-full py-4 rounded-xl font-bold text-sm tracking-wide uppercase transition-all duration-300 group/btn overflow-hidden cursor-pointer ${plan.recommended ? 'bg-white text-slate-950 hover:bg-violet-50' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">Choose Plan <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" /></span>
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </button> */}
            </div>
        </motion.div>
    );
};

export default PackageCard;
