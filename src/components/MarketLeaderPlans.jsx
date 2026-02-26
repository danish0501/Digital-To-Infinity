import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Crown, Target, Bot, Camera, ShieldCheck, Rocket, Lock, MapPin, Users, Zap, ArrowRight } from 'lucide-react';
import ContactPopup from "../components/ContactPopup";

// --- PERFORMANCE OPTIMIZATION: Base64 Noise to avoid external network request ---
const NOISE_BASE64 = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E";

const plans = [
    {
        id: "01",
        title: "C-Suite Partnership",
        icon: Crown,
        tagline: "You run the business. We run the growth.",
        features: [
            "Dedicated Account Manager for all strategy & tactics",
            "Full Online-to-Ground marketing plan",
            "Includes 1,000 printed pamphlets monthly",
            "We handle every step, from concept to conversion",
            "Your complete, outsourced CMO."
        ]
    },
    {
        id: "02",
        title: "Advanced Ad Tech & Full Funnel",
        icon: Target,
        tagline: "Your 24×7 digital showroom — built to convert every visitor.",
        features: [
            "Advanced Ad Tech usage (A/B testing, optimization)",
            "Manages the proper funnel: Awareness -> Retargeting",
            "Converts one-time customers to Loyal Customers",
            "Total ad dominance across all channels",
            "Full-funnel management for market takeover."
        ]
    },
    {
        id: "03",
        title: "Advanced AI Automation Ecosystem",
        icon: Bot,
        tagline: "Your intelligent, 24/7 sales qualifier, never miss a lead",
        features: [
            "Advanced AI Chatbot & full automation suite",
            "AI-powered selection of high-potential leads",
            "Automatic lead qualifying system",
            "Delivers only sales-ready leads to your team",
            "Your intelligent, 24/7 sales qualifier."
        ]
    },
    {
        id: "04",
        title: "Monthly Pro Content Studio",
        icon: Camera,
        tagline: "Your brand, seen everywhere — with custom content.",
        features: [
            "Monthly Professional Photo & Video Shoot",
            "Creates a fresh, custom library of premium assets",
            "Unlimited high-impact Reels, posts, & ad creatives",
            "All content from \"Performance Accelerator\" included",
            "Premium, authentic content. Every single month."
        ]
    },
    {
        id: "05",
        title: "The \"ILNM Trusted\" Partnership",
        icon: ShieldCheck,
        tagline: "The ultimate \"unfair advantage\" — instant trust.",
        features: [
            "Get the Exclusive \"Trusted Badge\" on ILNM",
            "1 Dedicated Post/Reel on ILNM main feed per MONTH",
            "1x Co-Branded Giveaway",
            "Exclusive Event Partnership opportunities",
            "The ultimate \"unfair advantage\" in Navi Mumbai."
        ]
    },
    {
        id: "06",
        title: "Business Setup & Launch Support",
        icon: Rocket,
        tagline: "We don't just market your brand; we build it.",
        features: [
            "From logo to launch — everything handled in-house",
            "Brand strategy, offer design & go-to-market plan",
            "Digital identity setup across all major platforms",
            "Pre-launch buzz & lead capturing ads",
            "Step-by-step guidance till first 100 customers"
        ]
    },
    {
        id: "07",
        title: "Total Category Exclusivity",
        icon: Lock,
        tagline: "We make you the only choice.",
        features: [
            "Features the ILNM \"Trusted Badge\" (Exclusive)",
            "We will not work with your direct competitors",
            "Total market alignment with your brand",
            "Guaranteed \"Top\" in ILNM ranking on your node",
            "A true, unassailable partnership."
        ]
    },
    {
        id: "08",
        title: "Online-to-Ground Dominance",
        icon: MapPin,
        tagline: "From their phone screen to their front door.",
        features: [
            "Full strategy for both digital & physical marketing",
            "Includes 1,000 premium pamphlets designed & printed",
            "On-ground activation & event support",
            "Co-branded ILNM event partnership planning",
            "We reach your customers everywhere."
        ]
    },
    {
        id: "09",
        title: "Customer Loyalty Funnel",
        icon: Users,
        tagline: "We don't just find customers, we keep them.",
        features: [
            "Advanced strategy that goes beyond just \"leads\"",
            "Proprietary re-targeting funnels to re-engage visitors",
            "Converts one-time customers into loyal customers",
            "Maximizes your Customer Lifetime Value (CLV)",
            "Stop paying to find new customers. Bring old ones back."
        ]
    },
    {
        id: "10",
        title: "AI-Powered Sales Pipeline",
        icon: Zap,
        tagline: "Focus only on what matters — closing the sale.",
        features: [
            "Advanced AI ecosystem finds your perfect customer",
            "Automatic selection of high-potential leads",
            "Intelligent lead qualifying system",
            "Your team only gets sales-ready opportunities",
            "Never waste time on a cold lead again."
        ]
    },
];

