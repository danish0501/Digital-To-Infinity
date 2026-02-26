import { useEffect, useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, MonitorSmartphone, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PackageCard from '../components/pricing/PackageCard';
import { websitePackages, creativesPackages, adsPackages, socialPackages } from '../data/packageData';
import ContactPopup from '../components/ContactPopup';

const SecondaryPlanPage = ({ category }) => {

    const [isContactOpen, setContactOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);

    const getPackageData = () => {
        switch (category) {
            case 'web': return { title: 'Website Development Packages', plans: websitePackages };
            case 'creatives': return { title: 'Creatives & Reels Packages', plans: creativesPackages };
            case 'ads': return { title: 'Ads Management Packages', plans: adsPackages };
            case 'social': return { title: 'Social Media Management Packages', plans: socialPackages };
            default: return { title: 'Packages', plans: websitePackages };
        }
    };

    const { title, plans } = getPackageData();

    return (
        <div className="min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 overflow-x-hidden flex flex-col">
            <Navbar />

            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
            </div>

            <main className="relative z-10 flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
                {/* HEADER */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-8"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white animate-gradient bg-[length:200%_auto]">
                            {title}
                        </span>
                    </motion.h1>
                </div>

                {/* ADVERTISEMENT BANNER FOR BUSINESS WEBSITE */}
                {category === 'web' && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-24 relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-violet-600/20 to-indigo-600/20 rounded-[2rem] blur-xl" />
                        <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 overflow-visible">
                            {/* Background elements inside banner */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center border-[0px] border-red-500">

                                {/* Left Content */}
                                <div className="space-y-8 relative z-10">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold tracking-wide uppercase">
                                        <Sparkles className="w-4 h-4" />
                                        <span>Limited Time Offer</span>
                                    </div>

                                    <div className="space-y-4">
                                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                                            Launch Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Business Online</span> Today
                                        </h2>

                                        <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-xl">
                                            High-performance, mobile-friendly website designed to convert visitors into customers.
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 line-through text-lg font-medium">₹19,999</span>
                                            <span className="text-4xl font-extrabold text-white flex items-baseline gap-1">
                                                ₹14,999<span className="text-base text-slate-400 font-medium">/setup</span>
                                            </span>
                                        </div>
                                        <div className="h-14 w-px bg-white/10 hidden sm:block" />
                                        <div className="w-full sm:w-auto h-px bg-white/10 sm:hidden" />
                                        <div className="flex flex-col gap-1">
                                            <span className="text-slate-300 text-sm font-medium">Need E-Commerce?</span>
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold rounded-lg">
                                                Starts @ ₹22,000
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {[
                                                'Up to 5 Custom Pages',
                                                'Clean & Mobile-Friendly',
                                                'WhatsApp Integration',
                                                'Basic SEO Readiness'
                                            ].map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3 text-slate-200">
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                                    <span className="font-medium">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="pt-2">
                                        <motion.button
                                            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setContactOpen(true)}
                                            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl text-white font-semibold text-lg transition-all overflow-hidden cursor-pointer"
                                        >
                                            <motion.span
                                                animate={{ x: ['-200%', '200%'] }}
                                                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
                                                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[30deg]"
                                            />
                                            <span className="relative z-10">Get Started Now</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Right Image / Mockup */}
                                <div className="relative z-10 lg:h-[500px] flex items-center justify-center mt-8 lg:mt-0">
                                    <motion.div
                                        animate={{ y: [-10, 10, -10] }}
                                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                        className="relative w-full max-w-sm lg:max-w-md aspect-[4/5] sm:aspect-square lg:aspect-[4/5] bg-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col group"
                                    >
                                        {/* Browser Bar */}
                                        <div className="h-10 bg-slate-800/80 border-b border-white/5 flex items-center px-4 gap-2 backdrop-blur-md w-full relative z-20 shrink-0">
                                            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                            <div className="ml-4 h-5 bg-slate-700/50 rounded-md w-1/3 border border-white/5" />
                                        </div>

                                        {/* Website Mockup Content */}
                                        <div className="flex-1 w-full bg-slate-950 relative overflow-hidden p-6 lg:p-8 flex flex-col gap-4">
                                            <div className="w-full h-32 lg:h-40 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-xl border border-white/5 relative overflow-hidden group-hover:border-blue-500/30 transition-colors">
                                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />

                                                <motion.div
                                                    initial={{ opacity: 0.5 }}
                                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                                    className="absolute inset-0 flex items-center justify-center"
                                                >
                                                    <MonitorSmartphone className="w-16 h-16 text-blue-400/50" />
                                                </motion.div>
                                            </div>

                                            <div className="flex gap-4">
                                                <div className="w-1/2 h-24 lg:h-32 bg-slate-800/40 rounded-xl border border-white/5 group-hover:bg-slate-800/60 transition-colors" />
                                                <div className="w-1/2 h-24 lg:h-32 bg-slate-800/40 rounded-xl border border-white/5 group-hover:bg-slate-800/60 transition-colors" />
                                            </div>
                                            <div className="w-3/4 h-8 bg-slate-800/40 rounded-lg border border-white/5 mt-auto" />

                                            {/* Floating Gradients */}
                                            <div className="absolute -inset-x-20 top-1/4 h-48 bg-blue-500/10 blur-[60px] -rotate-12 group-hover:bg-blue-400/20 transition-colors duration-700" />
                                            <div className="absolute -inset-x-20 bottom-0 h-48 bg-violet-500/10 blur-[60px] rotate-12 group-hover:bg-violet-400/20 transition-colors duration-700" />
                                        </div>
                                    </motion.div>

                                    {/* Floating Badges */}
                                    <motion.div
                                        animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                        className="absolute -right-4 lg:-right-8 top-1/4 bg-slate-800/90 backdrop-blur-xl border border-white/10 p-3 lg:p-4 rounded-2xl shadow-2xl z-30 flex items-center gap-3"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                                            <Zap className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-white leading-tight">Fast Loading</span>
                                            <span className="text-xs text-slate-400 font-medium">Optimized Score</span>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        animate={{ y: [0, 15, 0], x: [0, -5, 0] }}
                                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                        className="absolute -left-4 lg:-left-8 bottom-1/4 bg-slate-800/90 backdrop-blur-xl border border-white/10 p-3 lg:p-4 rounded-2xl shadow-2xl z-30 flex items-center gap-3"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-white leading-tight">SEO Ready</span>
                                            <span className="text-xs text-slate-400 font-medium">Rank Higher</span>
                                        </div>
                                    </motion.div>

                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* PRICING GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start mb-20">
                    <LayoutGroup>
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <PackageCard plan={plan} showToggle={false} staticPeriod="one time" />
                            </motion.div>
                        ))}
                    </LayoutGroup>
                </div>
            </main>

            <Footer />

            {/* RENDER POPUP COMPONENT */}
            <ContactPopup
                isOpen={isContactOpen}
                onClose={() => setContactOpen(false)}
            />
        </div>
    );
};

export default SecondaryPlanPage;
