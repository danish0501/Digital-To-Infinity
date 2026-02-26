import { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PlanCard } from '../components/Plan';
import { pricingData } from '../data/mock';

const AllPlansPage = () => {
    const navigate = useNavigate();
    const [billingCycle, setBillingCycle] = useState('monthly');

    return (
        <div className="min-h-screen bg-slate-950 font-sans selection:bg-violet-500/30 overflow-x-hidden flex flex-col">
            <Navbar />

            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
            </div>

            <main className="relative z-10 flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
                {/* HEADER / ADVERTISEMENT */}
                <div className="relative text-center max-w-7xl mx-auto mb-10 p-10 md:p-16 rounded-[2.5rem] overflow-hidden">

                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-bold mb-8 uppercase tracking-widest shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                        >
                            🚀 Dominate Your Market
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-10"
                        >
                            Unleash Unlimited <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 animate-gradient">Revenue Growth</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-5xl mx-auto font-medium"
                        >
                            Stop settling for average results. Our elite growth engineering plans are meticulously crafted
                            to transform your brand into an undeniable industry leader. We deploy advanced funnels, AI-driven automation,
                            and high-converting Omnichannel ad campaigns to scale your business predictably.
                        </motion.p>
                    </div>
                </div>

                {/* TOGGLE SWITCH */}
                <div className="flex justify-center mb-26">
                    <div className="relative bg-white/5 p-1.5 rounded-full flex items-center border border-white/10 backdrop-blur-sm">
                        {['monthly', 'yearly'].map((cycle) => (
                            <button key={cycle} onClick={() => setBillingCycle(cycle)} className={`relative px-8 py-2.5 rounded-full text-sm font-bold capitalize transition-colors duration-300 z-10 cursor-pointer ${billingCycle === cycle ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
                                {billingCycle === cycle && (<motion.div layoutId="active-pill" className="absolute inset-0 bg-violet-600 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.5)]" transition={{ type: "spring", stiffness: 300, damping: 30 }} />)}
                                <span className="relative z-10">{cycle}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* PRICING GRID */}
                <div className="grid grid-cols-1 min-[850px]:grid-cols-3 gap-8 max-[426px]:gap-12 items-start mb-20">
                    <LayoutGroup>
                        {pricingData.map((plan, index) => (
                            <motion.div key={plan.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }} className={plan.recommended ? 'min-[850px]:-mt-8 z-10' : ''}>
                                <PlanCard plan={plan} billingCycle={billingCycle} />
                            </motion.div>
                        ))}
                    </LayoutGroup>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AllPlansPage;
