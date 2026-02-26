import { useState } from 'react';
import ReactPixel from 'react-facebook-pixel';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Instagram, Globe, Sparkles } from 'lucide-react';
import ContactPopup from "../components/ContactPopup";
import { webProjects } from "../data/mock";
import { socialPortfolios } from "../data/mock";

// SOCIAL MEDIA COMPONENTS
const InstagramGrid = ({ images }) => {
    return (
        <motion.div
            className="w-full max-w-sm max-[426px]:w-80 max-[321px]:w-65 mx-auto rounded-xl overflow-hidden shadow-2xl"
            initial={{ rotate: -6, y: 0, x: 0 }}
            animate={{
                y: [-15, 15, -15],
                x: [-5, 5, -5],
                rotate: [-6, -4, -8, -6]
            }}
            transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ willChange: "transform", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
            <div className="grid grid-cols-3 gap-[2px] bg-white p-[2px]">
                {images.map((src, i) => (
                    <div key={i} className="relative aspect-[4/5] overflow-hidden group cursor-pointer isolate">
                        <img
                            src={src}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const PortfolioSection = ({ item, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col md:items-center gap-12 max-[769px]:gap-8 mb-32 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        >
            <div className="w-full md:w-1/2">
                <InstagramGrid images={item.images} />
            </div>

            <div className="w-full md:w-1/2">
                <div className="flex items-center gap-3 mb-6 max-[376px]:mb-4">
                    <div className="p-3 rounded-full bg-violet-500/10 border border-violet-500/30">
                        <Instagram className="w-6 max-[376px]:w-5 h-6 max-[376px]:h-5 text-violet-400" />
                    </div>
                    <div>
                        <h3 className="text-2xl max-[376px]:text-xl font-bold text-white leading-none">{item.client}</h3>
                        <p
                            onClick={() => window.open(`https://www.instagram.com/${item.handle.replace('@', '')}`, '_blank')}
                            className="text-sm text-violet-400 font-mono mt-1 cursor-pointer hover:text-violet-300 transition-all w-fit"
                        >
                            {item.handle}
                        </p>
                    </div>
                </div>

                <div className="flex gap-8 mb-8 max-[376px]:mb-4 border-y border-white/10 py-4 max-[376px]:py-2">
                    <div>
                        <span className="block text-xl max-[376px]:text-lg font-bold text-white">{item.stats.posts}</span>
                        <span className="text-xs text-slate-500 uppercase tracking-wider">Posts</span>
                    </div>
                    <div>
                        <span className="block text-xl max-[376px]:text-lg font-bold text-white">{item.stats.followers}</span>
                        <span className="text-xs text-slate-500 uppercase tracking-wider">Followers</span>
                    </div>
                    <div>
                        <span className="block text-xl max-[376px]:text-lg font-bold text-white">{item.stats.following}</span>
                        <span className="text-xs text-slate-500 uppercase tracking-wider">Following</span>
                    </div>
                </div>

                <p className="text-slate-400 text-lg max-[376px]:text-base leading-relaxed mb-6">
                    {item.description}
                </p>

                <button
                    onClick={() => window.open(item.website, '_blank')}
                    className="group flex items-center gap-2 max-[376px]:text-base text-white font-bold border-b border-white/30 pb-1 hover:border-violet-500 hover:text-violet-400 transition-all cursor-pointer"
                >
                    <span>View Live Project</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
};

// WEBSITE DESIGNS SUB-COMPONENTS
const ProjectCard = ({ project }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

    function onMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            style={{ perspective: 1000 }}
            className="w-full h-[400px] max-[769px]:h-[350px] max-[426px]:h-[220px]"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={() => window.open(project.website || '#', '_blank')}
                className="relative w-full h-full rounded-3xl bg-slate-900 border border-white/10 group cursor-pointer overflow-hidden shadow-2xl"
            >
                {/* IMAGE LAYER */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-fill transition-transform duration-700 group-hover:scale-100 opacity-60 group-hover:opacity-40 max-[769px]:opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* CONTENT LAYER */}
                <div style={{ transform: "translateZ(50px)" }} className="absolute inset-0 p-6 flex flex-col justify-end z-20 pointer-events-none">

                    {/* Title */}
                    <div className="mb-2 transform translate-y-4 group-hover:translate-y-0 max-[769px]:translate-y-0 transition-transform duration-500">
                        <h3 className="text-3xl max-[769px]:text-2xl max-[321px]:text-xl font-bold text-white mb-1">{project.title}</h3>
                    </div>

                    {/* Description & Button Row */}
                    <div className="flex items-center justify-between gap-4 opacity-0 group-hover:opacity-100 max-[769px]:opacity-100 transition-opacity duration-500 delay-100">
                        <p className="text-slate-300 text-sm line-clamp-2 leading-relaxed flex-1">
                            {project.description}
                        </p>

                        <div className="w-10 max-[426px]:w-8 h-10 max-[426px]:h-8 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform pointer-events-auto">
                            <ArrowUpRight className="w-5 max-[426px]:w-4 h-5 max-[426px]:h-4" />
                        </div>
                    </div>
                </div>

                {/* GLOSS EFFECT - Hidden on mobile */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30 max-[769px]:hidden"
                    style={{
                        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.0) 50%)"
                    }}
                />
            </motion.div>
        </motion.div>
    );
};

// WEBSITE DESIGNS COMPONENT
const WebsiteDesigns = () => {
    const [filter, setFilter] = useState('all');
    const filteredProjects = webProjects.filter(p => filter === 'all' ? true : p.type === filter);

    return (
        <div className="w-full">
            {/* 3D Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 gap-8 lg:gap-12"
            >
                <AnimatePresence mode='popLayout'>
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-20 text-slate-500">
                    <p>No web projects found in this specific category.</p>
                </div>
            )}
        </div>
    );
};

// MAIN PAGE (Portfolios)
const Portfolios = () => {
    const [isContactOpen, setContactOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('web');

    return (
        <>
            <motion.div
                onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'Portfolio Page' })}
                className="min-h-screen bg-[#050505] text-white selection:bg-violet-500/30 font-sans overflow-x-hidden"
            >

                {/* Background Ambiance */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 contrast-150" />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

                    {/* HEADER */}
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 font-semibold mb-6 backdrop-blur-md">
                                OUR WORK
                            </span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl max-[426px]:text-4xl max-[321px]:text-3xl font-black text-white mb-6"
                        >
                            Digital To Infinity <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Portfolios.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl max-[426px]:text-lg text-slate-400 mb-10"
                        >
                            We don't just post content; we curate digital experiences.
                            Here is a selection of our best performing work.
                        </motion.p>

                        {/* --- TAB SWITCHER --- */}
                        <div className="flex justify-center mb-16">
                            <div className="inline-flex bg-white/5 backdrop-blur-sm p-1.5 rounded-full border border-white/10">

                                {/* WEB BUTTON */}
                                <button
                                    onClick={() => setActiveTab('web')}
                                    className={`relative px-6 max-[376px]:px-4 max-[321px]:px-1 py-2.5 max-[376px]:py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${activeTab === 'web' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                                >
                                    {activeTab === 'web' && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-cyan-600 rounded-full shadow-lg shadow-cyan-500/30"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2 max-[376px]:gap-1">
                                        <Globe className="w-4 h-4" /> Websites Designs
                                    </span>
                                </button>

                                {/* SOCIAL BUTTON */}
                                <button
                                    onClick={() => setActiveTab('social')}
                                    className={`relative px-6 max-[376px]:px-4 max-[321px]:px-1 py-2.5 max-[376px]:py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${activeTab === 'social' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                                >
                                    {activeTab === 'social' && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-violet-600 rounded-full shadow-lg shadow-violet-500/30"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10 max-[376px]:text-xs flex items-center gap-2 max-[376px]:gap-1">
                                        <Instagram className="w-4 h-4" /> Social Media
                                    </span>
                                </button>

                            </div>
                        </div>
                    </div>

                    {/* --- CONDITIONAL RENDERING --- */}
                    <div className="w-full min-h-[400px]">
                        <AnimatePresence mode='wait'>
                            {activeTab === 'social' ? (
                                <motion.div
                                    key="social"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {socialPortfolios.map((item, index) => (
                                        <PortfolioSection key={item.id} item={item} index={index} />
                                    ))}
                                    {socialPortfolios.length === 0 && (
                                        <div className="text-center py-20 text-slate-500">No social projects found.</div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="web"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* CALLING YOUR WEB COMPONENT HERE */}
                                    <WebsiteDesigns />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* BOTTOM CTA */}
                    <div className="mt-20 text-center">
                        <button
                            onClick={() => {
                                setContactOpen(true);
                                ReactPixel.track('InitiateCheckout', { content_name: 'Portfolio Transformation Start' });
                            }}
                            className="group relative px-10 max-[321px]:px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2 mx-auto cursor-pointer"
                        >
                            <span>Start Your Transformation</span>
                            <Sparkles className="w-4 h-4 text-purple-600" />
                        </button>
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

export default Portfolios;