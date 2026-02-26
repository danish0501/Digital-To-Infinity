import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Handshake, Globe, Rocket, Target, Cpu, Briefcase, CalendarRange, Bot, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import ContactPopup from "../components/ContactPopup";

// --- DATA ---
const plans = [
    {
        id: 1,
        title: "Strategic Partner & Brand PR",
        icon: Handshake,
        tagline: "We don’t just manage your brand — we partner in your growth",
        features: [
            "Partnership-level support for scaling your brand",
            "PR articles & online mentions to build credibility",
            "Strategic collaborations with influencers & media",
            "Brand positioning that attracts premium clients",
            "Builds authority faster than traditional marketing"
        ],
        theme: "cyan"
    },
    {
        id: 2,
        title: "Pro Website + Offers Integration",
        icon: Globe,
        tagline: "Your 24×7 digital showroom — built to convert every visitor.",
        features: [
            "Conversion-focused website for results, not just looks",
            "Lightning-fast, cloud-hosted & mobile-optimized",
            "Offer pop-ups, inquiry forms & WhatsApp integration",
            "SEO-structured pages with analytics setup",
            "Tracks leads and conversions in real time"
        ],
        theme: "blue"
    },
    {
        id: 3,
        title: "10 SEO Blogs, 4 Reels, 21 Posts",
        icon: Rocket,
        tagline: "Your content becomes your growth engine — online & organic.",
        features: [
            "10 high-ranking SEO blogs to boost Google visibility",
            "21 premium social media creatives every month",
            "4 Reels with trending hooks & storytelling angles",
            "Keyword-rich, AI-assisted captions & hashtags",
            "Consistent branding that grows reach & trust"
        ],
        theme: "purple"
    },
    {
        id: 4,
        title: "Omnichannel Ad Dominance",
        icon: Target,
        tagline: "Your brand seen everywhere — dominating all screens.",
        features: [
            "Conversion-focused website for results, not just looks",
            "Lightning-fast, cloud-hosted & mobile-optimized",
            "Offer pop-ups, inquiry forms & WhatsApp integration",
            "20% of the amount reserved for ads",
            "Tracks leads and conversions in real time"
        ],
        theme: "magenta"
    },
    {
        id: 5,
        title: "The Full AI Automation Suite",
        icon: Cpu,
        tagline: "Automate your growth. Focus only on what matters — sales.",
        features: [
            "Smart automation for lead follow-ups & responses",
            "CRM + WhatsApp + Email auto-sync system",
            "AI tools handle repetitive marketing tasks",
            "Real-time reports & performance alerts",
            "Saves 40% of your team’s time instantly"
        ],
        theme: "red"
    },
    {
        id: 6,
        title: "Business Setup & Launch Support",
        icon: Briefcase,
        tagline: "We launch your dream brand — like a startup accelerator.",
        features: [
            "From logo to launch — everything handled in-house",
            "Brand strategy, offer design & go-to-market plan",
            "Digital identity setup across all major platforms",
            "Pre-launch buzz & lead capturing ads",
            "Step-by-step guidance till first 100 customers"
        ],
        theme: "orange"
    },
    {
        id: 7,
        title: "Offer & Campaign Planning",
        icon: CalendarRange,
        tagline: "Every ad, every offer — designed to sell, not just post.",
        features: [
            "Professionally crafted monthly marketing offers",
            "Data-backed campaign calendar with perfect timing",
            "A/B testing to find what converts best",
            "Season-based sales planning & discount strategy",
            "ROI tracking on every campaign"
        ],
        theme: "yellow"
    },
    {
        id: 8,
        title: "Advanced AI Chatbot",
        icon: Bot,
        tagline: "Your AI-powered digital assistant — never sleeps, never misses.",
        features: [
            "Converts website visitors into leads 24×7",
            "Personalized instant replies increase trust",
            "Integrated with WhatsApp, CRM & Email",
            "Tracks inquiries & sends automated follow-ups",
            "Reduces missed leads by up to 70%"
        ],
        theme: "emerald"
    },
];

// --- COLOR THEMES ---
const themeColors = {
    cyan: { solid: "bg-cyan-500", glow: "shadow-cyan-500/50", gradient: "from-cyan-400 to-blue-500", text: "text-cyan-400" },
    blue: { solid: "bg-blue-500", glow: "shadow-blue-500/50", gradient: "from-blue-400 to-indigo-500", text: "text-blue-400" },
    purple: { solid: "bg-purple-500", glow: "shadow-purple-500/50", gradient: "from-purple-400 to-fuchsia-500", text: "text-purple-400" },
    magenta: { solid: "bg-fuchsia-500", glow: "shadow-fuchsia-500/50", gradient: "from-fuchsia-400 to-pink-500", text: "text-fuchsia-400" },
    red: { solid: "bg-red-500", glow: "shadow-red-500/50", gradient: "from-red-400 to-orange-500", text: "text-red-400" },
    orange: { solid: "bg-orange-500", glow: "shadow-orange-500/50", gradient: "from-orange-400 to-yellow-500", text: "text-orange-400" },
    yellow: { solid: "bg-yellow-500", glow: "shadow-yellow-500/50", gradient: "from-yellow-400 to-lime-500", text: "text-yellow-400" },
    emerald: { solid: "bg-emerald-500", glow: "shadow-emerald-500/50", gradient: "from-emerald-400 to-teal-500", text: "text-emerald-400" },
};

