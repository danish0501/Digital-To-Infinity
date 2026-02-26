import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Target, Zap, TrendingUp, Users, MessageSquare, X, Sparkles } from "lucide-react";

// Import images from assets
import NaviMumbaiImg from "../assets/growth-engine-package/navi_mumbai.png";
import TeamImg from "../assets/growth-engine-package/office-working.png";
import FounderImg from "../assets/growth-engine-package/explaination.png";
import InteriorImg from "../assets/growth-engine-package/interior-work.png";
import ConsultationImg from "../assets/growth-engine-package/interior-work-explanation.png";
import OfficeImg from "../assets/growth-engine-package/office.png";
import ContactPopup from "./ContactPopup";

const GrowthEnginePackage = () => {
    const [faqOpen, setFaqOpen] = useState(null);
    const [showExitModal, setShowExitModal] = useState(false);
    const [isContactOpen, setContactOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        businessType: "",
        area: "",
        goal: ""
    });
    const [lastSubmittedName, setLastSubmittedName] = useState("");

    const businessOptions = [
        "Interior Design",
        "Real Estate",
        "Boutique Developer",
        "Architect"
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectBusiness = (option) => {
        setFormData(prev => ({ ...prev, businessType: option }));
        setIsDropdownOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (!window.hasContactPopupAutoOpened) {
            const timer = setTimeout(() => {
                if (!window.hasContactPopupAutoOpened) {
                    setContactOpen(true);
                    window.hasContactPopupAutoOpened = true;
                }
            }, 30000);

            return () => clearTimeout(timer);
        }
    }, []);

    const toggleFaq = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!formData.businessType) {
            alert("Please select your Business Type.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('https://digitaltoinfinity.com/growth_engine_contact.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();

            if (response.ok && result.status === 'success') {
                setIsSubmitting(false);
                setLastSubmittedName(formData.name);
                setIsSubmitted(true);

                // Meta Pixel Lead
                ReactPixel.track('Lead', {
                    content_name: 'Growth Engine Form',
                    content_category: 'Growth Engine',
                    business_type: formData.businessType
                });

                setFormData({ name: "", phone: "", email: "", businessType: "", area: "", goal: "" });
                setTimeout(() => setIsSubmitted(false), 8000);
            } else {
                throw new Error(result.message || "Failed to send");
            }
        } catch (error) {
            console.error("Error sending form:", error);
            setIsSubmitting(false);
            alert("Failed to send request. Please try again or contact us directly.");
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const revealProps = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    };

    const slideInLeft = {
        initial: { opacity: 0, x: -50 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    };

    const slideInRight = {
        initial: { opacity: 0, x: 50 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    };

    return (
        <motion.div
            onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'Growth Engine Page' })}
            className="bg-slate-50 text-slate-900 font-sans leading-relaxed selection:bg-blue-100 italic-none pt-10"
        >
            {/* Hero Section */}
            <header className="py-20 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
                    <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-200 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-5 max-w-6xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-8 items-stretch">

                        {/* Hero Left */}
                        <motion.div
                            {...slideInLeft}
                            className="bg-white border border-slate-200 rounded-[22px] p-10 relative overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all group"
                        >
                            <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/15 transition-colors" />

                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-700 font-semibold text-sm mb-6">
                                <Zap className="w-4 h-4 fill-blue-600" />
                                Built specifically for Navi Mumbai markets • Not for generic businesses
                            </div>

                            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6 text-slate-900">
                                Ads Aren't Your Problem. <span className="text-blue-600">Your System Is.</span>
                            </h1>

                            <p className="text-slate-600 text-lg mb-8 leading-normal font-medium">
                                A proven growth system for <strong className="text-slate-900">Interior Designers & Real Estate businesses</strong> in Navi Mumbai that turns ads into real inquiries — not just leads.
                            </p>

                            <div className="flex flex-wrap gap-4 items-center mb-10">
                                <a
                                    href="#book"
                                    onClick={() => ReactPixel.track('InitiateCheckout', { content_name: 'Growth Engine Hero Fit Check' })}
                                    className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all text-sm md:text-base"
                                >
                                    Check If This System Fits Your Business
                                </a>
                                <a href="#system" className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 hover:-translate-y-0.5 transition-all text-sm md:text-base">
                                    See How the Growth Engine Works
                                </a>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 border border-slate-200 rounded-full text-sm font-medium text-slate-600">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    Industry focus (Interior + Real Estate)
                                </div>
                                <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 border border-slate-200 rounded-full text-sm font-medium text-slate-600">
                                    Navi Mumbai positioning
                                </div>
                                <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 border border-slate-200 rounded-full text-sm font-medium text-slate-600">
                                    Clean layout & tracking
                                </div>
                            </div>

                            {/* Navi Mumbai Strip */}
                            <motion.div
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="mt-8 p-4 bg-gradient-to-b from-green-50 to-white border border-slate-200 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-24 h-14 bg-slate-200 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                                        <img src={NaviMumbaiImg} alt="Navi Mumbai Map" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-900">Built for Navi Mumbai buying behaviour</h4>
                                        <p className="text-xs text-slate-500 font-medium">Works best for Kharghar, Vashi, Nerul, Panvel side.</p>
                                    </div>
                                </div>
                                <a href="#fit" className="text-xs font-bold border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">Check fit</a>
                            </motion.div>
                        </motion.div>

                        {/* Hero Right side graphics and lists */}
                        <motion.aside
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            {/* Team Image Card */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-white border border-slate-200 rounded-[22px] overflow-hidden shadow-lg group relative"
                            >
                                <div className="h-44 overflow-hidden relative">
                                    <img src={TeamImg} alt="Team" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                            </motion.div>

                            {/* Flow Diagram Card */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-white border border-slate-200 rounded-[22px] p-6 shadow-lg shadow-slate-200/50"
                            >
                                <h3 className="font-bold text-base tracking-wide mb-1 uppercase">How the engine works</h3>
                                <p className="text-sm text-slate-500 mb-6 font-medium">One clear flow: Traffic → Enquiry → Follow-up → Conversion</p>

                                <div className="bg-white border border-slate-100 rounded-xl p-2 shadow-inner mb-6">
                                    <svg viewBox="0 0 680 170" className="w-full h-auto">
                                        <g stroke="#E5E7EB" strokeWidth="1" fill="none">
                                            <rect x="18" y="40" rx="14" width="150" height="90" fill="#F8FAFC" />
                                            <rect x="190" y="40" rx="14" width="150" height="90" fill="#F8FAFC" />
                                            <rect x="362" y="40" rx="14" width="150" height="90" fill="#F8FAFC" />
                                            <rect x="534" y="40" rx="14" width="128" height="90" fill="#F8FAFC" />
                                        </g>
                                        <g textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">
                                            <text x="93" y="78" fontSize="20" fill="#0F172A">Traffic</text>
                                            <text x="265" y="78" fontSize="20" fill="#0F172A">Enquiry</text>
                                            <text x="437" y="78" fontSize="20" fill="#0F172A">Follow-up</text>
                                            <text x="598" y="78" fontSize="20" fill="#0F172A">Convert</text>
                                        </g>
                                        <g textAnchor="middle" fontFamily="sans-serif" fontSize="16" fill="#64748b" fontWeight="500">
                                            <text x="93" y="102">Google / Meta</text>
                                            <text x="265" y="102">Direct Form</text>
                                            <text x="437" y="102">Auto-reply + CRM</text>
                                            <text x="598" y="102">Site visit</text>
                                        </g>
                                        <path d="M168 85 L180 85 M340 85 L352 85 M512 85 L524 85" stroke="#2563EB" strokeWidth="3" />
                                        <circle cx="179" cy="85" r="4" fill="#2563EB" />
                                        <circle cx="351" cy="85" r="4" fill="#2563EB" />
                                        <circle cx="523" cy="85" r="4" fill="#2563EB" />
                                    </svg>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                                        <b className="block text-base text-slate-900">System-first</b>
                                        <span className="text-[12px] text-slate-500 font-medium">Less chaos, more control</span>
                                    </div>
                                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                                        <b className="block text-base text-slate-900">Local-fit</b>
                                        <span className="text-[12px] text-slate-500 font-medium">Navi Mumbai targeting</span>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="bg-white border border-slate-200 rounded-[22px] p-6 shadow-lg"
                            >
                                <h3 className="font-bold text-base mb-1 uppercase tracking-wider text-blue-600">Best for</h3>
                                <p className="text-sm text-slate-600 mb-6 font-medium">Interior designers, small developers, channel partners doing ₹30L–₹1.5Cr annually.</p>
                                <a href="#book" className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-base mb-3 shadow-lg shadow-blue-600/20">
                                    Check Fit on a Call
                                </a>
                                <p className="text-[11px] text-center text-slate-400 font-bold uppercase tracking-widest italic">If you’re not ready for process, we’ll advise what to fix first.</p>
                            </motion.div>
                        </motion.aside>
                    </div>
                </div>
            </header>

            {/* Problem Section */}
            <section id="problem" className="py-20 scroll-mt-24">
                <div className="container mx-auto px-5 max-w-6xl">
                    <motion.div {...revealProps} className="mb-12">
                        <h2 className="text-3xl font-bold mb-2">Why Most Navi Mumbai Businesses Feel Stuck (Even After Running Ads)</h2>
                        <p className="text-slate-500 font-medium italic">It’s usually not a capability problem. It’s a system gap.</p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid md:grid-cols-2 gap-4"
                    >
                        {[
                            { title: "Leads come, but don't convert", desc: "You get numbers, but nobody visits the site or picks up calls.", icon: <Target className="w-5 h-5" /> },
                            { title: "Agencies focus on ads, not sales", desc: "They report impressions and clicks; you care about actual site visits.", icon: <TrendingUp className="w-5 h-5" /> },
                            { title: "No follow-up system", desc: "Leads get cold because there's no automated way to keep them engaged.", icon: <MessageSquare className="w-5 h-5" /> },
                            { title: "No clarity which ads actually work", desc: "Marketing feels random and unpredictable because tracking is broken.", icon: <Users className="w-5 h-5" /> }
                        ].map((p, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                whileHover={{ y: -5, scale: 1.01, borderColor: "rgba(37, 99, 235, 0.3)", backgroundColor: "#ffffff" }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className="flex gap-4 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm transition-colors cursor-default"
                            >
                                <div className="shrink-0 w-12 h-12 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl flex items-center justify-center transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                    {p.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1">{p.title}</h4>
                                    <p className="text-sm text-slate-500 font-medium">{p.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* System Explanation Section */}
            <section id="system" className="py-20 bg-white scroll-mt-24">
                <div className="container mx-auto px-5 max-w-6xl">
                    <motion.div {...revealProps} className="mb-12">
                        <h2 className="text-3xl font-bold mb-2">The Growth Engine: A Simple, Working System (Not Another Service)</h2>
                        <p className="text-slate-500 font-medium">One clear flow that handles enquiries end-to-end.</p>
                    </motion.div>

                    <div className="grid lg:grid-cols-12 gap-10">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="lg:col-span-12 xl:col-span-7 bg-white border border-slate-200 rounded-[22px] p-1 shadow-lg shadow-slate-100 overflow-hidden divide-y divide-dashed divide-slate-100"
                        >
                            {[
                                { n: 1, t: "Conversion-ready landing system", s: "Page designed to turn local traffic into high-intent enquiries." },
                                { n: 2, t: "Smart Meta + Google ad setup", s: "Intent-based targeting specifically for the Navi Mumbai market." },
                                { n: 3, t: "Lead capture + follow-up automation", s: "No lead is left behind. Immediate response to every new enquiry." },
                                { n: 4, t: "Retargeting for missed leads", s: "Stay in front of people who showed interest but didn't book yet." },
                                { n: 5, t: "Tracking that shows what actually works", s: "Clear visibility on where every rupee of your ad spend is going." }
                            ].map((step, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    className="flex gap-5 p-6 hover:bg-slate-50 transition-colors"
                                >
                                    <div className="w-10 h-10 shrink-0 bg-blue-600/10 border border-blue-600/20 text-blue-700 font-black rounded-lg flex items-center justify-center text-sm">
                                        {step.n}
                                    </div>
                                    <div>
                                        <b className="block text-slate-900 mb-0.5">{step.t}</b>
                                        <span className="text-sm text-slate-500 font-medium">{step.s}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div {...slideInRight} className="lg:col-span-12 xl:col-span-5 space-y-6">
                            <div className="rounded-[22px] overflow-hidden border border-slate-200 shadow-lg aspect-video xl:aspect-auto xl:h-64 relative group">
                                <img src={FounderImg} alt="Founder" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>

                            <div className="p-8 bg-gradient-to-b from-blue-50 to-white border border-blue-100 rounded-[22px] shadow-lg">
                                <h3 className="font-bold text-xl mb-4 text-slate-900">Result you should expect</h3>
                                <p className="text-sm text-slate-500 mb-6 font-medium">Less confusion. Better enquiry quality. More control over your pipeline.</p>
                                <ul className="space-y-4 mb-8 text-sm text-slate-700 font-medium">
                                    <li className="flex gap-3 items-center">
                                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-blue-600" /></div>
                                        Lead leakage reduces (missed calls / replies)
                                    </li>
                                    <li className="flex gap-3 items-center">
                                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-blue-600" /></div>
                                        Enquiry quality improves (better targeting)
                                    </li>
                                    <li className="flex gap-3 items-center">
                                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-blue-600" /></div>
                                        Follow-up becomes predictable
                                    </li>
                                </ul>
                                <a href="#book" className="flex items-center justify-center w-full py-4 bg-blue-600 text-white font-black rounded-xl hover:shadow-xl hover:shadow-blue-600/30 transition-all text-sm uppercase tracking-wider">
                                    Book a Free Strategy Call
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Plan Breakdown */}
            <section id="breakdown" className="py-20 bg-slate-100 border-y border-slate-200 scroll-mt-24">
                <div className="container mx-auto px-5 max-w-6xl">
                    <motion.div {...revealProps} className="mb-12">
                        <h2 className="text-3xl font-bold mb-2">What’s Included in the Growth Engine System</h2>
                        <p className="text-slate-500 text-lg font-medium">This is not a menu of services. It's one connected system.</p>
                    </motion.div>

                    <motion.div {...revealProps} className="bg-white border border-slate-200 rounded-[22px] p-8 shadow-2xl relative overflow-hidden group">
                        <p className="text-lg font-bold text-slate-800 mb-8 max-w-2xl leading-relaxed max-[769px]:mt-4 max-[480px]:mt-6">
                            This is not a “cheap plan”. It’s a starting system designed to <span className="text-blue-600 underline">remove chaos</span>, improve tracking, and build consistency.
                        </p>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid md:grid-cols-2 gap-4"
                        >
                            {[
                                { t: "High-conversion landing page", d: "Clear offer, clarity-first messaging." },
                                { t: "High-speed Lead forms", d: "Fast capture, auto-acknowledgement." },
                                { t: "Google or Meta ads setup", d: "Intent-first setup for Navi Mumbai." },
                                { t: "Basic CRM / lead tracking structure", d: "Know where enquiries are coming from." },
                                { t: "AI auto-reply / chatbot layer", d: "Basic question handling + detail capture." },
                                { t: "Simple follow-up funnel guidance", d: "Hot leads don't go cold." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    whileHover={{ y: -3, scale: 1.02, backgroundColor: "#ffffff", borderColor: "rgba(37, 99, 235, 0.3)" }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    className="flex gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl transition-all duration-300 cursor-default"
                                >
                                    <div className="shrink-0 w-8 h-8 rounded-lg bg-green-100 border border-green-200 flex items-center justify-center">
                                        <Check className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base text-slate-900 mb-0.5">{item.t}</h4>
                                        <p className="text-sm text-slate-500 font-medium">{item.d}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                            <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                                Investment starts from <span className="text-blue-600">₹25,000/month</span> (after qualification)
                            </p>
                            <button
                                onClick={() => {
                                    setContactOpen(true);
                                    ReactPixel.track('InitiateCheckout', { content_name: 'Growth Engine Apply Button' });
                                }}
                                className="px-10 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 shadow-xl transition-all text-sm uppercase tracking-widest cursor-pointer">
                                Apply for the Growth Engine
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Proof Section */}
            <section id="proof" className="py-20 scroll-mt-24">
                <div className="container mx-auto px-5 max-w-6xl">
                    <motion.div {...revealProps} className="mb-12">
                        <h2 className="text-3xl font-bold mb-2 text-center md:text-left">This System Is Already Working</h2>
                        <p className="text-slate-500 text-center md:text-left font-medium">Real outcomes, no fake numbers.</p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid md:grid-cols-3 gap-6"
                    >
                        {[
                            { area: "Interior Designers", p: "Getting consistent inquiries instead of random leads.", o: "Predictable monthly pipeline.", img: InteriorImg },
                            { area: "Real Estate Consultants", p: "Reducing wasted ad spend by targeting high-intent buyers.", o: "Better ROI on marketing.", img: OfficeImg },
                            { area: "Navi Mumbai Businesses", p: "Moving from \"trial ads\" to predictable growth systems.", o: "Scalable business model.", img: ConsultationImg }
                        ].map((proof, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                whileHover={{ y: -10, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className="bg-white border border-slate-200 rounded-[22px] overflow-hidden shadow-lg group cursor-default"
                            >
                                <div className="h-40 overflow-hidden">
                                    <img src={proof.img} alt={proof.area} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                </div>
                                <div className="p-4">
                                    <h4 className="font-bold text-lg text-slate-900 mb-3">{proof.area}</h4>
                                    <div className="space-y-2 text-sm leading-relaxed font-medium">
                                        <p><strong className="text-slate-900">Problem:</strong> <span className="text-slate-500">{proof.p}</span></p>
                                        <p><strong className="text-slate-900">Outcome:</strong> <span className="text-slate-500 font-bold">{proof.o}</span></p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Qualifier Section */}
            <section id="fit" className="py-20 bg-white scroll-mt-24">
                <div className="container mx-auto px-5 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <motion.div
                            {...slideInLeft}
                            className="p-10 bg-white border border-slate-200 rounded-[32px] shadow-2xl relative"
                        >
                            <h3 className="text-2xl font-bold mb-8 text-slate-900">This is for you if:</h3>
                            <ul className="space-y-6 text-sm">
                                {[
                                    "You are serious about predictable growth",
                                    "You've tried ads but results felt random",
                                    "You want a system, not just posting or boosting"
                                ].map((txt, i) => (
                                    <li key={i} className="flex gap-4 font-bold text-base text-slate-700 leading-snug">
                                        <div className="w-6 h-6 shrink-0 rounded-full bg-blue-100 flex items-center justify-center"><Check className="w-3 h-3 text-blue-600" /></div>
                                        {txt}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            {...slideInRight}
                            className="p-10 bg-slate-50 border border-slate-200 rounded-[32px] shadow-xl opacity-80 hover:opacity-100 transition-opacity"
                        >
                            <h3 className="text-2xl font-bold mb-8 text-slate-900">This is NOT for you if:</h3>
                            <ul className="space-y-6 text-sm">
                                {[
                                    "You want cheap leads without follow-up",
                                    "You're looking for freelancers or shortcuts",
                                    "You're not ready to invest monthly"
                                ].map((txt, i) => (
                                    <li key={i} className="flex gap-4 font-bold text-base text-slate-400 leading-snug italic">
                                        <X className="w-5 h-5 shrink-0 mt-0.5" />
                                        {txt}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Digital to Infinity Section */}
            <section id="why" className="py-24 bg-slate-900 text-white overflow-hidden relative scroll-mt-24">
                <div className="absolute inset-0 bg-blue-600/5 pointer-events-none" />
                <div className="container mx-auto px-5 max-w-6xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div {...revealProps}>
                            <h2 className="text-4xl font-bold mb-8 leading-tight italic">Local Understanding + System Thinking</h2>
                            <p className="text-slate-400 text-lg mb-12 font-medium">Not generic agency work. We build enquiry pipelines designed specifically for Navi Mumbai's buying behaviour.</p>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                className="grid sm:grid-cols-2 gap-8"
                            >
                                {[
                                    { t: "Navi Mumbai Focused", d: "Targeting logic built for local service areas." },
                                    { t: "Niche Specialization", d: "Optimized for Interior & Real Estate leads." },
                                    { t: "System-Driven", d: "Response + tracking + follow-up built-in." },
                                    { t: "Clarity Calls First", d: "We map your leaks before we ask for budget." }
                                ].map((item, i) => (
                                    <motion.div key={i} variants={itemVariants} className="group">
                                        <h4 className="font-bold text-blue-400 mb-2 truncate group-hover:translate-x-1 transition-transform">{item.t}</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.d}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div {...revealProps} className="bg-white/5 border border-white/10 rounded-[32px] p-10 backdrop-blur-3xl shadow-3xl">
                            <h3 className="text-2xl font-bold mb-6 italic">Quick clarity checklist</h3>
                            <p className="text-slate-400 text-sm mb-8 font-bold uppercase tracking-widest">If you say “yes” to these, the system fits.</p>
                            <ul className="space-y-5 text-sm font-bold text-slate-300">
                                <li className="flex gap-4"><Check className="w-5 h-5 text-blue-500 shrink-0" /> Response to leads within 30 minutes</li>
                                <li className="flex gap-4"><Check className="w-5 h-5 text-blue-500 shrink-0" /> Can do basic call/Email follow-up</li>
                                <li className="flex gap-4"><Check className="w-5 h-5 text-blue-500 shrink-0" /> Willing to invest in ads (₹15k+)</li>
                                <li className="flex gap-4"><Check className="w-5 h-5 text-blue-500 shrink-0" /> Okay with process and tracking</li>
                            </ul>
                            <div className="mt-10">
                                <a href="#book" className="flex items-center justify-center p-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 text-sm uppercase tracking-widest">Book a Fit Call Now</a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Strategic Consultation Form */}
            <section id="book" className="py-24 relative bg-slate-50 scroll-mt-24">
                <div className="container mx-auto px-5 max-w-6xl">
                    <motion.div
                        {...revealProps}
                        className="bg-white border border-slate-200 rounded-[40px] shadow-2xl p-8 md:p-16 grid lg:grid-cols-2 gap-16 items-center"
                    >
                        <div>
                            <h2 className="text-4xl font-extrabold mb-6 text-slate-900 leading-tight">Let’s See If This System Fits Your Business</h2>
                            <p className="text-slate-600 text-lg mb-8 leading-relaxed font-medium">
                                We work with a limited number of businesses per month to maintain quality.
                            </p>

                            <div className="rounded-[22px] overflow-hidden border border-slate-200 group relative mb-8">
                                <img src={ConsultationImg} alt="Consultation" className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-1000" />
                                <div className="p-4 bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center border-t border-slate-200">Strategies developed in-session</div>
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">No false guarantees. Transparent process only.</p>
                        </div>

                        <div className="relative min-h-[400px]">
                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        onSubmit={handleFormSubmit}
                                        className="space-y-5"
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 ml-1">Name *</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    placeholder="Rahul"
                                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none font-bold text-sm shadow-sm"
                                                    onChange={handleInputChange}
                                                    value={formData.name}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 ml-1">Phone Number *</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    placeholder="95942xxxxx"
                                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none font-bold text-sm shadow-sm"
                                                    onChange={handleInputChange}
                                                    value={formData.phone}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="mail@gmail.com"
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none font-bold text-sm shadow-sm"
                                                onChange={handleInputChange}
                                                value={formData.email}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5 flex flex-col relative" ref={dropdownRef}>
                                                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 ml-1">Business Type *</label>
                                                <div className="relative">
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                        className={`w-full px-5 py-3.5 bg-slate-50 border ${isDropdownOpen ? 'border-blue-500 ring-4 ring-blue-100' : 'border-slate-200'} rounded-2xl transition-all outline-none font-bold text-sm shadow-sm flex items-center justify-between group active:scale-[0.99]`}
                                                    >
                                                        <span className={formData.businessType ? 'text-slate-900' : 'text-slate-400'}>
                                                            {formData.businessType || "Select Business"}
                                                        </span>
                                                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
                                                    </button>

                                                    <AnimatePresence>
                                                        {isDropdownOpen && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                                                className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl overflow-hidden z-[100] shadow-xl"
                                                            >
                                                                <div className="p-1.5 space-y-1">
                                                                    {businessOptions.map((option) => (
                                                                        <button
                                                                            key={option}
                                                                            type="button"
                                                                            onClick={() => handleSelectBusiness(option)}
                                                                            className={`w-full px-4 py-3 text-left text-sm rounded-xl transition-all flex items-center justify-between group/opt ${formData.businessType === option ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}
                                                                        >
                                                                            {option}
                                                                            {formData.businessType === option && (
                                                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                                                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                                                                </motion.div>
                                                                            )}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 ml-1">Area (Navi Mumbai)</label>
                                                <input
                                                    type="text"
                                                    name="area"
                                                    placeholder="e.g., Vashi"
                                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none font-bold text-sm shadow-sm"
                                                    onChange={handleInputChange}
                                                    value={formData.area}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 ml-1">Main goal (1 line)</label>
                                            <input
                                                type="text"
                                                name="goal"
                                                placeholder="e.g., 20 quality enquiries / month"
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none font-bold text-sm shadow-sm"
                                                onChange={handleInputChange}
                                                value={formData.goal}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full py-4 mt-6 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20 text-base uppercase tracking-widest cursor-pointer ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        >
                                            {isSubmitting ? "Applying..." : "Apply for the Growth Engine"}
                                        </button>
                                        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                                            Not every business is accepted.
                                        </p>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-blue-50/50 rounded-3xl border border-blue-100"
                                    >
                                        <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-blue-600/20">
                                            <Check className="w-8 h-8" strokeWidth={3} />
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-tight">Request Captured!</h3>
                                        <p className="text-sm text-slate-600 font-medium max-w-xs leading-relaxed">
                                            {lastSubmittedName}, we've received your request. Our team will reach out to you within the next few working hours to block your slot.
                                        </p>
                                        <div className="mt-8 pt-6 border-t border-blue-100 w-full">
                                            <p className="text-[10px] font-black uppercase tracking-[.2em] text-blue-600">Digital to Infinity</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-20 bg-white scroll-mt-24">
                <div className="container mx-auto px-5 max-w-4xl">
                    <motion.div {...revealProps} className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 italic">Frequently Asked <span className="text-blue-600 underline">Truths</span></h2>
                        <p className="text-sm text-slate-500 font-medium">Honest answers because your time matters.</p>
                    </motion.div>

                    <div className="space-y-3">
                        {[
                            { q: "Is ₹25,000 enough to get results?", a: "₹25k is enough to set up the system properly. Results depend on execution, ad budget, and follow-up discipline. This plan removes structural problems first so performance becomes predictable." },
                            { q: "How long before I start getting enquiries?", a: "Usually within a few weeks after launch, depending on ads and offer clarity. This is not instant magic, but it is a structured approach with measurable steps." },
                            { q: "Do you guarantee leads?", a: "No false guarantees. What we do guarantee is a clear, functional system that gives you control instead of guesswork: capture, tracking, response, and follow-up." },
                            { q: "Is ad spend included?", a: "No. Ad spend is separate and paid directly by you. This keeps things transparent and prevents hidden markups." }
                        ].map((faq, i) => (
                            <motion.div
                                key={i}
                                {...revealProps}
                                className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-200 transition-colors"
                            >
                                <button
                                    onClick={() => toggleFaq(i)}
                                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 group"
                                >
                                    <span className="text-sm md:text-base">{faq.q}</span>
                                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${faqOpen === i ? 'rotate-180 bg-blue-600 text-white' : 'text-slate-400'}`}>
                                        <ChevronDown className="w-4 h-4" />
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 text-sm text-slate-500 leading-relaxed font-medium">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Exit Intent Modal */}
            <AnimatePresence>
                {showExitModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-5"
                        onClick={() => setShowExitModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-[32px] border border-white/20 shadow-3xl max-w-lg w-full p-10 relative overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute top-4 right-4 text-slate-900 cursor-pointer p-2 rounded-full hover:bg-slate-50 transition-colors" onClick={() => setShowExitModal(false)}>
                                <X className="w-6 h-6" />
                            </div>

                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8 text-blue-600">
                                <Sparkles className="w-8 h-8" />
                            </div>

                            <h3 className="text-3xl font-black text-slate-900 mb-4 italic">Not sure yet?</h3>
                            <p className="text-slate-500 text-lg mb-8 leading-relaxed font-medium">Let’s at least identify where your leads are leaking. 15 minutes. Clear direction. <span className="text-blue-600 font-bold underline decoration-blue-200 underline-offset-4">No pressure.</span></p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#book" onClick={() => setShowExitModal(false)} className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:shadow-2xl hover:shadow-blue-600/30 transition-all text-center flex-1 uppercase tracking-widest text-sm">Book Free Call</a>
                                <Link to="/plans" onClick={() => setShowExitModal(false)} className="px-8 py-4 bg-slate-50 text-slate-900 font-bold border border-slate-200 rounded-2xl hover:bg-white transition-all text-center flex-1 uppercase tracking-widest text-sm">Browse More</Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* RENDER POPUP COMPONENT */}
            <ContactPopup
                isOpen={isContactOpen}
                onClose={() => setContactOpen(false)}
                backendUrl="https://digitaltoinfinity.com/growth_engine_popup.php"
            />
        </motion.div>
    );
};

export default GrowthEnginePackage;
