import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, User, Target, Package, Check, ArrowRight, ArrowLeft, Globe,
    Link2, MapPin, Phone, MessageCircle, Sparkles, Calendar, ChevronRight, Loader2
} from 'lucide-react';
import ReactPixel from 'react-facebook-pixel';

const CosmicBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-violet-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[10%] -right-[20%] w-[60vw] h-[60vw] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute bottom-[0%] left-[20%] w-[50vw] h-[50vw] bg-fuchsia-600/5 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
    </div>
);

const ProgressBar = ({ currentStep, totalSteps }) => {
    const steps = [
        { id: 1, label: 'Business', icon: Building2 },
        { id: 2, label: 'Contact', icon: User },
        { id: 3, label: 'Goals', icon: Target },
        { id: 4, label: 'Package', icon: Package }
    ];

    return (
        <div className="relative mb-16 max-[426px]:mb-10 px-4 max-[426px]:px-0">
            {/* Background Line */}
            <div className="absolute top-5 max-[426px]:top-3.5 left-8 right-8 h-0.5 bg-white/10 rounded-full" />

            {/* Progress Line */}
            <div className="absolute top-5 max-[426px]:top-3.5 left-8 right-8 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>

            <div className="relative flex justify-between items-start z-10">
                {steps.map((step) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;

                    return (
                        <div key={step.id} className="flex flex-col items-center">
                            {/* Step Circle */}
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isActive ? 1.15 : 1,
                                    backgroundColor: isCompleted ? 'rgba(139, 92, 246, 1)' : 'rgba(15, 23, 42, 1)',
                                    borderColor: isCompleted || isActive ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)'
                                }}
                                className={`w-10 max-[426px]:w-8 h-10 max-[426px]:h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 relative backdrop-blur-xl ${isActive ? 'shadow-[0_0_20px_rgba(139,92,246,0.4)]' : ''}`}
                            >
                                {isCompleted ? (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                        <Check className="w-5 h-5 text-white" />
                                    </motion.div>
                                ) : (
                                    <span className={`text-sm font-bold ${isActive ? 'text-violet-400' : 'text-slate-500'}`}>
                                        {step.id}
                                    </span>
                                )}

                                {/* Outer glow for active step */}
                                {isActive && (
                                    <motion.div
                                        layoutId="step-glow"
                                        className="absolute -inset-3 rounded-full bg-violet-500/10 blur-md -z-10"
                                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                    />
                                )}
                            </motion.div>

                            {/* Label */}
                            <motion.span
                                animate={{
                                    color: isActive || isCompleted ? 'rgba(255, 255, 255, 0.9)' : 'rgba(100, 116, 139, 0.7)',
                                    opacity: isActive || isCompleted ? 1 : 0.6
                                }}
                                className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-center"
                            >
                                {step.label}
                            </motion.span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const StepWrapper = ({ children, title, subtitle, icon: Icon }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-8"
    >
        <div className="flex items-center gap-4 max-[321px]:gap-2 mb-8">
            <div className="p-3 max-[321px]:p-2.5 bg-violet-600/20 rounded-2xl text-violet-400 border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h2 className="text-2xl max-[426px]:text-xl max-[321px]:text-base font-bold text-white tracking-tight">{title}</h2>
                <p className="text-slate-400 text-sm max-[321px]:text-xs">{subtitle}</p>
            </div>
        </div>
        {children}
    </motion.div>
);

const CustomDropdown = ({ options, value, onChange, placeholder, label, name, icon: Icon, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let timeout;
        if (isHovered) {
            setIsOpen(true);
        } else {
            timeout = setTimeout(() => setIsOpen(false), 200);
        }
        return () => clearTimeout(timeout);
    }, [isHovered]);

    const errorClasses = error ? "ring-2 ring-red-500/50 border-red-500/50" : "border-white/10 hover:border-white/20";

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {label && <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">{label}</label>}
            <div
                className={`w-full bg-slate-900/50 border rounded-xl py-3 px-4 text-white flex items-center justify-between cursor-pointer transition-all hover:bg-slate-900/80 ${errorClasses} ${isOpen ? 'ring-2 ring-violet-500/50 border-violet-500/50' : ''}`}
            >
                <div className="flex items-center gap-3">
                    {Icon && <Icon className="w-4 h-4 text-slate-500" />}
                    <span className={value ? 'text-white' : 'text-slate-600'}>
                        {value || placeholder}
                    </span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronRight className="w-4 h-4 text-slate-500 rotate-90" />
                </motion.div>
            </div>

            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-xs mt-1 ml-1 font-medium"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-[100] w-full mt-2 bg-slate-900/95 border border-white/10 rounded-xl overflow-hidden backdrop-blur-xl shadow-2xl"
                    >
                        <div className="py-2 max-h-60 overflow-y-auto overflow-x-hidden custom-scrollbar">
                            {options.map((option) => (
                                <motion.div
                                    key={option}
                                    whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.2)', x: 4 }}
                                    onClick={() => {
                                        onChange({ target: { name, value: option } });
                                        setIsOpen(false);
                                        setIsHovered(false);
                                    }}
                                    className={`px-4 py-2.5 cursor-pointer text-sm transition-colors flex items-center justify-between ${value === option ? 'text-violet-400 bg-violet-500/10' : 'text-slate-300'}`}
                                >
                                    {option}
                                    {value === option && <Check className="w-4 h-4" />}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Helper Component for Individual Packages
const PackageItem = ({ pkg, isSelected, onSelect, index }) => (
    <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={onSelect}
        className={`w-full group relative flex items-center justify-between p-4 max-[426px]:p-3 rounded-xl border overflow-hidden transition-all duration-300 cursor-pointer ${isSelected
            ? 'bg-violet-600/20 border-violet-400/50 shadow-[0_0_30px_rgba(139,92,246,0.2)]'
            : 'bg-slate-950/40 border-white/5 hover:border-white/20 hover:bg-slate-900/60'}`}
    >
        {/* Hover Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-violet-600/0 via-violet-600/5 to-violet-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none transform`} style={{ transitionDuration: '1s' }} />

        <div className="flex items-center gap-3 md:gap-4 z-10">
            <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${isSelected ? 'border-violet-400 bg-violet-500 scale-110' : 'border-slate-600 group-hover:border-slate-400'}`}>
                {isSelected && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-white"><Check className="w-2.5 h-2.5 md:w-3 md:h-3" /></motion.div>}
            </div>
            <div className="flex flex-col text-left">
                <span className={`text-lg max-[426px]:text-sm max-[376px]:text-xs font-semibold transition-colors ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                    {pkg.name}
                </span>
                {pkg.subPrice && (
                    <div className="flex flex-col mt-0.5">
                        {pkg.originalSubPrice && (
                            <span className="text-slate-500 line-through text-[9px] md:text-[10px] font-medium decoration-slate-600 leading-none mb-0.5">
                                E-commerce starts @{pkg.originalSubPrice}
                            </span>
                        )}
                        <span className={`text-[10px] md:text-xs font-medium transition-colors ${isSelected ? 'text-violet-300/80' : 'text-slate-500'} leading-none flex items-center gap-1`}>
                            {pkg.subPrice}
                            {pkg.originalSubPrice && <span className="inline-block px-1 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] uppercase font-bold tracking-wider leading-none">Offer</span>}
                        </span>
                    </div>
                )}
            </div>
        </div>

        <div className="z-10 pl-2 text-right">
            {pkg.originalPrice && (
                <div className="text-slate-500 line-through text-xs md:text-sm font-medium decoration-slate-600 mb-0.5">
                    {pkg.originalPrice}
                </div>
            )}
            <span className={`font-mono font-bold text-sm md:text-lg flex flex-col items-end ${isSelected ? 'text-violet-300 shadow-violet-500/50 drop-shadow-md' : 'text-slate-500 group-hover:text-violet-400'}`}>
                <div className="flex items-center gap-2">
                    {pkg.originalPrice && <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] md:text-[10px] uppercase font-bold tracking-wider">Offer</span>}
                    <span>{pkg.price}</span>
                </div>
            </span>
        </div>
    </motion.button>
);

const OnboardingForm = () => {
    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        // Track the initial page view
        ReactPixel.pageView();
    }, []);

    useEffect(() => {
        // Track step progress as a custom event
        ReactPixel.track('OnboardingStep', {
            step: currentStep
        });
    }, [currentStep]);

    const [formData, setFormData] = useState({
        // Basic Business Information
        businessName: '',
        industry: '',
        description: '',
        establishmentYear: '',
        website: '',
        googleProfile: '',
        facebookLink: '',
        instagramLink: '',
        address: '',
        otherIndustry: '',
        // Contact Details
        contactName: '',
        designation: '',
        mobile: '',
        whatsapp: '',
        email: '',
        // Goals & Expectations
        primaryGoal: '',
        pastExperience: '',
        previousAgency: '',
        reasonSwitching: '',
        // Package Selection
        selectedPackage: []
    });

    const [activeCategory, setActiveCategory] = useState(null);
    const [activeSubCategory, setActiveSubCategory] = useState(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const totalSteps = 4;

    const validateStep = (step) => {
        const newErrors = {};
        if (step === 1) {
            if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
            if (!formData.industry) newErrors.industry = "Please select an industry";
            if (formData.industry === 'Others' && !formData.otherIndustry.trim()) newErrors.otherIndustry = "Please specify your industry";
            if (!formData.address.trim()) newErrors.address = "Address is required";
        } else if (step === 2) {
            if (!formData.contactName.trim()) newErrors.contactName = "Contact name is required";
            if (!formData.email.trim()) {
                newErrors.email = "Email is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = "Please enter a valid email address";
            }
            if (!formData.mobile.trim()) {
                newErrors.mobile = "Mobile number is required";
            } else if (!/^\d{10}$/.test(formData.mobile)) {
                newErrors.mobile = "Mobile number must be exactly 10 digits";
            }
            if (formData.whatsapp && !/^\d{10}$/.test(formData.whatsapp)) {
                newErrors.whatsapp = "WhatsApp number must be exactly 10 digits";
            }
        } else if (step === 3) {
            if (!formData.primaryGoal) newErrors.primaryGoal = "Please select a primary goal";
            if (!formData.pastExperience) newErrors.pastExperience = "Please select an option";
        } else if (step === 4) {
            if (!formData.selectedPackage || formData.selectedPackage.length === 0) newErrors.selectedPackage = "Please select at least one package";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const updated = { ...prev };
                delete updated[name];
                return updated;
            });
        }
    };

    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        // Only allow numeric input
        if (value === '' || /^\d+$/.test(value)) {
            // Limit to 10 digits
            if (value.length <= 10) {
                setFormData(prev => ({ ...prev, [name]: value }));
                // Clear error
                if (errors[name]) {
                    setErrors(prev => {
                        const updated = { ...prev };
                        delete updated[name];
                        return updated;
                    });
                }
            }
        }
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, totalSteps));
        }
    };
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

        try {
            if (isLocalhost) {
                // Simulate delay for localhost testing
                await new Promise(resolve => setTimeout(resolve, 2000));
                // Optional: Console log the data to verify what would be sent
                const allPkgs = packagesData.flatMap(cat => cat.items || (cat.subCategories ? cat.subCategories.flatMap(sub => sub.items) : []));
                const selectedPackageNames = formData.selectedPackage.map(id => {
                    const pkg = allPkgs.find(p => p.id === id);
                    return pkg ? pkg.name : id;
                }).join(', ');
                console.log("Submitting Form Data:", { ...formData, selectedPackage: selectedPackageNames });

                // Meta Pixel Lead locally
                ReactPixel.track('CompleteRegistration', {
                    content_name: 'Onboarding Form',
                    industry: formData.industry,
                    packages: selectedPackageNames
                });

                // Assume success locally
                setIsSubmitting(false);
                setIsSuccess(true);
                return;
            }

            const allPkgs = packagesData.flatMap(cat => cat.items || (cat.subCategories ? cat.subCategories.flatMap(sub => sub.items) : []));
            const selectedPackageNames = formData.selectedPackage.map(id => {
                const pkg = allPkgs.find(p => p.id === id);
                return pkg ? pkg.name : id;
            }).join(', ');

            const submissionData = {
                ...formData,
                selectedPackage: selectedPackageNames
            };

            const response = await fetch("https://digitaltoinfinity.com/onboarding.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submissionData),
            });

            const result = await response.json();

            if (result.success) {
                // Meta Pixel Lead Event
                ReactPixel.track('CompleteRegistration', {
                    content_name: 'Onboarding Form',
                    industry: formData.industry,
                    packages: selectedPackageNames
                });

                setIsSubmitting(false);
                setIsSuccess(true);
            } else {
                throw new Error(result.message || "Submission failed");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Sorry, there was an issue submitting your form. Please try again. Error: " + error.message);
            setIsSubmitting(false);
        }
    };

    const industries = [
        "E-commerce", "Real Estate", "Healthcare", "Education",
        "Technology", "Food & Beverage", "Finance", "Entertainment", "Others"
    ];

    const goals = [
        "Leads", "Sales", "Brand Awareness", "Website Traffic"
    ];

    const handlePackageSelect = (pkg) => {
        setFormData(prev => {
            const isSelected = prev.selectedPackage.includes(pkg.id);
            const nextSelected = isSelected
                ? prev.selectedPackage.filter(id => id !== pkg.id)
                : [...prev.selectedPackage, pkg.id];

            return { ...prev, selectedPackage: nextSelected };
        });

        setErrors(prev => {
            const updated = { ...prev };
            delete updated.selectedPackage;
            return updated;
        });
    };

    const packagesData = [
        {
            id: 'digital-marketing',
            label: 'Digital Marketing Packages',
            items: [
                { id: 'dm-starter', name: 'Premium Starter Pack', price: '₹44,999' },
                { id: 'dm-growth', name: 'Growth Engine Pack', price: '₹25,000', isRetainer: true },
                { id: 'dm-performance', name: 'Performance Accelerator Pack', price: '₹50,000', isRetainer: true },
                { id: 'dm-leader', name: 'Market Leader Pack', price: '₹1,00,000', isRetainer: true },
                // { id: 'dm-monopoly', name: 'Monopoly Protocol', price: 'Contact Us', isRetainer: true },
            ]
        },
        {
            id: 'website',
            label: 'Website Development Packages',
            items: [
                { id: 'web-business', name: 'Business Website', price: '₹14,999/one time', originalPrice: '₹19,999', subPrice: 'E-commerce starts @₹22,000', originalSubPrice: '₹30,000' },
                { id: 'web-growth', name: 'Growth Website', price: '₹34,999/one time', subPrice: 'E-commerce starts @₹60,000' },
                { id: 'web-brand', name: 'Brand Experience Website', price: '₹60K - 1L+/one time', subPrice: '3D Experience starts @₹80,000' },
            ]
        },
        {
            id: 'creative',
            label: 'Creatives & Reels Packages',
            items: [
                { id: 'creative-post', name: 'Brand Presence Pack', price: '₹9,000/mo' },
                { id: 'creative-reel', name: 'Brand Growth Pack', price: '₹18,000/mo' },
                { id: 'creative-ugc', name: 'Brand Authority Pack', price: '₹32,000/mo' },
            ]
        },
        {
            id: 'ads',
            label: 'ADs Management Packages',
            items: [
                { id: 'ads-under-20k', name: 'Ads Foundation Plan', price: '₹9,000/mo' },
                { id: 'ads-above-20k', name: 'Growth Ads System', price: '₹20,000/mo' },
                { id: 'ads-between-20k', name: 'Performance Ads Engine', price: '₹50,000/mo' },
            ]
        },
        {
            id: 'social',
            label: 'Social Media Management Packages',
            items: [
                { id: 'social-mgmt', name: 'Social Presence Management', price: '₹14,999/mo' },
                { id: 'social-mgmt-creative', name: 'Social Growth Management', price: '₹28,000/mo' },
                { id: 'social-creative', name: 'Social Authority Management', price: '₹45,000/mo' },
            ]
        }
    ];

    const inputClasses = "w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all hover:bg-slate-900/80 placeholder:text-slate-600";
    const labelClasses = "block text-sm font-medium text-slate-300 mb-2 ml-1";

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-violet-500/30 overflow-x-hidden">

            {/* Background elements */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-violet-950/20" />
                <CosmicBackground />
            </div>

            <main className="relative z-10 pt-12 pb-16 md:pb-24 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10 md:mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                        >
                            <Building2 className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest text-white/90">Business Onboarding</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-white"
                        >
                            Partner With <span className="text-violet-400">Infinity</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-400 text-lg max-w-2xl mx-auto"
                        >
                            Fill out the form below to start your digital growth journey with us.
                        </motion.p>
                    </div>

                    {/* Form Container */}
                    <div className="relative">
                        {/* Ambient glows behind the card */}
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-fuchsia-600/20 rounded-full blur-[100px] pointer-events-none" />

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 border border-white/10 rounded-3xl md:rounded-[2.5rem] p-12 max-[769px]:p-8 max-[426px]:p-6 max-[376px]:p-4 max-[321px]:px-2 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
                        >
                            {/* Card shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none transition-opacity duration-500" />

                            {!isSuccess ? (
                                <>
                                    <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

                                    <AnimatePresence mode="wait">
                                        {currentStep === 1 && (
                                            <StepWrapper
                                                key="step1"
                                                title="Basic Business Information"
                                                subtitle="Tell us about your brand and presence"
                                                icon={Building2}
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="md:col-span-2">
                                                        <label className={labelClasses}>Business Name (Legal) <span className="text-slate-300 font-bold">*</span></label>
                                                        <input
                                                            type="text" name="businessName" value={formData.businessName} onChange={handleChange}
                                                            placeholder="e.g. Infinity Solutions Pvt. Ltd." required
                                                            className={`${inputClasses} ${errors.businessName ? 'ring-2 ring-red-500/50 border-red-500/50' : ''}`}
                                                        />
                                                        {errors.businessName && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.businessName}</p>}
                                                    </div>
                                                    <div className="w-full">
                                                        <CustomDropdown
                                                            label="Industry *"
                                                            name="industry"
                                                            value={formData.industry}
                                                            onChange={handleChange}
                                                            options={industries}
                                                            placeholder="Select Industry"
                                                            icon={Building2}
                                                            required
                                                            error={errors.industry}
                                                        />
                                                    </div>
                                                    <AnimatePresence mode="wait">
                                                        {formData.industry === 'Others' ? (
                                                            <>
                                                                <motion.div
                                                                    key="other-industry"
                                                                    initial={{ opacity: 0, y: -10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    exit={{ opacity: 0, y: -10 }}
                                                                    className="md:col-span-1"
                                                                >
                                                                    <label className={labelClasses}>Specific Category / Industry <span className="text-slate-300 font-bold">*</span></label>
                                                                    <input
                                                                        type="text"
                                                                        name="otherIndustry"
                                                                        value={formData.otherIndustry}
                                                                        onChange={handleChange}
                                                                        placeholder="Specify your business category"
                                                                        required
                                                                        className={`${inputClasses} ${errors.otherIndustry ? 'ring-2 ring-red-500/50 border-red-500/50' : ''}`} />
                                                                    {errors.otherIndustry && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.otherIndustry}</p>}
                                                                </motion.div>
                                                                <motion.div
                                                                    key="year-others"
                                                                    initial={{ opacity: 0, y: 20 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    className="md:col-span-2"
                                                                >
                                                                    <label className={labelClasses}>Year of Establishment</label>
                                                                    <input
                                                                        type="text" name="establishmentYear" value={formData.establishmentYear} onChange={handleChange}
                                                                        placeholder="e.g. 2024" className={inputClasses}
                                                                    />
                                                                </motion.div>
                                                            </>
                                                        ) : (
                                                            <motion.div
                                                                key="year-default"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                className="md:col-span-1"
                                                            >
                                                                <label className={labelClasses}>Year of Establishment</label>
                                                                <input
                                                                    type="text" name="establishmentYear" value={formData.establishmentYear} onChange={handleChange}
                                                                    placeholder="e.g. 2024" className={inputClasses}
                                                                />
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                    <div className="md:col-span-2">
                                                        <label className={labelClasses}>Business Description (2-3 lines)</label>
                                                        <textarea
                                                            name="description" value={formData.description} onChange={handleChange}
                                                            placeholder="Briefly describe what your business does..."
                                                            className={`${inputClasses} resize-none h-24`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={labelClasses}>Website URL</label>
                                                        <div className="relative">
                                                            <Globe className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                                                            <input
                                                                type="url" name="website" value={formData.website} onChange={handleChange}
                                                                placeholder="https://example.com" className={`${inputClasses} pl-10`}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className={labelClasses}>Google Business Profile</label>
                                                        <div className="relative">
                                                            <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                                                            <input
                                                                type="url" name="googleProfile" value={formData.googleProfile} onChange={handleChange}
                                                                placeholder="Link to your profile" className={`${inputClasses} pl-10`}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className={labelClasses}>Facebook URL</label>
                                                        <div className="relative">
                                                            <Link2 className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                                                            <input
                                                                type="url" name="facebookLink" value={formData.facebookLink} onChange={handleChange}
                                                                placeholder="Facebook profile link" className={`${inputClasses} pl-10`}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className={labelClasses}>Instagram URL</label>
                                                        <div className="relative">
                                                            <Link2 className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                                                            <input
                                                                type="url" name="instagramLink" value={formData.instagramLink} onChange={handleChange}
                                                                placeholder="Instagram profile link" className={`${inputClasses} pl-10`}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className={labelClasses}>Address <span className="text-slate-300 font-bold">*</span></label>
                                                        <textarea
                                                            name="address" value={formData.address} onChange={handleChange}
                                                            placeholder="Complete business address" required
                                                            className={`${inputClasses} ${errors.address ? 'ring-2 ring-red-500/50 border-red-500/50' : ''} resize-none h-20`}
                                                        />
                                                        {errors.address && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.address}</p>}
                                                    </div>
                                                </div>
                                            </StepWrapper>
                                        )}

                                        {currentStep === 2 && (
                                            <StepWrapper
                                                key="step2"
                                                title="Primary Contact Details"
                                                subtitle="Who should we coordinate with?"
                                                icon={User}
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="md:col-span-2">
                                                        <label className={labelClasses}>Full Name <span className="text-slate-300 font-bold">*</span></label>
                                                        <input
                                                            type="text" name="contactName" value={formData.contactName} onChange={handleChange}
                                                            placeholder="John Doe" required
                                                            className={`${inputClasses} ${errors.contactName ? 'ring-2 ring-red-500/50 border-red-500/50' : ''}`}
                                                        />
                                                        {errors.contactName && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.contactName}</p>}
                                                    </div>
                                                    <div>
                                                        <label className={labelClasses}>Designation</label>
                                                        <input
                                                            type="text" name="designation" value={formData.designation} onChange={handleChange}
                                                            placeholder="CEO / Manager" className={inputClasses}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={labelClasses}>Email Address <span className="text-slate-300 font-bold">*</span></label>
                                                        <input
                                                            type="email" name="email" value={formData.email} onChange={handleChange}
                                                            placeholder="john@example.com" required
                                                            className={`${inputClasses} ${errors.email ? 'ring-2 ring-red-500/50 border-red-500/50' : ''}`}
                                                        />
                                                        {errors.email && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.email}</p>}
                                                    </div>
                                                    <div>
                                                        <label className={labelClasses}>Mobile Number <span className="text-slate-300 font-bold">*</span></label>
                                                        <div className="relative">
                                                            <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                                                            <input
                                                                type="tel" name="mobile" value={formData.mobile} onChange={handleNumberChange}
                                                                placeholder="9876543210" required
                                                                className={`${inputClasses} pl-10 ${errors.mobile ? 'ring-2 ring-red-500/50 border-red-500/50' : ''}`}
                                                            />
                                                        </div>
                                                        {errors.mobile && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.mobile}</p>}
                                                    </div>
                                                    <div>
                                                        <label className={labelClasses}>WhatsApp Number</label>
                                                        <div className="relative">
                                                            <MessageCircle className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                                                            <input
                                                                type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleNumberChange}
                                                                placeholder="9876543210" className={`${inputClasses} pl-10 ${errors.whatsapp ? 'ring-2 ring-red-500/50 border-red-500/50' : ''}`}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </StepWrapper>
                                        )}

                                        {currentStep === 3 && (
                                            <StepWrapper
                                                key="step3"
                                                title="Goals & Expectations"
                                                subtitle="What are you looking to achieve?"
                                                icon={Target}
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="w-full">
                                                        <CustomDropdown
                                                            label="Primary Goal *"
                                                            name="primaryGoal"
                                                            value={formData.primaryGoal}
                                                            onChange={handleChange}
                                                            options={goals}
                                                            placeholder="Select Primary Goal"
                                                            icon={Target}
                                                            required
                                                            error={errors.primaryGoal}
                                                        />
                                                    </div>
                                                    <div className="w-full">
                                                        <CustomDropdown
                                                            label="Past Marketing Experience *"
                                                            name="pastExperience"
                                                            value={formData.pastExperience}
                                                            onChange={handleChange}
                                                            options={['Yes', 'No']}
                                                            placeholder="Select Option"
                                                            icon={Calendar}
                                                            required
                                                            error={errors.pastExperience}
                                                        />
                                                    </div>
                                                    {formData.pastExperience === 'Yes' && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
                                                        >
                                                            <div>
                                                                <label className={labelClasses}>Previous Agency Name</label>
                                                                <input
                                                                    type="text" name="previousAgency" value={formData.previousAgency} onChange={handleChange}
                                                                    placeholder="Agency name" className={inputClasses}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className={labelClasses}>Reason for Switching</label>
                                                                <input
                                                                    type="text" name="reasonSwitching" value={formData.reasonSwitching} onChange={handleChange}
                                                                    placeholder="Why are you switching?" className={inputClasses}
                                                                />
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </StepWrapper>
                                        )}

                                        {currentStep === 4 && (
                                            <StepWrapper
                                                key="step4"
                                                title="Package Selection"
                                                subtitle="Choose the solutions that fit your needs"
                                                icon={Package}
                                            >
                                                <div className="space-y-8">
                                                    {packagesData.map(category => (
                                                        <div key={category.id} className="space-y-4">
                                                            <h3 className="text-sm font-bold text-violet-400 uppercase tracking-widest ml-1">{category.label}</h3>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                {category.items.map((pkg, idx) => (
                                                                    <PackageItem
                                                                        key={pkg.id}
                                                                        pkg={pkg}
                                                                        index={idx}
                                                                        isSelected={formData.selectedPackage.includes(pkg.id)}
                                                                        onSelect={() => handlePackageSelect(pkg)}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {errors.selectedPackage && (
                                                        <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.selectedPackage}</p>
                                                    )}
                                                </div>
                                            </StepWrapper>
                                        )}
                                    </AnimatePresence>

                                    {/* Navigation Buttons */}
                                    <div className="mt-12 md:mt-16 flex items-center justify-between gap-6">
                                        {currentStep > 1 ? (
                                            <button
                                                onClick={prevStep}
                                                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-bold uppercase tracking-widest"
                                            >
                                                <ArrowLeft className="w-4 h-4" />
                                                Back
                                            </button>
                                        ) : <div />}

                                        {currentStep < totalSteps ? (
                                            <button
                                                onClick={nextStep}
                                                className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-violet-600 text-white font-bold uppercase tracking-widest text-sm hover:bg-violet-500 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] active:scale-95"
                                            >
                                                Next Step
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleSubmit}
                                                disabled={isSubmitting}
                                                className="group flex items-center gap-3 px-10 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        Complete Onboarding
                                                        <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-16 text-center space-y-8"
                                >
                                    <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/30">
                                        <Check className="w-12 h-12 text-emerald-500" />
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Onboarding Successful!</h2>
                                    <p className="text-slate-400 text-lg max-w-md mx-auto">
                                        Thank you for choosing Digital To Infinity. Our team will review your details and reach out to you within 24-48 hours.
                                    </p>
                                    <div className="pt-8">
                                        <button
                                            onClick={() => window.location.href = '/'}
                                            className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all font-bold uppercase tracking-widest text-sm"
                                        >
                                            Return to Home
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OnboardingForm;