// --- FULL WIDTH CARD COMPONENT ---
const VelocityCard = ({ plan }) => {
    const colors = themeColors[plan.theme];
    const cardRef = useRef(null);

    return (
        <div ref={cardRef} className="relative w-full py-8 md:py-12 flex justify-center">

            {/* THE CARD */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full relative group z-10"
            >
                <div className="relative h-full bg-[#0F1117]/90 backdrop-blur-md p-8 max-[3766px]:p-4 md:p-12 rounded-3xl border border-white/10 overflow-hidden hover:bg-[#1A1D26] transition-colors duration-300">

                    {/* Scanner Beam Animation (Top Border) */}
                    <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${colors.gradient}`}
                    />

                    {/* Background Gradient Blob - Static CSS for better performance */}
                    <div className={`absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br ${colors.gradient} opacity-5 blur-[80px] rounded-full pointer-events-none group-hover:opacity-10 transition-opacity duration-500`} />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                        {/* Left Side: Header & Icon */}
                        <div className="lg:col-span-5 flex flex-col items-start">
                            <div className={`mb-6 p-4 rounded-2xl bg-gradient-to-br ${colors.gradient} shadow-2xl ${colors.glow} group-hover:scale-105 transition-transform duration-300`}>
                                <plan.icon className="w-8 max-[426px]:w-6 h-8 max-[426px]:h-6 text-white" />
                            </div>

                            <h3 className="text-3xl md:text-4xl max-[426px]:text-xl font-bold text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                                {plan.title}
                            </h3>

                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 ${colors.text} text-sm max-[426px]:text-xs font-medium`}>
                                <Zap className="w-3 h-3 fill-current" />
                                {plan.tagline}
                            </div>
                        </div>

                        {/* Right Side: Features List */}
                        <div className="lg:col-span-7">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-[426px]:gap-0">
                                {plan.features.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-300 text-base group-hover:text-white transition-colors p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5">
                                        <CheckCircle2 className={`w-5 max-[426px]:w-4 h-5 max-[426px]:h-4 mt-0.5 shrink-0 ${colors.text}`} />
                                        <span className="leading-snug max-[426px]:text-base max-[376px]:text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                </div>
            </motion.div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
const PerformanceAccPlans = () => {

    const [isContactOpen, setContactOpen] = useState(false);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    // Parallax effect for the background grid
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <>
            <div ref={containerRef} className="min-h-screen bg-slate-950 font-sans text-white overflow-hidden relative selection:bg-cyan-500/30">

                {/* DYNAMIC BACKGROUND (Moving Perspective Grid) */}
                <div className="fixed inset-0 pointer-events-none z-0 perspective-1000">
                    {/* The moving grid floor */}
                    <motion.div
                        style={{ y: bgY, rotateX: "60deg", scale: 2, willChange: "transform" }}
                        className="absolute inset-[-100%] bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] origin-bottom"
                    />
                    {/* Horizon glow */}
                    <div className="absolute top-1/2 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

                    {/* HERO SECTION */}
                    <div className="text-center max-w-5xl mx-auto mb-20 relative">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-6xl md:text-8xl max-[376px]:text-5xl font-black mb-8 tracking-tight"
                        >
                            Performance <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                                Accelerator
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
                        >
                            Eight high-impact modules designed to inject speed, automation, and authority into your business model.
                        </motion.p>
                    </div>

                    {/* FULL WIDTH CARD STACK */}
                    <div className="relative w-full pb-20">
                        {plans.map((plan, index) => (
                            <VelocityCard key={plan.id} plan={plan} index={index} />
                        ))}
                    </div>

                    {/* FINAL CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 max-[426px]:mt-0 text-center relative z-10"
                    >
                        <div className="inline-block relative group">
                            <button
                                onClick={() => setContactOpen(true)}
                                className="relative px-10 max-[426px]:px-6 max-[321px]:px-6 py-4 max-[426px]:py-3 bg-slate-900 border border-slate-700 rounded-full flex items-center gap-4 transition-all duration-300 hover:bg-slate-800 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer"
                            >
                                <span className="text-xl max-[426px]:text-lg max-[376px]:text-base max-[321px]:text-sm font-bold text-white">
                                    Accelerate Your Growth Now
                                </span>
                                <ArrowRight className="w-6 max-[426px]:w-5 h-6 max-[426px]:w-5 text-white group-hover:translate-x-2 transition-transform" />
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

export default PerformanceAccPlans;