const ProtocolCard = ({ planData, index }) => {
    return (
        <div className="relative w-full max-w-5xl mx-auto mb-24 last:mb-0 pl-8 md:pl-16 max-[426px]:pl-0">

            {/* 1. The Connector Spine (Left Side) - Hidden on Mobile */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 max-[426px]:hidden">
                <motion.div
                    initial={{ height: "0%" }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }} // PERFORMANCE: Only animate once
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="w-full bg-gradient-to-b from-violet-500 via-purple-400 to-transparent shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                />
            </div>

            {/* The Horizontal Branch */}
            <div className="absolute left-0 top-12 w-8 md:w-16 h-px bg-white/10 max-[426px]:hidden">
                <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }} // PERFORMANCE: Only animate once
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full bg-violet-500"
                />
            </div>

            {/* Node Dot */}
            <div className="absolute left-[-5px] top-[43px] w-3 h-3 rounded-full bg-slate-950 border border-violet-500 z-10 max-[426px]:hidden" />

            {/* 2. THE CARD */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }} // PERFORMANCE: Reduced margin trigger
                transition={{ duration: 0.6 }} // PERFORMANCE: Faster transition
                // PERFORMANCE: Removed backdrop-blur-md for better FPS, increased bg opacity
                className="group relative bg-[#0F1117] border border-white/10 rounded-2xl overflow-hidden hover:bg-slate-900 transition-colors duration-300"
            >
                {/* Simplified Spotlight Sweep - using opacity transition instead of translate */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Violet Glow Bottom */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 to-purple-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="p-8 md:p-10 relative z-10">
                    <div className="flex flex-col md:flex-row gap-8 items-start">

                        {/* ICON BOX */}
                        <div className="shrink-0 max-[426px]:w-full max-[426px]:flex max-[426px]:justify-between max-[426px]:items-center">
                            <div className="w-20 max-[426px]:w-14 h-20 max-[426px]:h-14 rounded-2xl bg-violet-900/10 border border-violet-500/20 flex items-center justify-center transition-colors duration-300 group-hover:bg-violet-900/20">
                                {planData.icon && <planData.icon className="w-10 max-[426px]:w-8 h-10 max-[426px]:h-8 text-violet-400 group-hover:text-white transition-colors duration-300" />}
                            </div>
                            <div className="mt-4 text-center max-[426px]:mt-0">
                                <span className="text-4xl font-black text-white/20 select-none">{planData.id}</span>
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="flex-1">
                            <h3 className="text-2xl max-[1025px]:text-4xl max-[769px]:text-2xl max-[426px]:text-xl font-bold text-white mb-2 group-hover:text-violet-100 transition-colors">
                                {planData.title}
                            </h3>
                            <p className="text-violet-400/80 font-mono text-sm mb-6 uppercase tracking-wider">
                                // {planData.tagline}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {planData.features.map((feat, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-sm bg-violet-500 shrink-0" />
                                        <p className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                                            {feat}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const MarketLeaderPlans = () => {
    const [isContactOpen, setContactOpen] = useState(false);
    const containerRef = useRef(null);

    // PERFORMANCE: Simplified scroll parallax logic
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <>
            <div ref={containerRef} className="min-h-screen bg-[#050505] font-sans text-white overflow-hidden relative selection:bg-violet-500/30">

                {/* 1. Optimized Cinematic Background */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    {/* Moving Stars/Dust - Using Base64 + Will-Change */}
                    <motion.div
                        style={{ y: bgY, willChange: 'transform' }}
                        className="absolute inset-0 opacity-20 brightness-150 contrast-200"
                    >
                        {/* Inline SVG background for instant load */}
                        <div className="w-full h-full" style={{ backgroundImage: `url("${NOISE_BASE64}")` }} />
                    </motion.div>

                    {/* Violet Nebula - Simplified for performance */}
                    <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-violet-900/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-20%] w-[1000px] h-[1000px] bg-purple-900/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

                    {/* 2. HERO HEADER */}
                    <div className="text-center max-w-4xl mx-auto mb-32 relative">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl md:text-9xl font-black mb-8 tracking-tighter text-white"
                        >
                            MARKET <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-violet-300 via-purple-500 to-indigo-800">
                                LEADER
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
                        >
                            Stop competing. Start dominating. The ultimate ecosystem for brands demanding absolute category leadership.
                        </motion.p>
                    </div>

                    {/* 3. PROTOCOL STACK */}
                    <div className="relative w-full pb-20">
                        {plans.map((item, index) => (
                            <ProtocolCard key={index} planData={item} index={index} />
                        ))}
                    </div>

                    {/* 4. FINAL CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-16 max-[376px]:mt-8 max-[321px]:mt-4 text-center"
                    >
                        <div className="relative inline-block group">
                            <div className="absolute -inset-1 rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500"></div>

                            <button
                                onClick={() => setContactOpen(true)}
                                className="relative px-10 max-[321px]:px-6 py-4 bg-black rounded-full flex items-center gap-4 transition-colors cursor-pointer border border-white/10 hover:bg-slate-900"
                            >
                                <div className="flex flex-col items-start leading-none">
                                    <span className="text-xl max-[426px]:text-lg max-[376px]:text-base max-[321px]:text-sm font-bold text-white">Dominate your Leadership</span>
                                </div>
                                <ArrowRight className="w-6 max-[376px]:w-5 h-6 max-[321px]:h-5 text-white group-hover:translate-x-2 transition-transform" />
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

export default MarketLeaderPlans;