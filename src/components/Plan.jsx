import { useState, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, LayoutGroup, AnimatePresence } from 'framer-motion';
import { Check, Star, ArrowRight, Rocket } from 'lucide-react';
// import StarterPackCard from "../components/StarterPackCard";
import { pricingData } from "../data/mock";
import { useNavigate } from 'react-router-dom';
import { packageCategories } from '../data/packageData';
import WebsitePackages from './pricing/WebsitePackages';
import CreativePackages from './pricing/CreativePackages';
import AdsPackages from './pricing/AdsPackages';
import SocialPackages from './pricing/SocialPackages';

// --- COMPONENT: 3D HOLOGRAPHIC CARD ---
const PlanCard = ({ plan, billingCycle }) => {
    const ref = useRef(null);
    const navigate = useNavigate();

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

    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    const period = billingCycle === 'monthly' ? '/mo' : '/yr';

    // --- NAVIGATION LOGIC ---
    const handlePlanClick = () => {
        let path = '/plans';

        switch (plan.name) {
            case 'Growth Engine':
                path = '/plans/growth-engine-plans';
                break;
            case 'Performance Acc.':
                path = '/plans/performance-accelerator-plans';
                break;
            case 'Market Leader':
                path = '/plans/market-leader-plans';
                break;
            default:
                path = '/plans';
        }

        navigate(path);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: "preserve-3d", transform: `perspective(1000px) rotateX(${rotateX}) rotateY(${rotateY}) scale(1)` }}
            className={`relative h-full w-full rounded-[2rem] transition-all duration-200 ease-out`}
        >
            <div className={`absolute -inset-[2px] rounded-[2.1rem] bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500`} />
            {plan.recommended && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 max-[321px]:w-[160px]">
                    <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(139,92,246,0.5)] flex items-center gap-1 border border-white/20">
                        <Star className="w-3 h-3 fill-white" /> Most Popular
                    </div>
                </div>
            )}
            <div className={`relative h-full flex flex-col p-8 rounded-[2rem] bg-slate-900/90 backdrop-blur-xl border border-white/10 ${plan.recommended ? 'border-violet-500/50 shadow-[0_0_50px_rgba(124,58,237,0.15)]' : 'hover:border-white/20'} transition-colors duration-300`}>
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
                    <div className="flex items-end gap-1 mb-2">
                        <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">₹{price}</span>
                        <span className="text-slate-500 font-medium mb-1">{period}</span>
                    </div>
                    {billingCycle === 'yearly' && (
                        <span className="inline-block text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Save 8.33%</span>
                    )}
                </div>
                <ul className="space-y-4 mb-8 flex-grow relative z-10">
                    {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm max-[321px]:text-[11px] text-slate-300">
                            <div className={`mt-0.5 w-5 max-[321px]:w-4 h-5 max-[321px]:h-4 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10`}><Check className="w-3 h-3 text-white" /></div>
                            {feature}
                        </li>
                    ))}
                </ul>
                <button
                    onClick={handlePlanClick}
                    className={`relative w-full py-4 rounded-xl font-bold text-sm max-[321px]:text-[12px] tracking-wide uppercase transition-all duration-300 group/btn overflow-hidden cursor-pointer ${plan.recommended ? 'bg-white text-slate-950 hover:bg-violet-50 shadow-[0_0_30px_rgba(255,255,255,0.3)]' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">Choose {plan.name} <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" /></span>
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </button>
            </div>
        </motion.div>
    );
};

// --- MAIN PAGE COMPONENT ---
const Plan = () => {

    const [showPlans, setShowPlans] = useState(false);
    const [activeTab, setActiveTab] = useState('web');

    const renderSecondaryPackages = () => {
        switch (activeTab) {
            case 'web': return <WebsitePackages />;
            case 'creatives': return <CreativePackages />;
            case 'ads': return <AdsPackages />;
            case 'social': return <SocialPackages />;
            default: return <WebsitePackages />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 overflow-x-hidden">

            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">

                {/* HEADER */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-violet-300 font-semibold mb-6 backdrop-blur-md">Flexible Pricing</motion.span>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl max-[321px]:text-4xl font-extrabold text-white tracking-tight mb-8">Invest in Your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white animate-gradient bg-[length:200%_auto]">Digital Future</span></motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-slate-400 leading-relaxed">Transparent pricing packages designed to scale with your business. No hidden fees. Pause or cancel anytime.</motion.p>
                </div>

                {/* STARTER PACK SECTION */}
                {/* <StarterPackCard /> */}

                <AnimatePresence mode="wait">
                    {!showPlans ? (
                        <motion.div
                            key="ad-banner"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="w-full relative rounded-[2rem] p-[1px] mb-32 z-10 max-w-5xl mx-auto"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 rounded-[2rem] opacity-40 blur-2xl animate-pulse" />
                            <div className="relative h-full bg-slate-900/90 backdrop-blur-2xl rounded-[2rem] p-10 md:p-20 border border-white/10 text-center flex flex-col items-center overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="w-20 h-20 mb-8 rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-[1px] shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                                >
                                    <div className="w-full h-full bg-slate-950 rounded-[23px] flex items-center justify-center">
                                        <Rocket className="w-10 h-10 text-white" />
                                    </div>
                                </motion.div>

                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight relative z-10"
                                >
                                    Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 animate-gradient">Total Digital Dominance</span>
                                </motion.h2>

                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-lg md:text-xl text-slate-300 max-w-3xl mb-12 relative z-10 leading-relaxed max-[426px]:text-base"
                                >
                                    Take your business from its current state to absolute market leadership. Our comprehensive plans cover everything from custom website development to advanced omnichannel advertising, AI automation, and beyond.
                                </motion.p>

                                <motion.button
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    onClick={() => setShowPlans(true)}
                                    className="relative px-10 py-5 rounded-full font-bold text-lg max-[426px]:text-sm uppercase tracking-wide bg-white text-slate-950 hover:bg-violet-50 transition-all duration-300 shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:shadow-[0_0_70px_rgba(139,92,246,0.6)] hover:-translate-y-1 overflow-hidden group/btn z-10 flex items-center gap-3 cursor-pointer"
                                >
                                    <span className="relative z-10 flex items-center gap-2">Explore All Plans <Rocket className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" /></span>
                                    <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-violet-500/20 to-transparent skew-x-12" />
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="pricing-grid"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, staggerChildren: 0.2 }}
                            className="mb-32"
                        >
                            <div className="flex justify-center mb-12">
                                <button
                                    onClick={() => setShowPlans(false)}
                                    className="text-slate-400 hover:text-white text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                                >
                                    <ArrowRight className="w-4 h-4 rotate-180" /> Back to Overview
                                </button>
                            </div>

                            <div className="grid grid-cols-1 min-[850px]:grid-cols-3 gap-8 max-[426px]:gap-12 items-start">
                                <LayoutGroup>
                                    {pricingData.map((plan, index) => (
                                        <motion.div key={plan.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }} className={plan.recommended ? 'min-[850px]:-mt-8 z-10' : ''}>
                                            <PlanCard plan={plan} billingCycle="monthly" />
                                        </motion.div>
                                    ))}
                                </LayoutGroup>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* SECONDARY PACKAGES SECTION */}
                <div className="mt-40">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-white mb-6"
                        >
                            Specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Service Packages</span>
                        </motion.h2>
                        <p className="text-slate-400">Choose from our specialized service modules tailored to your specific business needs.</p>
                    </div>

                    {/* TABS */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16 px-4">
                        {packageCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`relative px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer overflow-hidden ${activeTab === cat.id ? 'text-white border-white/20' : 'text-slate-400 hover:text-white border-transparent bg-white/5 border border-white/5'}`}
                            >
                                {activeTab === cat.id && (
                                    <motion.div
                                        layoutId="active-tab-bg"
                                        className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{cat.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* SECONDARY GRID */}
                    <div className="relative">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {renderSecondaryPackages()}
                        </motion.div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Plan;