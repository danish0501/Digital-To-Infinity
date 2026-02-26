import { useState, lazy, Suspense } from 'react';
import ReactPixel from 'react-facebook-pixel';
import { CheckCircle2, Rocket, Wallet, TrendingUp, Smile, Trophy, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Antigravity from '../components/Antigravity';
import StatCard from '../components/StatCard';
import FeatureCard from '../components/FeatureCard';
import ServiceCard from '../components/ServiceCard';
import { values, service } from '../data/mock';

// OPTIMIZATION: Lazy load the popup so it doesn't slow down initial page load
const ContactPopup = lazy(() => import("../components/ContactPopup"));

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const AboutUs = () => {

    const [isContactOpen, setContactOpen] = useState(false);

    return (
        <>
            <motion.div
                onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'About Us Page' })}
                className="min-h-screen bg-white font-sans text-gray-900"
            >

                {/* HERO SECTION */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    <div className="absolute inset-0 w-full h-full z-0 opacity-60">
                        <Antigravity />
                    </div>
                    {/* OPTIMIZATION: Static blur instead of dynamic calculation */}
                    <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-violet-100/50 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/4" />
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="inline-block py-1 px-3 rounded-full bg-violet-50 text-violet-600 text-sm font-semibold mb-6">
                            Who We Are
                        </span>
                        <h1 className="text-6xl max-[769px]:text-5xl max-[426px]:text-3xl max-[376px]:text-2xl max-[321px]:text-xl font-extrabold tracking-tight mb-6">
                            We Don't Just Run Ads. <br />
                            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                                We Ignite Infinite Growth.
                            </span>
                        </h1>
                        <p className="text-xl max-[426px]:text-lg max-[321px]:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed max-[426px]:leading-normal">
                            Digital Infinity is a new-age performance marketing agency bridging the gap between data-driven strategy and scroll-stopping creativity.
                        </p>
                    </div>
                </section>

                {/* STATS SECTION */}
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-slate-950 skew-y-1 transform origin-top-left scale-110" />
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <StatCard icon={Wallet} value={10} prefix="₹" suffix="L+" label="Ad Spend Managed" delay={0} />
                            <StatCard icon={TrendingUp} value={30} prefix="₹" suffix="L+" label="Revenue Generated" delay={0.2} />
                            <StatCard icon={Smile} value={150} suffix="+" label="Happy Clients" delay={0.4} />
                            <StatCard icon={Trophy} value={120} suffix="%" label="Growth Rate" delay={0.6} />
                        </div>
                    </div>
                </section>

                {/* OUR STORY / MISSION */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-16 max-[769px]:gap-12 items-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl rotate-3 opacity-20 transform scale-105" />
                                {/* OPTIMIZATION: Reduced image width from 2940 to 1200 for faster load */}
                                <img
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop"
                                    alt="Team working"
                                    className="relative rounded-2xl shadow-2xl object-cover h-[500px] max-[769px]:h-[400px] max-[426px]:h-[350px] max-[321px]:h-[300px] w-full"
                                    loading="lazy"
                                />
                            </div>
                            <div className="space-y-8 max-[769px]:space-y-6">
                                <h2 className="text-3xl max-[769px]:text-2xl font-bold">Our Mission is Simple: <br /><span className="text-violet-600">Your Success is Our Fuel.</span></h2>
                                <p className="text-gray-600 text-lg max-[769px]:text-base leading-relaxed max-[769px]:leading-normal">We started Digital Infinity because we were tired of agencies that promised the moon but delivered generic reports. We believe in <strong>radical transparency</strong> and results that you can actually see in your bank account.</p>
                                <div className="space-y-4">
                                    {["Data-Driven decisions, not guesswork.", "Creative strategies that actually convert.", "Full transparency in reporting.", "A partnership, not just a service."].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="w-6 max-[769px]:w-5 max-[321px]:w-4 h-6 max-[769px]:h-5 max-[321px]:h-4 text-violet-600 shrink-0" />
                                            <span className="text-gray-700 font-medium max-[769px]:text-base max-[321px]:text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* WHY CHOOSE US */}
                <section className="relative py-32 max-[769px]:py-20 max-[376px]:py-16 overflow-hidden bg-slate-950">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e520_1px,transparent_1px),linear-gradient(to_bottom,#4f46e520_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

                        {/* OPTIMIZATION: Added will-change-transform for smoother animation */}
                        <motion.div
                            style={{ willChange: "transform" }}
                            animate={{ x: [0, 100, 0], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/30 rounded-full blur-[128px]"
                        />
                        <motion.div
                            style={{ willChange: "transform" }}
                            animate={{ x: [0, -100, 0], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-[128px]"
                        />
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl max-[376px]:text-3xl max-[321px]:text-2xl font-bold mb-6 text-white">Why Brands <span className="text-violet-500">Trust Us</span></motion.h2>
                            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-slate-400 max-w-2xl mx-auto text-lg max-[321px]:text-base">We combine the agility of a startup with the expertise of an enterprise agency.</motion.p>
                        </div>
                        <div className="grid grid-cols-1 min-[769px]:grid-cols-3 gap-8">
                            {values.map((val, idx) => (
                                <FeatureCard key={idx} icon={val.icon} title={val.title} desc={val.desc} index={idx} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* PARTNER SECTION */}
                <section className="py-32 max-[769px]:py-16 bg-violet-50/50 overflow-hidden relative">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {/* OPTIMIZATION: Added will-change-transform */}
                        <motion.div
                            style={{ willChange: "transform" }}
                            animate={{ x: [0, 50, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -left-20 top-20 w-96 h-96 bg-violet-200/40 rounded-full blur-[100px] mix-blend-multiply"
                        />
                        <motion.div
                            style={{ willChange: "transform" }}
                            animate={{ x: [0, -70, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
                            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            className="absolute -right-20 bottom-20 w-96 h-96 bg-pink-200/40 rounded-full blur-[100px] mix-blend-multiply"
                        />
                    </div>
                    <div className="max-w-7xl mx-auto px-4 max-[376px]:px-2 sm:px-6 lg:px-8 relative z-10">
                        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-violet-200/20 border border-white/40 flex flex-col min-[769px]:flex-row items-center gap-16">
                            <div className="flex-1 w-full flex justify-center">
                                <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative group w-full max-w-sm">
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 blur-3xl rounded-full group-hover:opacity-130 transition-opacity duration-700" />
                                    <div className="relative bg-white/90 backdrop-blur-xl px-10 max-[321px]:px-4 py-14 max-[321px]:py-8 rounded-3xl shadow-xl border border-red-50/50 flex flex-col items-center text-center transform transition-transform duration-500 group-hover:scale-[1.02]">
                                        <div className="relative z-10 mb-6">
                                            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} className="relative z-20">
                                                <Heart className="w-20 max-[321px]:w-16 h-20 max-[321px]:h-16 text-red-500 fill-red-500 drop-shadow-[0_10px_15px_rgba(239,68,68,0.3)]" />
                                            </motion.div>
                                        </div>
                                        <h3 className="text-3xl max-[426px]:text-2xl font-black text-gray-900 leading-tight">I <span className="text-red-500 inline-block">Love</span><br />Navi Mumbai</h3>
                                        <div className="mt-4 px-4 py-1.5 bg-red-50 rounded-full border border-red-100"><p className="text-xs text-red-600 font-bold tracking-widest uppercase">Official Partner</p></div>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="flex-1 space-y-8 text-center md:text-left">
                                <motion.div variants={itemVariants}><span className="inline-block px-4 py-1.5 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 rounded-full text-xs font-bold tracking-wider border border-red-100/50 shadow-sm">COMMUNITY POWERHOUSE</span></motion.div>
                                <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl max-[426px]:text-2xl font-bold text-gray-900 leading-tight">The Heartbeat of <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-red-500 bg-[length:200%_auto] animate-gradient">The City.</span></motion.h2>
                                <motion.div variants={itemVariants} className="space-y-6">
                                    <p className="text-gray-600 text-lg max-[321px]:text-base leading-relaxed font-medium">We are the proud official digital partners of <strong className="inline-flex items-center text-gray-900 px-2 py-1 bg-red-50 rounded-lg mx-1">I <Heart className="w-5 h-5 text-red-500 fill-red-500 mx-1.5 animate-pulse" /> Navi Mumbai</strong>, the largest community platform in the city.</p>
                                    <p className="text-gray-600 text-lg max-[321px]:text-base leading-relaxed">Connecting brands with the pulse of Navi Mumbai, we manage the digital presence that brings millions of citizens together every single day.</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* WHAT WE DO SECTION */}
                <section className="py-24 max-[426px]:py-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
                    <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500/30 rounded-full blur-[150px] animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white font-semibold tracking-wider uppercase text-sm mb-4 backdrop-blur-sm border border-white/20">Services</span>
                            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4 text-white">What We Do Best</h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 mx-auto rounded-full" />
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {service.map((service, index) => (
                                <ServiceCard
                                    key={index}
                                    icon={service.icon}
                                    title={service.title}
                                    desc={service.desc}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA SECTION */}
                <section className="py-24 max-[426px]:py-14">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-12 max-[426px]:p-8 max-[376px]:p-6 text-center text-white shadow-2xl shadow-violet-500/30 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y/2" />
                            <h2 className="text-3xl md:text-5xl max-[426px]:text-2xl max-[321px]:text-base font-bold mb-6 max-[376px]:mb-3 relative z-10">Ready to Scale to Infinity?</h2>
                            <p className="text-violet-100 text-lg max-[376px]:text-base max-[321px]:text-sm mb-8 max-[376px]:mb-6 max-w-2xl mx-auto relative z-10">Let's build a strategy that puts your brand ahead of the curve. Schedule your free audit today.</p>
                            <button
                                onClick={() => {
                                    setContactOpen(true);
                                    ReactPixel.track('InitiateCheckout', { content_name: 'About Us Journey Start' });
                                }}
                                className="bg-white text-violet-600 hover:bg-gray-50 px-8 py-3 rounded-xl font-bold text-lg max-[426px]:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2 relative z-10 cursor-pointer">
                                <Rocket className="w-5 h-5 max-[426px]:w-4 h-5 max-[426px]:h-4" /> Start Your Journey
                            </button>
                        </div>
                    </div>
                </section>
            </motion.div>

            {/* RENDER POPUP COMPONENT (Lazy Loaded) */}
            <Suspense fallback={null}>
                <ContactPopup
                    isOpen={isContactOpen}
                    onClose={() => setContactOpen(false)}
                />
            </Suspense>
        </>
    );
};

export default AboutUs;