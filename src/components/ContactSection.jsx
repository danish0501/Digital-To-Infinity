import { useState, useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageCircle, User, Instagram, Facebook, Linkedin, Loader2, Check, Sparkles, ArrowRight, Building2, Tag, ChevronDown, Pen, CheckCircle2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { companyInfo } from '../data/mock';
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

// --- OPTIMIZED BACKGROUND (CSS ANIMATIONS) ---
const CosmicBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* CSS-based Blobs (GPU Accelerated) */}
            <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-violet-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute top-[10%] -right-[20%] w-[60vw] h-[60vw] bg-indigo-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
            <div className="absolute bottom-[0%] left-[20%] w-[50vw] h-[50vw] bg-fuchsia-600/10 rounded-full blur-[80px] mix-blend-screen animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />

            {/* Static Grid */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}
            />
        </div>
    );
};

// --- OPTIMIZED SPOTLIGHT CARD ---
const SpotlightCard = ({ children, className = "" }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`group relative border border-white/10 bg-white/5 overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(139, 92, 246, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
};

// --- MAIN CONTACT SECTION ---
const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        category: '',
        customCategory: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const categories = [
        "Real Estate", "Healthcare", "Education", "Technology / SaaS",
        "E-Commerce", "Manufacturing", "Retail", "Other"
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

    const handleCategorySelect = (category) => {
        setFormData(prev => ({ ...prev, category }));
        setIsDropdownOpen(false);
    };

    // --- VALIDATION STATE ---
    const [touched, setTouched] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    // Check if user has started filling ANY field (to trigger validation visuals)
    const hasStartedFilling = Object.values(formData).some(value => value.trim() !== '');

    // Validate Form on every change
    useEffect(() => {
        const isValid =
            formData.name.trim() !== '' &&
            formData.phone.trim() !== '' &&
            formData.company.trim() !== '' &&
            formData.category !== '' &&
            (formData.category !== 'Other' || formData.customCategory.trim() !== '');

        setIsFormValid(isValid);
    }, [formData]);

    const handleBlur = (e) => {
        setTouched({ ...touched, [e.target.name]: true });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Helper for Red Outline Logic
    const getInputClass = (fieldName, isRequired = false) => {
        const baseClass = "w-full bg-slate-900/50 border rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-1 transition-all hover:bg-slate-900/80";
        const validClass = "border-white/10 placeholder:text-slate-600 focus:border-violet-500/50 focus:ring-violet-500/50";
        const errorClass = "border-red-500 placeholder:text-red-400/50 focus:border-red-500 focus:ring-red-500";

        const value = formData[fieldName];
        const isFieldEmpty = value.trim() === '';

        if (fieldName === 'customCategory') {
            if (formData.category === 'Other' && (touched.customCategory || hasStartedFilling) && !formData.customCategory) {
                return `${baseClass} ${errorClass}`;
            }
            return `${baseClass} ${validClass}`;
        }

        // Logic: Only show red if field is REQUIRED, EMPTY, and User has interacted
        if (isRequired && isFieldEmpty && (touched[fieldName] || hasStartedFilling)) {
            return `${baseClass} ${errorClass}`;
        }
        return `${baseClass} ${validClass}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('https://digitaltoinfinity.com/send_contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                setIsSubmitting(false);
                setSubmitted(true);

                // --- GA4 EVENT TRACKING ADDED HERE ---
                ReactGA.event({
                    category: "Lead",
                    action: "Submitted Contact Form",
                    label: formData.name
                });

                // --- Meta Pixel EVENT TRACKING ---
                ReactPixel.track('Contact', {
                    content_name: 'Main Contact Form',
                    category: formData.category,
                    company: formData.company
                });

                ReactPixel.track('Lead', {
                    content_name: 'Main Contact Form Lead',
                    category: formData.category
                });

                setFormData({ name: '', email: '', phone: '', company: '', category: '', customCategory: '', message: '' });
                setTouched({});
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                throw new Error(result.message || "Failed to send");
            }

        } catch (error) {
            console.error("Error sending email:", error);
            setIsSubmitting(false);
            alert("Failed to send message.");
        }
    };

    const socialLinks = [
        { icon: Instagram, href: 'https://www.instagram.com/digitaltoinfinity/', color: 'text-pink-500' },
        { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61568974208735', color: 'text-blue-500' },
        { icon: Linkedin, href: 'https://www.linkedin.com/company/digital-to-infinity/', color: 'text-blue-400' },
    ];

    return (
        <motion.section
            onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'Contact Section' })}
            className="relative w-full max-w-[100vw] overflow-x-hidden bg-slate-950 py-24 md:py-32 selection:bg-violet-500/30"
        >

            {/* DYNAMIC BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-violet-950" />
                <CosmicBackground />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* HEADER */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Get In Touch</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-6xl max-[769px]:text-5xl max-[376px]:text-4xl font-bold text-white mb-6 tracking-tight"
                    >
                        Let's Start Your <span className="leading-normal text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400"> Digital Journey</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-lg text-slate-400 max-w-2xl mx-auto"
                    >
                        Have a question or ready to grow your business? Reach out to us and let's make it happen!
                    </motion.p>
                </div>

                {/* THE SPLIT LAYOUT */}
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* LEFT: CONTACT INFO  */}
                    <div className="lg:col-span-5 space-y-4">

                        <SpotlightCard className="rounded-3xl p-6 sm:p-8">
                            <div className="flex items-start gap-4">
                                <div className="shrink-0 p-3 bg-violet-600/20 rounded-lg text-violet-400">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-white">Call Us</h3>
                                    <p className="text-slate-400 text-sm mb-2">Mon-Sat from 10AM to 8PM.</p>
                                    <a href={`tel:+91${companyInfo.phone}`} className="text-white hover:text-violet-400 transition-colors font-mono block break-words">+91 {companyInfo.phone}</a>
                                </div>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="rounded-3xl p-6 sm:p-8">
                            <div className="flex items-start gap-4">
                                <div className="shrink-0 p-3 bg-violet-600/20 rounded-lg text-violet-400">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-white">Email Us</h3>
                                    <p className="text-slate-400 text-sm mb-2">We'll respond within 24 hours.</p>
                                    <a href={`mailto:${companyInfo.email}`} className="text-white hover:text-violet-400 transition-colors font-mono block break-all">{companyInfo.email}</a>
                                </div>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="rounded-3xl p-6 sm:p-8">
                            <div className="flex items-start gap-4">
                                <div className="shrink-0 p-3 bg-violet-600/20 rounded-lg text-violet-400">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-white">Visit Us</h3>
                                    <p className="text-slate-400 text-sm">Room no 101, F-9, Sec - 3E, Kalamboli, Navi Mumbai, Maharashtra - 410218</p>
                                    <div className="flex gap-4 mt-6">
                                        {socialLinks.map((social, i) => (
                                            <a key={i} href={social.href} target="_blank" rel="noreferrer" className={`hover:scale-110 transition-transform ${social.color}`}>
                                                <social.icon className="w-6 h-6" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>

                        {/* --- WHATSAPP SPOTLIGHT CARD --- */}
                        <SpotlightCard className="rounded-3xl p-6 sm:p-8">
                            <div className="flex items-start gap-4">
                                <div className="shrink-0 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400">
                                    <MessageCircle className="w-6 h-6" />
                                </div>

                                <div className="w-full flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-white">WhatsApp</h3>
                                    <p className="text-slate-400 text-sm mb-4">Need a quick response? Chat with us.</p>

                                    <button
                                        onClick={() => window.open(companyInfo.whatsapp, '_blank')}
                                        className="group relative w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 cursor-pointer"
                                    >
                                        <span>Chat Now</span>
                                        <ArrowRight className=" w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>

                    {/* RIGHT: THE FORM  */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl"
                        >
                            {/* Form Glow Effect - Static to save performance */}
                            <div className="absolute -top-24 -right-24 max-[500px]:-right-4 w-48 h-48 bg-violet-500/30 rounded-full blur-[80px] pointer-events-none" />

                            <AnimatePresence mode="wait">
                                {!submitted ? (
                                    <motion.form
                                        key="contact-form"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-6 relative z-10"
                                    >
                                        <div className="grid md:grid-cols-2 gap-6">

                                            {/* Name Input - Required */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-300 ml-1">
                                                    Name <span className="text-slate-300">*</span>
                                                </label>
                                                <div className="relative group">
                                                    <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        required
                                                        placeholder="John Doe"
                                                        className={getInputClass('name', true)}
                                                    />
                                                </div>
                                            </div>

                                            {/* Phone Input - Required */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-300 ml-1">
                                                    Phone <span className="text-slate-300">*</span>
                                                </label>
                                                <div className="relative group">
                                                    <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        required
                                                        placeholder="+91 987..."
                                                        className={getInputClass('phone', true)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Email Input - Optional */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
                                            <div className="relative group">
                                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    required={false}
                                                    placeholder="john@example.com"
                                                    className={getInputClass('email', false)}
                                                />
                                            </div>
                                        </div>

                                        {/* Company & Category Row */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Company Name */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-300 ml-1">
                                                    Company Name <span className="text-slate-300">*</span>
                                                </label>
                                                <div className="relative group">
                                                    <Building2 className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                                                    <input
                                                        type="text"
                                                        name="company"
                                                        value={formData.company}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        required
                                                        placeholder="Company Name"
                                                        className={getInputClass('company', true)}
                                                    />
                                                </div>
                                            </div>

                                            {/* Business Category */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-300 ml-1">
                                                    Select Category <span className="text-slate-300">*</span>
                                                </label>
                                                <div className="relative" ref={dropdownRef}>
                                                    <div
                                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                        className={`${getInputClass('category', true)} cursor-pointer flex items-center justify-between group/dropdown`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <Tag className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                                                            <span className={formData.category ? "text-white" : "text-slate-600"}>
                                                                {formData.category || "Select Category"}
                                                            </span>
                                                        </div>
                                                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                                    </div>

                                                    <AnimatePresence>
                                                        {isDropdownOpen && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                                                className="absolute top-full left-0 right-0 mt-2 p-2 bg-slate-900/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl z-[100] max-h-[300px] overflow-y-auto custom-scrollbar"
                                                            >
                                                                <div className="grid gap-1">
                                                                    {categories.map((cat, i) => (
                                                                        <motion.button
                                                                            key={cat}
                                                                            initial={{ opacity: 0, x: -10 }}
                                                                            animate={{ opacity: 1, x: 0 }}
                                                                            transition={{ delay: i * 0.05 }}
                                                                            type="button"
                                                                            onClick={() => handleCategorySelect(cat)}
                                                                            className={`w-full px-4 py-2.5 rounded-xl text-left text-sm transition-all flex items-center justify-between group/item
                                                                                ${formData.category === cat
                                                                                    ? 'bg-violet-600 text-white'
                                                                                    : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
                                                                        >
                                                                            <span>{cat}</span>
                                                                            {formData.category === cat && (
                                                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                                                    <Check className="w-4 h-4" />
                                                                                </motion.div>
                                                                            )}
                                                                        </motion.button>
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Conditional Other Field */}
                                        <AnimatePresence>
                                            {formData.category === 'Other' && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0, y: -10 }}
                                                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                                                    exit={{ opacity: 0, height: 0, y: -10 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-slate-300 ml-1">
                                                            Please specify <span className="text-slate-300">*</span>
                                                        </label>
                                                        <div className="relative group">
                                                            <Pen className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                                                            <input
                                                                type="text"
                                                                name="customCategory"
                                                                value={formData.customCategory}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                required
                                                                placeholder="Please specify *"
                                                                className={getInputClass('customCategory', true)}
                                                            />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Message Input - Optional */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300 ml-1">Message</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required={false}
                                                rows={4}
                                                placeholder="Tell us about your project..."
                                                className={`${getInputClass('message', false)} !pl-4 resize-none`}
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || submitted || !isFormValid}
                                            className={`relative w-full py-3 max-[426px]:py-2.5 rounded-xl font-bold text-lg max-[426px]:text-base overflow-hidden transition-all duration-300 transform 
                                            ${isFormValid && !isSubmitting && !submitted
                                                    ? 'bg-white text-slate-900 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:-translate-y-1 cursor-pointer'
                                                    : submitted
                                                        ? 'bg-emerald-500 text-white cursor-default'
                                                        : 'bg-white/20 text-white/50 cursor-not-allowed'
                                                }`}
                                        >
                                            <div className="relative z-10 flex items-center justify-center gap-2">
                                                {isSubmitting ? (
                                                    <> <Loader2 className="w-5 h-5 animate-spin" /> Sending... </>
                                                ) : submitted ? (
                                                    <> <Check className="w-5 h-5" /> Sent Successfully </>
                                                ) : (
                                                    <>
                                                        <span>{isFormValid ? "Send Message" : "Fill Required Fields"}</span>
                                                        {isFormValid && <Send className="w-5 h-5" />}
                                                    </>
                                                )}
                                            </div>

                                            {/* Shimmer Effect on Button */}
                                            {!submitted && isFormValid && (
                                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                                            )}
                                        </button>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success-message"
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 1.05 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 relative z-10"
                                    >
                                        <div className="relative">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 12 }}
                                                className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 relative z-10"
                                            >
                                                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                                            </motion.div>
                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    opacity: [0.3, 0.1, 0.3],
                                                }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl -z-0"
                                            />
                                        </div>

                                        <motion.h3
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-3xl font-bold text-white mb-4"
                                        >
                                            Message Sent <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Successfully!</span>
                                        </motion.h3>

                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className="text-slate-400 text-lg max-w-sm"
                                        >
                                            Thank you for reaching out. Our team will review your project and get back to you within 24 hours.
                                        </motion.p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default ContactSection;