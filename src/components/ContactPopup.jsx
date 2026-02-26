import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, Phone, MessageSquare, CheckCircle, Building2, Tag, ChevronDown, Pen, Loader2, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ReactGA from "react-ga4";

const ContactPopup = ({ isOpen, onClose, backendUrl }) => {
    const defaultBackendUrl = 'https://digitaltoinfinity.com/send_popup.php';
    const finalBackendUrl = backendUrl || defaultBackendUrl;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        category: '',
        customCategory: '',
        message: ''
    });

    const hasStartedFilling = Object.values(formData).some(value => value.trim() !== '');

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

    const getInputClass = (fieldName, isRequired) => {
        const baseClass = "w-full bg-white/10 border rounded-xl py-2.5 max-[769px]:py-2 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 transition-all duration-300 backdrop-blur-md";

        const value = formData[fieldName];
        const isFieldEmpty = value.trim() === '';

        if (fieldName === 'customCategory') {
            if (formData.category === 'Other' && (touched.customCategory || hasStartedFilling) && !formData.customCategory) {
                return `${baseClass} border-red-500 focus:border-red-500 placeholder-red-300/50`;
            }
            return `${baseClass} border-white/10 focus:border-white/40`;
        }

        if (isRequired && isFieldEmpty && (touched[fieldName] || hasStartedFilling)) {
            return `${baseClass} border-red-500 focus:border-red-500 placeholder-red-300/50`;
        }
        return `${baseClass} border-white/10 focus:border-white/40`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsSubmitting(true);
        const finalCategory = formData.category === 'Other' ? formData.customCategory : formData.category;
        const submissionData = { ...formData, finalCategory: finalCategory };

        try {
            const response = await fetch(finalBackendUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(submissionData),
            });
            const result = await response.json();
            if (response.ok && result.status === 'success') {
                setIsSubmitting(false);
                setIsSubmitted(true);

                // --- GA4 EVENT TRACKING ADDED HERE ---
                ReactGA.event({
                    category: "Lead",
                    action: "Submitted ContactPopup Form",
                    label: formData.name
                });

                // --- Meta Pixel EVENT TRACKING ---
                ReactPixel.track('Contact', {
                    content_name: 'Contact Popup',
                    category: formData.category,
                    company: formData.company
                });

                ReactPixel.track('Lead', {
                    content_name: 'Contact Popup Lead',
                    category: formData.category
                });

                setTimeout(() => {
                    setIsSubmitted(false);
                    onClose();
                    setFormData({ name: '', email: '', phone: '', company: '', category: '', customCategory: '', message: '' });
                    setTouched({});
                }, 3000);
            } else {
                throw new Error(result.message || "Failed to send");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            setIsSubmitting(false);
            alert("Failed to send message. Please try again.");
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 } },
        exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.3 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const popupContent = (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] overflow-y-auto">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-md" />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/30 rounded-full blur-[120px] pointer-events-none animate-pulse" />
                    <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
                        <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="relative w-full max-[769px]:w-[450px] max-w-lg overflow-hidden rounded-3xl shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                            <button onClick={onClose} className="absolute top-5 max-[426px]:top-3 max-[376px]:top-2 right-5 max-[426px]:right-3 max-[376px]:right-2 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:rotate-90 z-20 backdrop-blur-md cursor-pointer">
                                <X className="w-5 max-[769px]:w-4 max-[426px]:w-3 h-5 max-[769px]:h-4 max-[426px]:h-3" />
                            </button>
                            <div className="px-8 max-[769px]:px-6 max-[376px]:px-3 py-6 max-[769px]:py-4 relative z-10">
                                <AnimatePresence mode='wait'>
                                    {!isSubmitted ? (
                                        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} className="relative z-10">
                                            <motion.div variants={itemVariants} className="text-center mb-8">
                                                <h2 className="text-3xl max-[321px]:text-xl font-bold text-white mb-2 max-[769px]:mb-1 tracking-tight">Start Your Journey</h2>
                                                <p className="text-white/80 text-sm max-[769px]:text-xs max-w-sm mx-auto leading-relaxed">Don't settle for average results. Send us your details, and our strategists will contact you within 24 hours.</p>
                                            </motion.div>
                                            <form onSubmit={handleSubmit} className="space-y-5 max-[769px]:space-y-4">
                                                <motion.div variants={itemVariants} className="group relative">
                                                    <User className="absolute left-4 top-3.5 w-5 max-[769px]:w-4 h-5 max-[769px]:h-4 text-slate-300 z-10 pointer-events-none group-focus-within:text-violet-400 transition-colors duration-300" />
                                                    <input type="text" name="name" placeholder="Full Name *" required value={formData.name} onChange={handleChange} onBlur={handleBlur} className={getInputClass('name', true)} />
                                                </motion.div>
                                                <motion.div variants={itemVariants} className="group relative">
                                                    <Mail className="absolute left-4 top-3.5 w-5 max-[769px]:w-4 h-5 max-[769px]:h-4 text-slate-300 z-10 pointer-events-none group-focus-within:text-violet-400 transition-colors duration-300" />
                                                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} onBlur={handleBlur} className={getInputClass('email', false)} />
                                                </motion.div>
                                                <motion.div variants={itemVariants} className="group relative">
                                                    <Phone className="absolute left-4 top-3.5 w-5 max-[769px]:w-4 h-5 max-[769px]:h-4 text-slate-300 z-10 pointer-events-none group-focus-within:text-violet-400 transition-colors duration-300" />
                                                    <input type="tel" name="phone" placeholder="Phone Number *" required value={formData.phone} onChange={handleChange} onBlur={handleBlur} className={getInputClass('phone', true)} />
                                                </motion.div>
                                                <motion.div variants={itemVariants} className="group relative">
                                                    <Building2 className="absolute left-4 top-3.5 w-5 max-[769px]:w-4 h-5 max-[769px]:h-4 text-slate-300 z-10 pointer-events-none group-focus-within:text-violet-400 transition-colors duration-300" />
                                                    <input type="text" name="company" placeholder="Company Name *" required value={formData.company} onChange={handleChange} onBlur={handleBlur} className={getInputClass('company', true)} />
                                                </motion.div>
                                                <motion.div variants={itemVariants} className="group relative">
                                                    <Tag className="absolute left-4 top-3.5 w-5 max-[769px]:w-4 h-5 max-[769px]:h-4 text-slate-300 z-10 pointer-events-none group-focus-within:text-violet-400 transition-colors duration-300" />
                                                    <select name="category" required value={formData.category || ""} onChange={handleChange} onBlur={handleBlur} className={`${getInputClass('category', true)} appearance-none cursor-pointer`} style={{ color: formData.category ? 'white' : 'rgba(255,255,255,0.5)' }}>
                                                        <option value="" disabled className="text-black bg-white">Select Category *</option>
                                                        <option value="Real Estate" className="text-black bg-white">Real Estate</option>
                                                        <option value="Healthcare" className="text-black bg-white">Healthcare</option>
                                                        <option value="Education" className="text-black bg-white">Education</option>
                                                        <option value="Technology/SaaS" className="text-black bg-white">Technology / SaaS</option>
                                                        <option value="E-Commerce" className="text-black bg-white">E-Commerce</option>
                                                        <option value="Manufacturing" className="text-black bg-white">Manufacturing</option>
                                                        <option value="Retail" className="text-black bg-white">Retail</option>
                                                        <option value="Other" className="text-black bg-white">Other</option>
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-slate-300 pointer-events-none" />
                                                </motion.div>
                                                <AnimatePresence>
                                                    {formData.category === 'Other' && (
                                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                                            <div className="group relative mt-1">
                                                                <Pen className="absolute left-4 top-3.5 w-5 max-[769px]:w-4 h-5 max-[769px]:h-4 text-slate-300 z-10 pointer-events-none group-focus-within:text-violet-400 transition-colors duration-300" />
                                                                <input type="text" name="customCategory" placeholder="Please specify *" required value={formData.customCategory} onChange={handleChange} onBlur={handleBlur} className={getInputClass('customCategory', true)} />
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                                <motion.div variants={itemVariants} className="group relative">
                                                    <MessageSquare className="absolute left-4 top-3.5 w-5 max-[769px]:w-4 h-5 max-[769px]:h-4 text-slate-300 z-10 pointer-events-none group-focus-within:text-violet-400 transition-colors duration-300" />
                                                    <textarea name="message" rows="3" placeholder="Tell us about your goals..." value={formData.message} onChange={handleChange} className="w-full bg-white/10 border border-white/10 rounded-xl py-2.5 max-[769px]:py-2 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 backdrop-blur-md resize-none"></textarea>
                                                </motion.div>
                                                <motion.button
                                                    variants={itemVariants}
                                                    whileHover={!isSubmitting && isFormValid ? { scale: 1.02 } : {}}
                                                    whileTap={!isSubmitting && isFormValid ? { scale: 0.98 } : {}}
                                                    type="submit"
                                                    disabled={isSubmitting || !isFormValid}
                                                    className={`w-full py-3 max-[426px]:py-2 font-bold rounded-xl shadow-xl shadow-black/20 flex items-center justify-center gap-2 transition-all duration-300 group
                                                        ${isFormValid && !isSubmitting ? 'bg-white text-violet-700 hover:bg-gray-50 cursor-pointer' : 'bg-white/50 text-white/50 cursor-not-allowed'}`}
                                                >
                                                    {isSubmitting ? (
                                                        <><Loader2 className="w-4 h-4 animate-spin" /><span>Sending...</span></>
                                                    ) : (
                                                        <><span className="ml-1">{isFormValid ? "Send Message" : "Fill Required Fields"}</span><Send className="w-4 h-4" /></>
                                                    )}
                                                </motion.button>
                                            </form>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-10 text-center">
                                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 border border-white/30 backdrop-blur-md">
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}><CheckCircle className="w-10 h-10 text-white" /></motion.div>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                            <p className="text-white/80">We'll be in touch shortly.</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );

    if (typeof document === "undefined") return null;
    return createPortal(popupContent, document.body);
};

export default ContactPopup;