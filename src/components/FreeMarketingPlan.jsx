import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { Folder, DollarSign, Brain, Check, Star, Zap, Target } from 'lucide-react';

const FreeMarketingPlan = () => {
    const [selected, setSelected] = useState([]);

    const options = [
        "Paid Advertising", "Content Marketing", "Email Marketing",
        "Creative Work", "SEO", "Conversion Rate Optimization",
        "Paid Search", "Paid Social", "Other"
    ];

    const toggleOption = (option) => {
        if (selected.includes(option)) {
            setSelected(selected.filter(item => item !== option));
        } else {
            setSelected([...selected, option]);
        }
    };

    const floatingIcons = [
        { icon: <Folder className="text-[#FFB822]" />, color: "bg-[#FFF8E6]", top: "10%", left: "10%", delay: 0 },
        { icon: <DollarSign className="text-[#22C55E]" />, color: "bg-[#ECFDF5]", top: "70%", left: "5%", delay: 1 },
        { icon: <Brain className="text-[#A855F7]" />, color: "bg-[#F5F3FF]", top: "80%", right: "10%", delay: 0.5 },
        { icon: <DollarSign className="text-[#22C55E]" />, color: "bg-[#ECFDF5]", top: "30%", right: "15%", delay: 1.5 },
        { icon: <Star className="text-[#3B82F6]" />, color: "bg-[#EFF6FF]", top: "50%", left: "8%", delay: 2 },
        { icon: <Zap className="text-[#EAB308]" />, color: "bg-[#FEFCE8]", top: "20%", right: "8%", delay: 2.5 },
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-violet-500 selection:text-white">
            {/* Background Decorative Elements - Wavy Pattern */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 rotate-180">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px] fill-gray-50">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>

            {/* Floating Icons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {floatingIcons.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ y: 0, opacity: 0 }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.6, 1, 0.6],
                            rotate: [0, index % 2 === 0 ? 10 : -10, 0]
                        }}
                        transition={{
                            duration: 4 + index,
                            repeat: Infinity,
                            delay: item.delay,
                            ease: "easeInOut"
                        }}
                        style={{ top: item.top, left: item.left, right: item.right }}
                        className={`absolute p-4 rounded-2xl ${item.color} shadow-sm border border-black/5 flex items-center justify-center`}
                    >
                        {React.cloneElement(item.icon, { size: 32, strokeWidth: 2.5 })}
                    </motion.div>
                ))}
            </div>

            <div className="max-w-5xl w-full text-center z-10 py-26">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-5xl md:text-7xl font-[900] text-[#111827] mb-8 leading-[1.05] tracking-tight">
                        Get Your Free <span className="relative">
                            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Marketing Plan</span>
                            <span className="absolute bottom-1 left-0 w-full h-3 bg-violet-600/10 -z-10 rounded-full"></span>
                        </span><br />
                        From Real Client Data
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-gray-500 text-xl md:text-2xl mb-16 max-w-5xl mx-auto font-medium"
                >
                    We crowdsource winning marketing strategies from our 250+ active clients so you win faster.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-8 md:p-20 border border-gray-100 relative overflow-hidden group"
                >
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-gray-50/50 pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="text-2xl font-black text-[#111827] mb-4 uppercase tracking-wider">What do you need help with?</h2>
                        <p className="text-gray-400 text-lg mb-12 font-semibold">Select all that apply</p>

                        <div className="flex flex-wrap justify-center gap-4 mb-16">
                            {options.map((option, idx) => (
                                <motion.button
                                    key={option}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => toggleOption(option)}
                                    className={`px-8 py-4 rounded-2xl border-2 transition-all duration-300 font-bold text-lg md:text-xl flex items-center gap-2 ${selected.includes(option)
                                        ? 'border-violet-600 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20'
                                        : 'border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200 text-gray-600'
                                        }`}
                                >
                                    {option}
                                    {selected.includes(option) && <Check size={20} className="animate-in fade-in zoom-in duration-300" />}
                                </motion.button>
                            ))}
                        </div>

                        <Link to="/free-audit/marketing-form">
                            <motion.button
                                whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full md:w-auto px-16 py-7 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-[900] text-2xl rounded-2xl transition-all shadow-[0_20px_40px_-10px_rgba(124,58,237,0.4)] uppercase tracking-tight flex items-center justify-center gap-4 mx-auto cursor-pointer"
                            >
                                START MY FREE MARKETING PLAN
                                <Target size={28} />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Wavy Pattern */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px] fill-gray-50">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>
        </div>
    );
};

export default FreeMarketingPlan;
