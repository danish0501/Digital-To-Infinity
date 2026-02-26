import { useEffect } from 'react';
import { ArrowRight, Play, Sparkles, TrendingUp, Zap, Star } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'; 
import { companyInfo, platforms } from '../data/mock';

const HeroSection = () => {
    // OPTIMIZATION: Use MotionValues instead of State to prevent re-renders
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the mouse movement
    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Create transforms based on the motion values
    const rotateX = useTransform(y, [-0.5, 0.5], [7, -7]); // Inverse Y for rotation
    const rotateY = useTransform(x, [-0.5, 0.5], [-7, 7]);
    
    // Background orb movement (slightly amplified)
    const orbX = useTransform(x, [-0.5, 0.5], [-40, 40]);
    const orbY = useTransform(y, [-0.5, 0.5], [-40, 40]);
    const orbXInverse = useTransform(x, [-0.5, 0.5], [40, -40]);
    const orbYInverse = useTransform(y, [-0.5, 0.5], [40, -40]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Calculate normalized mouse position (-0.5 to 0.5)
            const normalizedX = e.clientX / window.innerWidth - 0.5;
            const normalizedY = e.clientY / window.innerHeight - 0.5;
            
            mouseX.set(normalizedX);
            mouseY.set(normalizedY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

                <motion.div
                    className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-500/30 rounded-full blur-[128px]"
                    style={{ x: orbX, y: orbY, opacity: 0.8 }} 
                />
                <motion.div
                    className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-500/30 rounded-full blur-[128px]"
                    style={{ x: orbXInverse, y: orbYInverse, opacity: 0.8 }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]" />

                {/* Floating Elements */}
                <div className="absolute top-20 left-[10%] animate-float-slow will-change-transform">
                    <div className="p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                        <TrendingUp className="w-6 h-6 text-emerald-400" />
                    </div>
                </div>
                <div className="absolute top-40 right-[15%] animate-float-medium will-change-transform">
                    <div className="p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                        <Zap className="w-6 h-6 text-yellow-400" />
                    </div>
                </div>
                <div className="absolute bottom-40 left-[20%] animate-float-fast will-change-transform">
                    <div className="p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                        <Star className="w-6 h-6 text-violet-400" />
                    </div>
                </div>
                <div className="absolute bottom-32 right-[25%] animate-float-slow will-change-transform">
                    <div className="p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                        <Sparkles className="w-6 h-6 text-pink-400" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-fade-in-up">
                            <Sparkles className="w-4 h-4 text-violet-400" />
                            <span className="text-sm text-white/80">Your Growth Partner</span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl max-[376px]:text-3xl max-[376px]:px-2 max-[321px]:px-0 font-bold text-white mb-6 leading-none animate-fade-in-up animation-delay-100">
                            Grow Your Business{' '}
                            <br className="hidden sm:block max-[426px]:block" />
                            <span className="relative">
                                <span className="relative z-10 bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                                    to Infinity
                                </span>
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                                    <path d="M2 10C50 4 150 4 298 10" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round" className="animate-draw-line" />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#8B5CF6" />
                                            <stop offset="100%" stopColor="#6366F1" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-xl max-[426px]:text-base max-[376px]:text-sm max-[376px]:px-2 max-[321px]:px-0 text-white/70 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-200">
                            {companyInfo.description}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mt-8 animate-fade-in-up">

                            {/* Primary Button (WhatsApp) */}
                            <a
                                href={companyInfo.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-8 py-2.5 text-lg font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                            >
                                Chat on WhatsApp
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>

                            {/* Secondary Button (View Plans) */}
                            <a
                                href="/plans"
                                className="group px-8 py-2.5 text-lg font-medium text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 flex items-center gap-2"
                            >
                                <div className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                                    <Play className="w-4 h-4 fill-current" />
                                </div>
                                View Plans
                            </a>

                        </div>

                        {/* Platform Badges */}
                        <div className="mt-12 animate-fade-in-up animation-delay-400">
                            <p className="text-sm text-white/50 mb-4">Grow Your Business on:</p>

                            <div className="flex max-[376px]:grid max-[376px]:grid-cols-2 items-center gap-4 max-[426px]:gap-2 justify-center lg:justify-start">
                                {platforms.map((platform, index) => (
                                    <div
                                        key={platform.name}
                                        className="group relative px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <span className="text-white/80 text-sm font-medium">{platform.name}</span>
                                        <div
                                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                                            style={{ backgroundColor: platform.color }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Content - 3D Card (OPTIMIZED) */}
                    <motion.div 
                        className="flex-1 relative animate-fade-in-up animation-delay-200"
                        style={{ perspective: 1000 }} 
                    >
                        <motion.div
                            className="relative"
                            style={{ 
                                rotateX, 
                                rotateY, 
                                transformStyle: "preserve-3d" 
                            }}
                        >
                            {/* Main Card */}
                            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
                                {/* Glow Effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-3xl blur-xl opacity-20" />

                                <div className="relative">
                                    {/* Stats Preview */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
                                                <TrendingUp className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold">Growth Analytics</p>
                                                <p className="text-white/50 text-sm">Real-time metrics</p>
                                            </div>
                                        </div>
                                        <div className="px-3 py-1 bg-emerald-500/20 rounded-full">
                                            <span className="text-emerald-400 text-sm font-medium">+247%</span>
                                        </div>
                                    </div>

                                    {/* Chart Visualization */}
                                    <div className="h-48 relative mb-6">
                                        <svg className="w-full h-full" viewBox="0 0 400 150">
                                            <defs>
                                                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                                                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                                                </linearGradient>
                                            </defs>
                                            <path
                                                d="M0,120 Q50,100 100,90 T200,60 T300,30 T400,10"
                                                fill="none"
                                                stroke="url(#gradient)"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                className="animate-draw-chart"
                                            />
                                            <path
                                                d="M0,120 Q50,100 100,90 T200,60 T300,30 T400,10 L400,150 L0,150 Z"
                                                fill="url(#chartGradient)"
                                                className="animate-fade-in"
                                            />
                                        </svg>
                                        {/* Data Points */}
                                        <div className="absolute top-2 right-4 w-3 h-3 bg-violet-500 rounded-full animate-pulse shadow-lg shadow-violet-500/50" />
                                    </div>

                                    {/* Metrics Row */}
                                    <div className="grid grid-cols-3 gap-4">
                                        {[
                                            { label: 'Visitors', value: '12.5K', change: '+18%' },
                                            { label: 'Leads', value: '847', change: '+24%' },
                                            { label: 'Revenue', value: '₹2.4L', change: '+32%' }
                                        ].map((metric) => (
                                            <div key={metric.label} className="text-center p-3 bg-white/5 rounded-xl">
                                                <p className="text-white/50 text-xs mb-1">{metric.label}</p>
                                                <p className="text-white font-bold text-lg">{metric.value}</p>
                                                <p className="text-emerald-400 text-xs">{metric.change}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Floating Mini Cards - with transform Z for depth */}
                            <motion.div 
                                className="absolute -top-6 -right-6 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"
                                style={{ transform: "translateZ(40px)" }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-semibold">New Lead!</p>
                                        <p className="text-white/50 text-xs">Just now</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                className="absolute -bottom-4 -left-6 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"
                                style={{ transform: "translateZ(30px)" }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-semibold">Sales Up!</p>
                                        <p className="text-white/50 text-xs">+127% this week</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                <svg viewBox="0 0 1440 120" fill="none" className="w-full">
                    <path
                        d="M0,64 C480,150 960,0 1440,64 L1440,120 L0,120 Z"
                        fill="white"
                    />
                </svg>
            </div>
        </section>
    );
};

export default HeroSection;