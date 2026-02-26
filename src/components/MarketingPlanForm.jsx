import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Mail, Phone, Building2, MessageSquare, ChevronDown, Check, Pencil } from 'lucide-react';

const MarketingPlanForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        category: '',
        otherCategory: '',
        message: ''
    });

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const categories = [
        "SaaS", "E-commerce", "Real Estate",
        "Healthcare", "Education", "Other"
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const selectCategory = (category) => {
        setFormData({ ...formData, category });
        setIsOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-4 py-32 relative overflow-hidden font-sans selection:bg-violet-500 selection:text-white">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-4xl w-full z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-[900] text-[#111827] mb-6 tracking-tight">
                        Just One Last <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Step</span>
                    </h1>
                    <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                        Tell us a bit about yourself so we can tailor the perfect marketing strategy for your business.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-8 md:p-16 border border-gray-100"
                >
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider flex items-center gap-2">
                                <User size={16} className="text-violet-500" /> Full Name
                            </label>
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none transition-all text-gray-900 font-medium shadow-sm"
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider flex items-center gap-2">
                                <Phone size={16} className="text-violet-500" /> Mobile Number
                            </label>
                            <input
                                required
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91 98765 43210"
                                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none transition-all text-gray-900 font-medium shadow-sm"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider flex items-center gap-2">
                                <Mail size={16} className="text-violet-500" /> Email Address
                            </label>
                            <input
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@company.com"
                                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none transition-all text-gray-900 font-medium shadow-sm"
                            />
                        </div>

                        {/* Company */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider flex items-center gap-3">
                                <Building2 size={16} className="text-violet-500" /> Company Name
                            </label>
                            <input
                                required
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Digital Infinity"
                                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none transition-all text-gray-900 font-medium shadow-sm"
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2 md:col-span-2 relative" ref={dropdownRef}>
                            <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider flex items-center gap-2">
                                <ChevronDown size={16} className="text-violet-500" /> Business Category
                            </label>

                            <div
                                onClick={() => setIsOpen(!isOpen)}
                                className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between cursor-pointer shadow-sm font-medium ${isOpen ? 'border-violet-500 bg-white ring-4 ring-violet-500/10' : 'border-gray-200 bg-white hover:border-gray-300'
                                    }`}
                            >
                                <span className={formData.category ? 'text-gray-900' : 'text-gray-400'}>
                                    {formData.category || "Select your industry"}
                                </span>
                                <motion.div
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown size={20} className={isOpen ? 'text-violet-500' : 'text-gray-400'} />
                                </motion.div>
                            </div>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        className="absolute left-0 right-0 mt-3 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 z-50 overflow-hidden py-2"
                                    >
                                        <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                            {categories.map((cat) => (
                                                <div
                                                    key={cat}
                                                    onClick={() => selectCategory(cat)}
                                                    className={`px-6 py-4 flex items-center justify-between transition-colors cursor-pointer group hover:bg-violet-50 ${formData.category === cat ? 'bg-violet-50' : ''
                                                        }`}
                                                >
                                                    <span className={`font-medium transition-colors ${formData.category === cat ? 'text-violet-600' : 'text-gray-700 group-hover:text-violet-600'
                                                        }`}>
                                                        {cat}
                                                    </span>
                                                    {formData.category === cat && (
                                                        <Check size={18} className="text-violet-600" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Conditional Specify Field for "Other" */}
                        <AnimatePresence>
                            {formData.category === "Other" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                    animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                    className="md:col-span-2 overflow-hidden"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider flex items-center gap-2">
                                            <Pencil size={16} className="text-violet-500" /> Specify Category
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                                <Pencil size={18} className="text-violet-400 group-focus-within:text-violet-600 transition-colors" />
                                            </div>
                                            <input
                                                required
                                                type="text"
                                                name="otherCategory"
                                                value={formData.otherCategory}
                                                onChange={handleChange}
                                                placeholder="Please specify *"
                                                className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-violet-200 bg-violet-50/30 focus:bg-white focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10 focus:outline-none transition-all text-gray-900 font-medium shadow-sm placeholder:text-violet-300"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Message */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider flex items-center gap-2">
                                <MessageSquare size={16} className="text-violet-500" /> Message
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Tell us about your goals..."
                                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none transition-all text-gray-900 font-medium resize-none shadow-sm"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2 pt-4">
                            <motion.button
                                whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full py-5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-[900] text-xl rounded-2xl transition-all shadow-[0_20px_40px_-10px_rgba(124,58,237,0.4)] uppercase tracking-tight flex items-center justify-center gap-3 cursor-pointer"
                            >
                                Submit My Request
                                <Send size={20} />
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default MarketingPlanForm;
