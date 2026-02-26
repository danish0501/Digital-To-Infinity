import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Target,
    BarChart3,
    Zap,
    Users,
    Globe,
    ShieldCheck,
    TrendingUp,
} from 'lucide-react';

const Audits = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const services = [
        {
            title: "Paid Social Management",
            desc: "Expertly managed campaigns across Facebook, Instagram, and LinkedIn focused on high-intent SaaS audiences.",
            icon: <Target className="w-6 h-6 text-violet-400" />
        },
        {
            title: "Content Promotion",
            desc: "Strategic distribution of your best blog posts, whitepapers, and videos to drive top-of-funnel awareness.",
            icon: <Zap className="w-6 h-6 text-violet-400" />
        },
        {
            title: "Performance Tracking",
            desc: "Deep integration with your CRM to track leads from first click to closed-won revenue.",
            icon: <BarChart3 className="w-6 h-6 text-violet-400" />
        }
    ];

    const [activePhase, setActivePhase] = useState(0);

    const auditPhases = [
        {
            title: "Data Integrity Audit",
            subtitle: "The Foundation of Scalable Intelligence",
            desc: "We dive deep into your tracking infrastructure to ensure every conversion is captured accurately. Without clean data, scaling is just expensive guessing.",
            items: ["Pixel/CAPI Verification", "Attribution Modeling", "CRM Integration Check"],
            impact: "Up to 35% reduction in attribution gap",
            icon: <BarChart3 className="w-8 h-8 text-violet-400" />,
            color: "from-violet-500/20 to-indigo-500/20"
        },
        {
            title: "Creative Strategy Audit",
            subtitle: "Stopping the Scroll, Winning the Mind",
            desc: "Our team analyzes your creative performance beyond just ROAS. We look at hook rates, hold rates, and fatigue patterns to build a sustainable creative engine.",
            items: ["Hook Rate Analysis", "Creative Fatigue Scan", "Competitor Benchmarking"],
            impact: "2.4x average improvement in CTR",
            icon: <Zap className="w-8 h-8 text-violet-400" />,
            color: "from-indigo-500/20 to-blue-500/20"
        },
        {
            title: "Full-Funnel Optimization",
            subtitle: "Beyond the Click Architecture",
            desc: "The ad is only half the battle. We optimize the entire post-click experience, from landing page messaging to lead lead magnet efficacy.",
            items: ["Landing Page CRO", "Lead Magnet Efficacy", "Email Follow-up Sync"],
            impact: "42% average decrease in Cost Per Lead",
            icon: <Target className="w-8 h-8 text-violet-400" />,
            color: "from-blue-500/20 to-violet-500/20"
        }
    ];

    return (
        <div className="bg-black text-white selection:bg-violet-500 selection:text-white font-sans">
            {/* Hero Section */}
            <section className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-violet-600/10 blur-[140px] rounded-full pointer-events-none opacity-50" />

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10 hover:border-violet-500/50 transition-colors cursor-default"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                        </span>
                        <span className="text-gray-300 text-xs md:text-sm font-bold uppercase tracking-[0.2em]">Next-Gen Social Media Ads</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-8xl font-bold mb-10 tracking-tight leading-[1.1] max-w-7xl mx-auto"
                    >
                        Are you generating enough <span className="bg-gradient-to-r from-violet-500 via-indigo-500 to-violet-500 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent italic px-2 font-light">leads</span> from social media?
                        <span className="bg-gradient-to-r from-violet-500 via-indigo-500 to-violet-500 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent italic px-2">We can help.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-gray-400 text-lg md:text-2xl max-w-5xl mx-auto mb-16 leading-relaxed font-medium"
                    >
                        Stop settling for impressions. We build high-performance social engines that drive
                        <span className="text-white"> targeted traffic</span>,
                        <span className="text-white"> qualified leads</span>, and
                        <span className="text-white"> predictable revenue</span> for brands.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <Link to="/free-audit/free-marketing-plan">
                            <button className="px-10 py-5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xl rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(124,58,237,0.3)] cursor-pointer">
                                Schedule A Free Demo
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Services Introduction */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h2 {...fadeIn} className="text-4xl md:text-8xl font-bold mb-8">
                        Our <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Social Media Advertising</span> Services
                    </motion.h2>
                    <motion.p {...fadeIn} className="text-gray-400 text-xl md:text-2xl leading-relaxed mb-20 max-w-5xl mx-auto">
                        As part of our comprehensive PPC service offering, we provide paid social media management services for SaaS businesses of all sizes, with a focus on Facebook, Instagram, and LinkedIn.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-violet-500/30 transition-colors group text-left"
                            >
                                <div className="p-3 rounded-2xl bg-violet-500/10 w-fit mb-6 group-hover:scale-110 transition-transform">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-base">
                                    {service.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* More Informative (Audit Process) */}
            <section className="py-20 px-4 bg-zinc-950 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="mb-20">
                        <motion.h2 {...fadeIn} className="text-4xl md:text-7xl font-bold leading-tight mb-6">
                            We don't just run ads.<br />
                            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">We architect growth engines.</span>
                        </motion.h2>
                        <motion.p {...fadeIn} className="text-gray-400 text-xl md:text-2xl max-w-4xl leading-relaxed">
                            Our comprehensive audit process is designed to uncover hidden bottlenecks in your acquisition funnel and reveal opportunities for radical scale.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Selector Column */}
                        <div className="lg:col-span-5 space-y-4">
                            {auditPhases.map((phase, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    onClick={() => setActivePhase(i)}
                                    className={`p-6 rounded-3xl cursor-pointer transition-all duration-500 border ${activePhase === i
                                        ? 'bg-zinc-900 border-violet-500/50 shadow-[0_0_30px_rgba(139,92,246,0.1)]'
                                        : 'bg-zinc-900/40 border-white/5 hover:border-white/20'
                                        }`}
                                >
                                    <div className="flex items-start gap-5">
                                        <div className={`p-3 rounded-2xl transition-colors duration-500 ${activePhase === i ? 'bg-violet-500/20' : 'bg-white/5'
                                            }`}>
                                            {React.cloneElement(phase.icon, {
                                                className: `w-6 h-6 transition-colors duration-500 ${activePhase === i ? 'text-violet-400' : 'text-gray-500'
                                                    }`
                                            })}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className={`text-xs font-bold uppercase tracking-widest ${activePhase === i ? 'text-violet-400' : 'text-gray-500'
                                                    }`}>Phase 0{i + 1}</span>
                                                {activePhase === i && (
                                                    <motion.span
                                                        layoutId="active-indicator"
                                                        className="h-1 w-1 rounded-full bg-violet-400"
                                                    />
                                                )}
                                            </div>
                                            <h3 className={`text-xl font-bold transition-colors duration-500 ${activePhase === i ? 'text-white' : 'text-gray-400'
                                                }`}>
                                                {phase.title}
                                            </h3>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            <div className="pt-8 space-y-6">
                                <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center border border-violet-500/20 shrink-0">
                                        <Globe className="w-6 h-6 text-violet-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Global Scale</p>
                                        <p className="text-sm text-gray-500">Optimizing spend across 15+ countries.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center border border-violet-500/20 shrink-0">
                                        <ShieldCheck className="w-6 h-6 text-violet-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Data Privacy</p>
                                        <p className="text-sm text-gray-500">Strict GDPR & platform compliance.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Display Area */}
                        <div className="lg:col-span-7">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activePhase}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="h-full"
                                >
                                    <div className={`h-full p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br ${auditPhases[activePhase].color} border border-violet-500/20 relative overflow-hidden flex flex-col justify-between`}>
                                        {/* Decorative Icon in background */}
                                        <div className="absolute top-10 right-10 opacity-10 scale-[3] pointer-events-none">
                                            {auditPhases[activePhase].icon}
                                        </div>

                                        <div>
                                            <h4 className="text-violet-400 font-bold uppercase tracking-[0.2em] text-sm mb-4">
                                                {auditPhases[activePhase].subtitle}
                                            </h4>
                                            <h3 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                                                {auditPhases[activePhase].title}
                                            </h3>
                                            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
                                                {auditPhases[activePhase].desc}
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                                <div className="space-y-4">
                                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Core Audit Points</p>
                                                    <ul className="space-y-3">
                                                        {auditPhases[activePhase].items.map((item, j) => (
                                                            <li key={j} className="flex items-center gap-3 text-white">
                                                                <div className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="p-6 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-sm">
                                                    <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-3">Expected Impact</p>
                                                    <p className="text-2xl font-bold text-white mb-2">{auditPhases[activePhase].impact}</p>
                                                    <p className="text-sm text-gray-400">Based on historic client data and industry benchmarks.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Social Media Section */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20">
                        <motion.h2 {...fadeIn} className="text-4xl md:text-7xl font-bold mb-6">Why <span className="bg-gradient-to-r from-violet-500 via-indigo-500 to-violet-500 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent italic px-2">Companies</span> Choose Us</motion.h2>
                        <motion.p {...fadeIn} className="text-gray-400 text-xl">We bridge the gap between "impressions" and "ARR".</motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <motion.div {...fadeIn} className="space-y-6 p-8 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 hover:border-violet-500/30">
                            <h3 className="text-3xl font-bold flex items-center gap-3">
                                <Users className="text-violet-400 w-6 h-6" />
                                Audience Sophistication
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Most agencies treat B2B SaaS like e-commerce. We don't. We understand the complex buying committee, the long sales cycle, and the need for educational content that builds trust before asking for the demo.
                            </p>
                        </motion.div>
                        <motion.div {...fadeIn} className="space-y-6 p-8 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 hover:border-violet-500/30">
                            <h3 className="text-3xl font-bold flex items-center gap-3">
                                <TrendingUp className="text-violet-400 w-6 h-6" />
                                Scaling Beyond Search
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Google Ads is great for intent, but it's finite. Social allows you to generate demand rather than just capturing it. We help you scale by reaching your potential customers where they spend 2.5 hours every single day.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Final CTA section */}
            <section className="py-20 px-4 relative">
                <div className="max-w-5xl mx-auto px-8 py-20 bg-gradient-to-br from-violet-600 to-indigo-900 rounded-[3rem] text-center relative overflow-hidden group">
                    {/* Animated background circles */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight">Ready to scale your Business?</h2>
                        <p className="text-violet-50 text-xl font-medium mb-12 max-w-2xl mx-auto opacity-80">
                            Book a strategy session today and get a free deep-audit of your current social media advertising efforts.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/free-audit/free-marketing-plan">
                                <button className="px-12 py-6 bg-black text-white font-bold text-xl rounded-full hover:bg-zinc-900 transition-colors shadow-2xl flex items-center gap-4 cursor-pointer">
                                    Schedule A Free Demo
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </Link>
                        </div>
                        <p className="mt-10 text-violet-200/60 text-sm font-bold uppercase tracking-widest">
                            Limited Availability Remaining For This Month
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Audits;
