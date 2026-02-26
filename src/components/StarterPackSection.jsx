import { useState, useEffect } from 'react';
import { Check, Star, Sparkles, Gift, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { starterPackFeatures, images } from '../data/mock';
import ContactPopup from "../components/ContactPopup";
import { useNavigate } from 'react-router-dom';

const StarterPackSection = () => {

    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });
    const [isContactOpen, setContactOpen] = useState(false);

    // Optimized Timer: Uses requestAnimationFrame for smoother updates  
    useEffect(() => {
        // Set fixed end date to avoid hydration mismatch
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 14);

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        };

        const timer = setInterval(updateTimer, 1000);
        updateTimer();

        return () => clearInterval(timer);
    }, []);

    const TimeBlock = ({ value, label }) => (
        <div className="flex flex-col items-center">
            <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-bold text-white font-mono">
                        {String(value).padStart(2, '0')}
                    </span>
                </div>
            </div>
            <span className="text-white/60 text-xs sm:text-sm mt-2 uppercase tracking-wider">{label}</span>
        </div>
    );

    return (
        <>
            <section className="py-20 max-[376px]:py-16 relative overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-950" />

                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

                <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">

                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
                                <Gift className="w-4 h-4 text-yellow-400" />
                                <span className="text-white/90 text-sm font-medium">Limited Time Offer</span>
                            </div>

                            {/* Heading */}
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                                Premium Starter Pack{' '}
                                <span className="text-yellow-400">Ending Soon!</span>
                            </h2>

                            <p className="text-xl text-white/80 mb-6">
                                Digital Marketing Starter Pack for Navi Mumbaikars
                            </p>

                            {/* Price */}
                            <div className="flex items-baseline gap-3 mb-8 mt-12 max-[376px]:grid max-[376px]:grid-cols-[auto_1fr]">
                                <span className="text-5xl sm:text-6xl max-[376px]:text-4xl font-bold text-white">₹44,999</span>
                                <span className="text-2xl max-[376px]:text-xl text-white/50 line-through">₹75,000</span>
                                <span className="px-3 py-1 bg-emerald-500 text-white text-sm font-medium rounded-full max-[376px]:col-span-2 max-[376px]:w-fit">
                                    Save 40%
                                </span>
                            </div>

                            {/* <div className="flex justify-center items-baseline gap-3 mb-8 mt-[-20px]">
                                <span className="text-4xl max-[376px]:text-4xl font-bold text-yellow-400">₹11,999</span>
                                <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-medium rounded-full max-[376px]:col-span-2 max-[376px]:w-fit">
                                    One Time
                                </span>
                            </div> */}

                            {/* Countdown Timer */}
                            {/* <div className="mb-8">
                                <div className="flex items-center gap-2 text-white/70 mb-4">
                                    <Clock className="w-5 h-5" />
                                    <span className="font-medium">Offer Vanishes In...</span>
                                </div>
                                <div className="flex gap-4 max-[321px]:gap-3">
                                    <TimeBlock value={timeLeft.days} label="Days" />
                                    <TimeBlock value={timeLeft.hours} label="Hours" />
                                    <TimeBlock value={timeLeft.minutes} label="Minutes" />
                                    <TimeBlock value={timeLeft.seconds} label="Seconds" />
                                </div>
                            </div> */}

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-12">
                                <button
                                    onClick={() => setContactOpen(true)}
                                    className="group inline-flex items-center justify-center px-8 py-2.5 text-lg max-[321px]:text-base font-bold text-violet-600 bg-white rounded-2xl shadow-xl shadow-violet-900/20 hover:bg-gray-50 hover:scale-105 transition-all duration-300 cursor-pointer"
                                >
                                    <Sparkles className="w-5 h-5 mr-2 fill-violet-600/20" />
                                    Claim My Offer Now
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <a
                                    href="/plans"
                                    className="inline-flex items-center justify-center px-8 py-2.5 max-[321px]:py-2 text-lg font-medium text-white border border-white/30 rounded-2xl hover:bg-white hover:text-violet-600 transition-all duration-300 backdrop-blur-sm"
                                >
                                    View All Plans
                                </a>
                            </div>
                        </motion.div>

                        {/* Right Content - Features Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="relative">
                                {/* Glow Effect */}
                                <div className="absolute -inset-4 bg-white/5 rounded-[40px] blur-2xl" />

                                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 max-[321px]:p-4 shadow-2xl">
                                    {/* Header */}
                                    <div className="flex items-center gap-3 max-[321px]:gap-2 mb-6 pb-6 border-b border-white/10">
                                        <div className="w-12 max-[321px]:w-10 h-12 max-[321px]:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                                            <Star className="w-6 max-[321px]:w-4 h-6 max-[321px]:h-4 text-white fill-current" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl max-[321px]:text-base max-[321px]:mt-5 font-bold text-white">Starter Digital Marketing Pack</h3>
                                            <p className="text-white/60 text-sm">Everything to launch & grow</p>
                                        </div>
                                    </div>

                                    {/* Features List */}
                                    <ul className="space-y-4">
                                        {starterPackFeatures.map((feature, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start gap-3 max-[321px]:gap-2"
                                            >
                                                <div className="flex-shrink-0 w-6 max-[321px]:w-5 h-6 max-[321px]:h-5 bg-emerald-500/20 rounded-full flex items-center justify-center mt-0.5">
                                                    <Check className="w-4 max-[321px]:w-3 h-4 max-[321px]:h-3 text-emerald-400" />
                                                </div>
                                                <span className="text-white/90 text-sm max-[321px]:text-xs">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Image - Optimized */}
                                    <div className="mt-6 rounded-2xl overflow-hidden bg-black/20">
                                        <img
                                            src={images.dashboard}
                                            alt="Marketing Dashboard"
                                            className="w-full h-40 object-cover opacity-80"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-xl animate-bounce">
                                    <span className="text-white text-sm font-bold">Best Value!</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* RENDER POPUP COMPONENT */}
            <ContactPopup
                isOpen={isContactOpen}
                onClose={() => setContactOpen(false)}
            />
        </>
    );
};

export default StarterPackSection;