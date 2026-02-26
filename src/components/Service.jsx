import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Check, Rocket, Star, Quote } from 'lucide-react';
import Antigravity from '../components/Antigravity';
import { servicesData, techStack, testimonials } from '../data/mock';
import ContactPopup from "../components/ContactPopup";

// --- COMPONENT: 3D SERVICE CARD ---
const DetailedServiceCard = ({ icon: Icon, title, desc, features, index }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set((clientX - left) / width - 0.5);
        y.set((clientY - top) / height - 0.5);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            style={{ perspective: 1000 }}
            className="h-full"
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { x.set(0); y.set(0); }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="group relative h-full rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl flex flex-col hover:border-violet-500/30 transition-colors duration-500"
            >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[2rem] opacity-0 group-hover:opacity-20 blur-xl transition duration-500" />
                <div style={{ transform: "translateZ(30px)" }} className="relative flex flex-col h-full">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-lg group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                        <Icon className="h-8 w-8 text-violet-300 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="mb-3 text-2xl max-[376px]:text-xl max-[321px]:text-base font-bold text-white">{title}</h3>
                    <p className="text-slate-400 mb-6 leading-relaxed flex-grow">{desc}</p>
                    <ul className="space-y-3 mt-auto border-t border-white/5 pt-6">
                        {features.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-300 group-hover:text-white/80 transition-colors">
                                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- COMPONENT: INFINITE TECH MARQUEE ---
const TechMarquee = () => {
    return (
        <div className="w-full relative overflow-hidden">
            <div className="flex flex-col gap-8">
                <div className="flex w-full">
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: "-50%" }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="flex items-center gap-6 pr-6 whitespace-nowrap"
                    >
                        {[...techStack, ...techStack, ...techStack].map((tech, i) => (
                            <div key={i} className="group flex items-center gap-3 px-6 max-[426px]:px-4 py-3 max-[426px]:py-1 rounded-full bg-white/5 border border-white/5  hover:border-white transition-all duration-300 backdrop-blur-sm cursor-default">
                                <tech.icon className="w-5 max-[426px]:w-4 h-5 max-[426px]:h-4 text-slate-400 group-hover:text-white transition-colors" />
                                <span className="text-lg max-[426px]:text-base font-bold text-slate-300 group-hover:text-white transition-colors">{tech.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
                <div className="flex w-full">
                    <motion.div
                        initial={{ x: "-50%" }}
                        animate={{ x: 0 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="flex items-center gap-6 pr-6 whitespace-nowrap"
                    >
                        {[...techStack, ...techStack, ...techStack].map((tech, i) => (
                            <div key={`rev-${i}`} className="group flex items-center gap-3 px-6 max-[426px]:px-4 py-3 max-[426px]:py-1 rounded-full bg-white/5 border border-white/5 hover:border-white hover:text-white transition-all duration-300 backdrop-blur-sm cursor-default">
                                <tech.icon className="w-5 max-[426px]:w-4 h-5 max-[426px]:h-4 text-slate-400 group-hover:text-white transition-colors" />
                                <span className="text-lg max-[426px]:text-base font-bold text-slate-300 group-hover:text-white transition-colors">{tech.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// --- COMPONENT: PROCESS TIMELINE ---
const ProcessStep = ({ step, title, desc, align }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`flex items-center justify-between w-full mb-12 md:mb-24 ${align === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
        >
            {/* CONTENT CARD */}
            <div className="w-full md:w-5/12">
                <div className={`p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-colors duration-300 relative group text-left ${align === 'left' ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`absolute -top-6 left-0 ${align === 'left' ? 'md:right-0 md:left-auto' : 'md:left-0'} text-6xl font-black text-white/5 group-hover:text-violet-500/20 transition-colors duration-500 select-none`}>
                        0{step}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{title}</h3>
                    <p className="text-slate-400 relative z-10">{desc}</p>
                </div>
            </div>

            {/* CENTER NODE (Hidden on Mobile) */}
            <div className="hidden md:flex w-2/12 justify-center relative">
                <div className="w-4 h-4 bg-violet-500 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.8)] z-10 ring-4 ring-slate-950" />
            </div>

            {/* EMPTY SPACER (Hidden on Mobile) */}
            <div className="hidden md:block w-5/12" />
        </motion.div>
    );
};

// --- COMPONENT: TESTIMONIAL CARD ---
const TestimonialCard = ({ name, role, text }) => (
    <div className="
        w-[85vw] max-w-[320px] sm:w-[400px] sm:max-w-[400px] 
        p-6 sm:p-8 
        rounded-[1.5rem] sm:rounded-[2rem] 
        bg-white/5 border border-white/10 backdrop-blur-md 
        relative group hover:bg-white/10 transition-colors duration-500 
        mx-2 sm:mx-4 cursor-grab active:cursor-grabbing
        pointer-events-auto
    ">
        {/* Glow Blob */}
        <div className="absolute -top-6 -right-6 w-16 h-16 sm:w-24 sm:h-24 bg-violet-500/20 rounded-full blur-2xl group-hover:bg-violet-500/30 transition-colors duration-500" />

        <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-violet-500/50 mb-4 sm:mb-6" />

        <p className="text-base sm:text-xl md:text-2xl text-slate-200 mb-6 sm:mb-8 font-light leading-relaxed line-clamp-4">
            "{text}"
        </p>

        <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-sm sm:text-xl font-bold text-white shadow-lg shadow-violet-500/20">
                {name.charAt(0)}
            </div>
            <div>
                <h4 className="text-white font-bold text-base sm:text-lg">{name}</h4>
                <div className="flex items-center gap-2">
                    <span className="text-violet-400 text-xs sm:text-sm font-medium">{role}</span>
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-500 fill-yellow-500" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// --- MAIN PAGE COMPONENT ---
const Services = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const [isContactOpen, setContactOpen] = useState(false);

    return (
        <>
            <div className="font-sans text-gray-900 selection:bg-violet-500/30">
                {/* --- INJECT STYLES FOR MARQUEE ANIMATION --- */}
                <style>{`
                @keyframes marquee-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee-scroll {
                    animation: marquee-scroll 40s linear infinite;
                }
                .animate-marquee-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>

                {/* HERO & SERVICES GRID */}
                <div className="bg-slate-950 relative">
                    <section className="relative pt-32 pb-10 overflow-hidden">
                        <div className="absolute inset-0 w-full h-full z-0 opacity-60"><Antigravity particleShape="tetrahedron" /></div>
                        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] opacity-50" />
                        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 font-semibold mb-6 backdrop-blur-md">All-In-One Features</span>
                                <h1 className="text-2xl max-[426px]:text-3xl max-[376px]:text-2xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
                                    Everything Your Business <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                                        Needs to Grow Online
                                    </span>
                                </h1>
                                <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">We don't just give you tools. We show you how they help you get more customers, leads, and revenue.</p>
                            </motion.div>
                        </div>
                    </section>

                    <section className="py-24 relative">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {servicesData.map((service, index) => (
                                    <DetailedServiceCard key={index} {...service} index={index} />
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* TECH STACK */}
                <section className="py-20 bg-slate-900 border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
                        <p className="text-sm font-bold text-slate-300 uppercase tracking-[0.2em]">Powered By Modern Tech</p>
                    </div>
                    <TechMarquee />
                </section>

                {/* INFINITY PROCESS */}
                <section ref={containerRef} className="py-32 max-[426px]:py-14 relative overflow-hidden bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-violet-900/10 blur-[150px] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 -translate-y-1/3 mix-blend-screen" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/3 mix-blend-screen" />

                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-16 md:mb-20">
                            <span className="text-violet-400 font-semibold tracking-wider uppercase text-sm">Our Workflow</span>
                            <h2 className="text-4xl md:text-5xl max-[426px]:text-3xl max-[321px]:text-2xl font-bold text-white mb-4 mt-2">How We Deliver Results</h2>
                            <p className="text-slate-400 text-lg">From setup to scaling, we handle the entire lifecycle.</p>
                        </div>

                        {/* The Growing Line (Hidden on Mobile < 768px) */}
                        <div className="absolute left-1/2 top-48 bottom-0 w-0.5 bg-white/5 -translate-x-1/2 hidden md:block">
                            <motion.div style={{ height }} className="w-full bg-gradient-to-b from-violet-500 via-fuchsia-500 to-indigo-500 shadow-[0_0_15px_rgba(167,139,250,0.5)]" />
                        </div>

                        <div className="space-y-8 md:space-y-12 relative z-10">
                            <ProcessStep step={1} align="left" title="Setup & Identity" desc="We create your professional presence on Instagram, Facebook, and Google to build immediate trust." />
                            <ProcessStep step={2} align="right" title="Tools & Assets" desc="We deploy WhatsApp tools, launch your website, and create high-quality brand assets." />
                            <ProcessStep step={3} align="left" title="Traffic & Ads" desc="We launch targeted ad campaigns to put your business directly in front of the right audience." />
                            <ProcessStep step={4} align="right" title="Training & Growth" desc="We train you to use the tools and provide viral content ideas to keep the momentum going." />
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden group bg-slate-900">

                    {/* BACKGROUND GRADIENT */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900" />

                    {/* GRID PATTERN OVERLAY */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px]" />

                    {/* ANIMATED GLOW BLOBS */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-violet-500/20 rounded-full blur-[60px] md:blur-[100px] animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 md:w-64 md:h-64 bg-indigo-500/20 rounded-full blur-[60px] md:blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>

                    {/* TOP BORDER LINE */}
                    <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-20" />

                    {/* TEXT CONTENT */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10 md:mb-16 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl sm:text-4xl md:text-6xl max-[321px]:text-2xl font-extrabold text-white mb-4 md:mb-6 leading-tight">
                                Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Our Services</span>
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto px-2">
                                Join hundreds of businesses that have transformed their digital presence with us.
                            </p>
                        </motion.div>
                    </div>

                    {/* INFINITE SCROLL MARQUEE */}
                    <div className="relative w-full overflow-hidden z-10">
                        {/* Gradient Masks (Responsive Widths) */}
                        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-20 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent z-20 pointer-events-none" />

                        {/* The Moving Track */}
                        <div className="flex w-max animate-marquee-scroll pointer-events-none">
                            {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                                <TestimonialCard key={i} {...t} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA SECTION */}
                <section className="py-24 max-[426px]:py-14">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-12 max-[426px]:p-8 max-[376px]:p-6 text-center text-white shadow-2xl shadow-violet-500/30 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
                            <h2 className="text-3xl md:text-5xl max-[376px]:text-2xl max-[321px]:text-xl font-bold mb-6 max-[376px]:mb-3 relative z-10">Ready to Grow Online?</h2>
                            <p className="text-violet-100 text-lg max-[376px]:text-base max-[321px]:text-sm mb-8 max-[376px]:mb-6 max-w-2xl mx-auto relative z-10">Don't let your competitors take your customers. Start your digital transformation today.</p>
                            <button onClick={() => setContactOpen(true)} className="bg-white text-violet-600 hover:bg-gray-50 px-8 py-3 rounded-xl font-bold text-lg max-[426px]:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2 relative z-10 cursor-pointer">
                                <Rocket className="w-5 max-[426px]:w-4 h-5 max-[426px]:h-4" /> Get Started Now
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* RENDER POPUP COMPONENT */}
            <ContactPopup
                isOpen={isContactOpen}
                onClose={() => setContactOpen(false)}
            />
        </>
    );
};

export default Services;