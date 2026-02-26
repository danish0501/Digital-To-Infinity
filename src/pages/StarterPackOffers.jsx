import {
    ArrowRight, Zap, Loader2, Check, X, Play, Clock, Globe, Server, MessageSquare,
    User, Mail, Phone, Building, Tag, ChevronDown, Pen, CheckCircle2
} from 'lucide-react';
import ReactGA from "react-ga4";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Assets
import ilnmImg from "../assets/ilnm-img.png";
import ssImg from "../assets/shaktisteel-img.png";
import hvImg from "../assets/hvikas-img.png";
import divineImg from "../assets/divine-img.png";
import cottonplusImg from "../assets/cottonplus-img.png";
import bbqplaceImg from "../assets/bbqplace-img.png";
import aerocityImg from "../assets/aerocity-img.png";
import premiumStarterPackImg from "../assets/premium-starter pack.jpg";
import imgLocalSeo from "../assets/starter-images/starter_local_seo.png";
import imgHighPerf from "../assets/starter-images/starter_high_perf_design.png";
import imgBrand from "../assets/starter-images/starter_brand_launchpad.png";
import imgIdentity from "../assets/starter-images/starter_identity_kit.png";
import imgLeads from "../assets/starter-images/starter_instant_leads.png";
import imgSeamless from "../assets/starter-images/starter_seamless_tech.png";
import imgHandover from "../assets/starter-images/starter_handover.png";
import imgHyperLocal from "../assets/starter-images/starter_hyper_local.png";
import imgSupport from "../assets/starter-images/starter_support.png";
import socialPosts1 from "../assets/ilovenavimumbai/img1.jpeg"
import socialPosts2 from "../assets/ilovenavimumbai/img5.jpeg";
import socialPosts3 from "../assets/shaktisteel/ss1.jpeg";
import socialPosts4 from "../assets/shaktisteel/ss4.jpeg";
import socialPosts5 from "../assets/ilovenavimumbai1/ilnm5.jpeg";
import socialPosts6 from "../assets/ilovenavimumbai1/ilnm4.jpeg";
import socialPosts7 from "../assets/cottonplus/image1.jpeg";
import socialPosts8 from "../assets/cottonplus/image4.jpeg";
import StarterPackImg from "../assets/starter-pack-img.jpeg";

/* --- CONTACT POPUP --- */
const ContactPopup = ({ isOpen, onClose, onSubmit, isSubmitting, submitted }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        category: '',
        otherCategory: '',
        message: ''
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const categories = [
        "प्रॉपर्टी / रियल एस्टेट ( Real Estate )", "हेल्थकेयर / स्वास्थ्य सेवा ( Healthcare )", "एजुकेशन / शिक्षा ( Education )", "टेक्नोलॉजी / आईटी ( Technology / SaaS )",
        "ई-कॉमर्स ( E-Commerce )", "मैन्युफैक्चरिंग ( Manufacturing )", "रिटेल / खुदरा व्यापार ( Retail )", "अन्य ( Other )"
    ];

    const isFormValid = formData.name.trim() !== '' &&
        formData.phone.trim() !== '' &&
        formData.company.trim() !== '' &&
        formData.category !== '' &&
        (formData.category !== 'Other' || formData.otherCategory.trim() !== '');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCategorySelect = (cat) => {
        setFormData(prev => ({ ...prev, category: cat, otherCategory: cat === 'Other' ? prev.otherCategory : '' }));
        setIsDropdownOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            onSubmit(formData);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-900 shadow-sm cursor-pointer"
                        >
                            <X size={20} />
                        </button>

                        <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center text-center py-12 space-y-6"
                                >
                                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-inner">
                                        <CheckCircle2 size={56} strokeWidth={2.5} className="animate-in zoom-in duration-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-black text-slate-900 font-poppins">जानकारी भेज दी गई!</h3>
                                        <p className="text-slate-500 text-lg font-medium font-hind">
                                            हमसे जुड़ने के लिए धन्यवाद। हमारे एक्सपर्ट्स जल्द ही आपसे संपर्क करेंगे।
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold font-poppins hover:bg-slate-800 transition-all"
                                    >
                                        ठीक है
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="animate-in fade-in duration-500">
                                    <div className="text-center mb-8 pt-4">
                                        <h2 className="text-3xl md:text-4xl font-black mb-3 font-poppins text-slate-900 tracking-tight">
                                            एक नई <span className="text-amber-500">शुरुआत करें</span>
                                        </h2>
                                        <p className="text-slate-500 text-sm md:text-base font-medium font-hind leading-relaxed">
                                            अपनी जानकारी भेजें, और हमारे एक्सपर्ट्स अगले 24 घंटों के अंदर आपसे संपर्क करेंगे।
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4 pb-4">
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-amber-500 transition-colors" />
                                            <input
                                                type="text" name="name" placeholder="अपना पूरा नाम लिखें *" required
                                                value={formData.name} onChange={handleChange}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all font-poppins text-slate-900"
                                            />
                                        </div>

                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-amber-500 transition-colors" />
                                            <input
                                                type="tel" name="phone" placeholder="मोबाइल नंबर *" required
                                                value={formData.phone} onChange={handleChange}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all font-poppins text-slate-900"
                                            />
                                        </div>

                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-amber-500 transition-colors" />
                                            <input
                                                type="email" name="email" placeholder="ईमेल आईडी"
                                                value={formData.email} onChange={handleChange}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all font-poppins text-slate-900"
                                            />
                                        </div>

                                        <div className="relative group">
                                            <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-amber-500 transition-colors" />
                                            <input
                                                type="text" name="company" placeholder="कंपनी का नाम *" required
                                                value={formData.company} onChange={handleChange}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all font-poppins text-slate-900"
                                            />
                                        </div>

                                        <div className="relative">
                                            <div
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className="relative w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-12 cursor-pointer hover:bg-slate-100 transition-all flex items-center"
                                            >
                                                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                <span className={`font-poppins ${formData.category ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                                                    {formData.category || "कैटेगरी चुनें *"}
                                                </span>
                                                <ChevronDown size={18} className={`absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                            </div>

                                            {isDropdownOpen && (
                                                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 text-slate-800 border border-slate-100">
                                                    {categories.map((cat, i) => (
                                                        <div
                                                            key={i}
                                                            onClick={() => handleCategorySelect(cat)}
                                                            className="px-6 py-3 hover:bg-amber-50 hover:text-amber-600 cursor-pointer transition-colors font-medium text-sm border-b border-slate-50 last:border-0"
                                                        >
                                                            {cat}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {formData.category.includes('Other') && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="relative group">
                                                <Pen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-amber-500" />
                                                <input
                                                    type="text" name="otherCategory" placeholder="कृपया विवरण दें *" required
                                                    value={formData.otherCategory} onChange={handleChange}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-amber-400 transition-all font-poppins text-slate-900"
                                                />
                                            </motion.div>
                                        )}

                                        <div className="relative group">
                                            <MessageSquare className="absolute left-4 top-4 text-slate-400 w-5 h-5 group-focus-within:text-amber-500 transition-colors" />
                                            <textarea
                                                name="message" placeholder="अपने लक्ष्यों के बारे में बताएं..."
                                                value={formData.message} onChange={handleChange}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 h-28 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 transition-all font-poppins resize-none text-slate-900"
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={!isFormValid || isSubmitting}
                                            className={`w-full py-3 rounded-2xl flex items-center justify-center gap-3 font-black tracking-widest transition-all scale-100 active:scale-[0.98] font-poppins cursor-pointer ${isFormValid && !isSubmitting
                                                ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200'
                                                : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                                                }`}
                                        >
                                            {isSubmitting ? (
                                                <><Loader2 className="animate-spin" /> भेजा जा रहा है...</>
                                            ) : (
                                                <>{isFormValid ? "सबमिट करें" : "जरूरी विवरण भरें"} <ArrowRight size={18} /></>
                                            )}
                                        </button>
                                        <p className="text-[12px] text-slate-400 font-hind text-center font-bold uppercase tracking-tighter">आपकी प्राइवेसी हमारे लिए सबसे महत्वपूर्ण है। हम आपकी डिटेल्स कभी शेयर नहीं करेंगे।</p>
                                    </form>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

/* --- 60-MINUTE TIMER --- */
const CountdownTimer = ({ onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(60 * 60);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    if (onComplete) onComplete();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [onComplete]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return { m, s };
    };

    const { m, s } = formatTime(timeLeft);

    return (
        <div className="flex gap-4 justify-center font-['Poppins']">
            <div className="text-center">
                <div className="bg-white border border-gray-100 rounded-xl p-4 w-20 md:w-24 shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
                    <span className="text-3xl md:text-4xl font-bold text-slate-900">00</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-2 uppercase tracking-wider block font-bold">घंटे (Hours)</span>
            </div>
            <div className="text-center">
                <div className="bg-white border border-gray-100 rounded-xl p-4 w-20 md:w-24 shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
                    <span className="text-3xl md:text-4xl font-bold text-slate-900">{m.toString().padStart(2, '0')}</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-2 uppercase tracking-wider block font-bold">मिनट (Mins)</span>
            </div>
            <div className="text-center">
                <div className="bg-white border border-gray-100 rounded-xl p-4 w-20 md:w-24 shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
                    <span className="text-3xl md:text-4xl font-bold text-amber-500">{s.toString().padStart(2, '0')}</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-2 uppercase tracking-wider block font-bold">सेकंड (Secs)</span>
            </div>
        </div>
    );
}

/* --- UTILITY: Scroll Reveal --- */
const Reveal = ({ children, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(ref.current); }
        }, { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return <div ref={ref} className={`transition-all duration-700 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>{children}</div>;
};

/* --- HINDI SERVICES DATA --- */
const hindiServices = [
    { id: 1, image: "https://cdn-icons-png.flaticon.com/512/300/300221.png", title: "Google पर #1 रैंक", subtitle: "Local King", description: "इलाके के 'Top Search' में आपकी दुकान।" },
    { id: 2, image: "https://cdn-icons-png.flaticon.com/512/1006/1006771.png", title: "सेल्स मशीन वेबसाइट", subtitle: "24/7 Sales", description: "विजिटर को कस्टमर बनाने वाली साइट।" },
    { id: 3, image: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png", title: "Insta/FB ग्रोथ", subtitle: "Viral Brand", description: "दिखावा नहीं, सिर्फ बिजनेस।" },
    { id: 4, image: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png", title: "प्रीमियम ब्रांडिंग", subtitle: "Pro Look", description: "मार्केट में 'अलग' पहचान।" },
    { id: 5, image: "https://cdn-icons-png.flaticon.com/512/733/733585.png", title: "WhatsApp ऑटोमेशन", subtitle: "Smart Chat", description: "ऑटो-रिप्लाई, मतलब धंधा चालू।" },
    { id: 6, image: "https://cdn-icons-png.flaticon.com/512/1968/1968666.png", title: "सही Ads (ROAS)", subtitle: "Save Money", description: "पैसा कम, ग्राहक ज्यादा।" },
    { id: 7, image: "https://cdn-icons-png.flaticon.com/512/1087/1087815.png", title: "सब कनेक्टेड", subtitle: "One System", description: "वेबसाइट + सोशल + व्हाट्सएप।" },
    { id: 8, image: "https://cdn-icons-png.flaticon.com/512/2997/2997332.png", title: "ट्रेनिंग + हैंडओवर", subtitle: "Be Boss", description: "खुद चलाना सीखें, आसान भाषा में।" },
    { id: 9, image: "https://cdn-icons-png.flaticon.com/512/3670/3670163.png", title: "वायरल रील स्क्रिप्ट्स", subtitle: "Trend Setter", description: "क्या बोलें? हम बताएंगे।" },
    { id: 10, image: "https://cdn-icons-png.flaticon.com/512/4712/4712009.png", title: "पक्का सपोर्ट", subtitle: "We Care", description: "लॉन्च के बाद भी हम साथ हैं।" },
];

/* --- STARTER PACK DATA --- */
const starterPackItems = [
    { title: "Local Dominance", desc: "हम आपकी Google प्रोफाइल को Verify और Optimize करते हैं ताकि आप #1 रैंक करें।", image: imgLocalSeo },
    { title: "High-Performance Design", desc: "मोबाइल-फ्रेंडली, तेज़ वेबसाइट जो विजिटर्स को कस्टमर में बदल दे।", image: imgHighPerf },
    { title: "Brand Launchpad", desc: "कस्टम ब्रांडिंग के साथ प्रोफेशनल इंस्टाग्राम और फेसबुक पेज सेटअप।", image: imgBrand },
    { title: "Identity Kit", desc: "कॉर्पोरेट लुक के लिए प्रीमियम लोगो, कलर पैलेट और फॉन्ट्स।", image: imgIdentity },
    { title: "Instant Leads", desc: "बिज़नेस लाने के लिए हम Google/Meta पर 3 हाई-ROI कैंपेन सेटअप करते हैं।", image: imgLeads },
    { title: "Seamless Tech", desc: "हम आपकी साइट, सोशल मीडिया और CRM को जोड़ते हैं ताकि लीड्स अपने आप आएं।", image: imgSeamless },
    { title: "Handover Session", desc: "हम आपको सिखाते हैं कि अपने नए डिजिटल एसेट्स को आसानी से कैसे मैनेज करें।", image: imgHandover },
    { title: "Hyper-Local Strategy", desc: "हम आपके बिज़नेस टाइप और इलाके के हिसाब से 3 खास एड सेट्स देते हैं।", image: imgHyperLocal },
    { title: "30-Day Care", desc: "अपडेट्स और तकनीकी सवालों के लिए डेडिकेटेड सपोर्ट टीम।", image: imgSupport },
];

/* --- STARTER PACK COMPONENT --- */
const StarterPackSection = () => {
    const cardVariants = (index) => ({
        hidden: {
            opacity: 0,
            x: typeof window !== 'undefined' && window.innerWidth <= 426
                ? (index % 2 === 0 ? 100 : -100)
                : 0,
            y: typeof window !== 'undefined' && window.innerWidth > 426 ? 30 : 0
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                duration: 0.8,
                bounce: 0.3,
                delay: index * 0.1
            }
        }
    });

    return (
        <motion.section
            onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'Starter Pack Details' })}
            className="py-20 max-[426px]:py-10 bg-white relative z-10 px-4 border-t border-gray-100 overflow-x-hidden"
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-[426px]:mb-8">
                    <Reveal>
                        <h2 className="text-3xl md:text-5xl max-[426px]:text-2xl max-[376px]:text-xl max-[321px]:text-lg font-bold text-slate-900 mb-4 font-poppins">
                            स्टार्टर पैक में <span className="text-amber-500">आपको क्या मिलेगा?</span>
                        </h2>
                        <p className="text-slate-500 font-hind text-lg max-[426px]:text-base">डिजिटल दुनिया में छा जाने के लिए सब कुछ।</p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {starterPackItems.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants(index)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="h-full"
                        >
                            <div className="h-full bg-white border border-gray-100 p-4 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-amber-200 transition-all duration-300 group flex flex-col items-center text-center">
                                <div className="w-full max-w-[400px] h-[500px] max-[769px]:h-[300px] max-[321px]:h-[200px] mb-3 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-fill rounded-3xl filter drop-shadow-md"
                                    />
                                </div>
                                <h3 className="text-xl max-[321px]:text-lg font-bold text-slate-800 mb-3 font-poppins group-hover:text-amber-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 leading-relaxed font-hind max-[321px]:text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

/* --- MINIMALIST GRID CARD COMPONENT --- */
const ServiceCardMinimal = ({ item, index }) => {
    const isGray = (index % 2 !== 0 && Math.floor(index / 2) % 2 === 0) || (index % 2 === 0 && Math.floor(index / 2) % 2 !== 0);

    return (
        <div className={`h-full p-8 flex flex-col items-center text-center group hover:bg-amber-50 transition-colors duration-300 ${isGray ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="w-16 h-16 mb-4 opacity-100 group-hover:scale-110 transition-all">
                <img src={item.image} alt={item.title} className="w-full h-full object-contain transition-all duration-300" />
            </div>
            <h3 className="text-lg font-bold text-amber-500 leading-tight font-['Poppins'] mb-2 group-hover:text-amber-600">{item.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed font-['Hind'] px-2">
                {item.description}
            </p>
        </div>
    );
};

const webProjects = [
    { id: 1, title: "I Love Navi Mumbai", image: ilnmImg, website: "https://ilovenavimumbai.com/" },
    { id: 2, title: "Aerocity", image: aerocityImg, website: "https://floralwhite-mule-355994.hostingersite.com/" },
    { id: 3, title: "Shakti Steel", image: ssImg, website: "https://shaktisteel.online/" },
    { id: 4, title: "H Vikas", image: hvImg, website: "https://hvikas.com/" },
    { id: 5, title: "Divine Interior Work", image: divineImg, website: "https://divineinteriorwork.in/" },
    { id: 6, title: "Cotton Plus", image: cottonplusImg, website: "https://cottonplus.in/" },
    { id: 7, title: "The BBQ Place", image: bbqplaceImg, website: "https://aagridawat.in/" }
];

const clientLogo = [
    "I Love Navi Mumbai", "Aerocity", "Shakti Steel", "H Vikas",
    "Divine Interior Work", "Cotton Plus", "Aagri Dawat"
];

const socialPosts = [
    { id: 1, title: "I Love Navi Mumbai", platform: "Instagram", image: socialPosts1 },
    { id: 2, title: "I Love Navi Mumbai", platform: "Instagram", image: socialPosts2 },
    { id: 3, title: "Shakti Steel", platform: "Instagram", image: socialPosts3 },
    { id: 4, title: "Shakti Steel", platform: "Instagram", image: socialPosts4 },
    { id: 5, title: "I Love Navi Mumbai", platform: "Instagram", image: socialPosts5 },
    { id: 6, title: "I Love Navi Mumbai", platform: "Instagram", image: socialPosts6 },
    { id: 7, title: "Cotton Plus", platform: "Instagram", image: socialPosts7 },
    { id: 8, title: "Cotton Plus", platform: "Instagram", image: socialPosts8 }
];

/* --- FULL WIDTH MARQUEE ADVERTISEMENT --- */
const AdMarquee = () => {
    const adItems = [
        { text: "मुफ़्त Domain (.com / .in)", icon: <Globe size={24} className="text-amber-400" /> },
        { text: "मुफ़्त 1 साल की High-Speed Hosting", icon: <Server size={24} className="text-amber-400" /> },
        { text: "मुफ़्त WhatsApp मार्केटिंग टूल", icon: <MessageSquare size={24} className="text-amber-400" /> },
        { text: "धमाका कॉम्बो पैक @ ₹39,999", icon: <Zap size={24} className="fill-amber-400 text-amber-400" /> },
    ];

    const loopItems = [...adItems, ...adItems, ...adItems, ...adItems];

    return (
        <div className="w-full bg-slate-900 py-4 max-[426px]:p-3 overflow-hidden border-y border-white/10 relative z-10 group cursor-default">
            <motion.div
                className="flex whitespace-nowrap gap-16 items-center"
                animate={{ x: [0, -7000] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                    },
                }}
            >
                {loopItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-6 max-[426px]:gap-3 text-white font-['Poppins'] font-black uppercase italic tracking-tighter text-2xl max-[426px]:text-xl">
                        <div className="bg-white/10 p-3 max-[426px]:p-2 rounded-2xl">{item.icon}</div>
                        <span className="text-white-700 text-2xl max-[426px]:text-xl tracking-normal">{item.text}</span>
                        <span className="text-slate-700 font-normal ml-8">●</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

/* --- Colorful Fireworks --- */
const Fireworks = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);
        let particles = [];
        let animationFrameId;
        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        class Particle {
            constructor() {
                this.x = Math.random() * w; this.y = h;
                this.vx = Math.random() * 4 - 2; this.vy = Math.random() * -12 - 5;
                this.gravity = 0.2; this.exploded = false;
                const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#ff9900'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.life = 100; this.shards = [];
            }
            update() {
                if (!this.exploded) {
                    this.x += this.vx; this.y += this.vy; this.vy += this.gravity;
                    if (this.vy >= -2) { this.exploded = true; this.createShards(); }
                } else {
                    this.shards.forEach((s, i) => { s.x += s.vx; s.y += s.vy; s.vy += 0.1; s.alpha -= 0.02; if (s.alpha <= 0) this.shards.splice(i, 1); });
                    if (this.shards.length === 0) this.life = 0;
                }
            }
            createShards() {
                for (let i = 0; i < 50; i++) {
                    const speed = Math.random() * 4 + 2; const angle = Math.random() * Math.PI * 2;
                    this.shards.push({ x: this.x, y: this.y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, alpha: 1, color: this.color });
                }
            }
            draw() {
                if (!this.exploded) {
                    ctx.beginPath(); ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2); ctx.fillStyle = "rgba(255,255,255,0.9)"; ctx.fill();
                } else {
                    this.shards.forEach(s => { ctx.beginPath(); ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2); ctx.fillStyle = s.color; ctx.globalAlpha = s.alpha; ctx.fill(); ctx.globalAlpha = 1; });
                }
            }
        }
        const loop = () => {
            ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; ctx.fillRect(0, 0, w, h); ctx.globalCompositeOperation = 'source-over';
            if (Math.random() < 0.05) particles.push(new Particle());
            for (let i = particles.length - 1; i >= 0; i--) { particles[i].update(); particles[i].draw(); if (particles[i].life === 0 || particles[i].y > h) particles.splice(i, 1); }
            animationFrameId = requestAnimationFrame(loop);
        };
        loop();
        return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
    }, []);
    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />;
};


/* --- MAIN APP --- */
const StarterPackOffers = () => {
    const [isContactOpen, setContactOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isPopupSubmitting, setIsPopupSubmitting] = useState(false);
    const [popupSubmitted, setPopupSubmitted] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap';
        document.head.appendChild(link);
        return () => { document.head.removeChild(link); };
    }, []);

    useEffect(() => {
        const isValid = formData.name.trim() !== '' && formData.phone.trim() !== '';
        setIsFormValid(isValid);
    }, [formData]);

    const handleBlur = (e) => { setTouched({ ...touched, [e.target.name]: true }); };
    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

    const getInputClass = (fieldName, isRequired = false) => {
        const baseClass = "w-full bg-white border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-amber-100 text-slate-900 transition-all text-sm font-medium font-['Poppins'] placeholder-gray-400";
        if (isRequired && formData[fieldName].trim() === '' && (touched[fieldName] || (Object.values(formData).some(v => v.trim() !== '')))) {
            return `${baseClass} border-red-200 bg-red-50 focus:ring-red-100`;
        }
        return `${baseClass} border-gray-200 focus:border-amber-400 hover:border-amber-300`;
    };

    const [bottomOffset, setBottomOffset] = useState(0);
    const footerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (footerRef.current) {
                const footerRect = footerRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                if (footerRect.top < windowHeight) {
                    setBottomOffset(windowHeight - footerRect.top);
                } else {
                    setBottomOffset(0);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleBackendCall = async (data) => {
        const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
        if (isLocalhost) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return { success: true };
        }
        try {
            const response = await fetch("https://digitaltoinfinity.com/contact.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return await response.json();
            } else {
                return { success: false, message: "Server error." };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;
        setIsSubmitting(true);
        const result = await handleBackendCall({
            name: formData.name,
            phone: formData.phone,
            message: formData.message
        });
        if (result.success) {
            setSubmitted(true);
            ReactGA.event({ category: "Lead", action: "Submitted Bottom Form", label: formData.name });

            // Meta Pixel Lead
            ReactPixel.track('Lead', {
                content_name: 'Starter Pack Bottom Form',
                content_category: 'Starter Pack'
            });

            setFormData({ name: '', phone: '', message: '' });
            setTouched({});
            setTimeout(() => setSubmitted(false), 5000);
        } else {
            alert("Error sending message: " + result.message);
        }
        setIsSubmitting(false);
    };

    const handlePopupSubmit = async (data) => {
        setIsPopupSubmitting(true);
        const result = await handleBackendCall(data);
        if (result.success) {
            setPopupSubmitted(true);
            ReactGA.event({ category: "Lead", action: "Submitted Popup Form", label: data.name });

            // Meta Pixel Lead
            ReactPixel.track('Lead', {
                content_name: 'Starter Pack Popup Form',
                content_category: 'Starter Pack'
            });

            setTimeout(() => {
                setPopupSubmitted(false);
                setContactOpen(false);
            }, 3000);
        } else {
            alert("Error sending message: " + result.message);
        }
        setIsPopupSubmitting(false);
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white text-slate-900 font-['Hind'] overflow-x-hidden relative selection:bg-amber-100 selection:text-amber-900">

                <Fireworks />

                {/* Hero Section */}
                <motion.section
                    onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'Starter Pack Hero' })}
                    className="relative z-10 flex flex-col items-center text-center px-4 pt-32 max-[426px]:pt-24 pb-12 max-w-5xl mx-auto"
                >
                    <Reveal>
                        <h1 className="text-6xl max-[426px]:text-5xl max-[376px]:text-4xl font-bold tracking-normal leading-tight text-slate-900 font-['Poppins'] mb-6 max-w-5xl mx-auto">
                            Navi Mumbai में अपनी दुकान को <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Brand बनाएं</span>
                        </h1>
                    </Reveal>
                    <Reveal>
                        <p className="text-lg md:text-2xl text-slate-600 font-['Hind'] max-w-3xl mx-auto mb-10 leading-relaxed border-b-2 border-slate-100 pb-8">
                            Google #1 रैंकिंग + सोशल मीडिया ग्रोथ + वेबसाइट <br className="hidden md:block" /> <span className="font-bold text-slate-900">– सब एक ही पैक में।</span>
                        </p>
                    </Reveal>

                    <Reveal>
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-50 border border-slate-100">
                            <Clock className="w-4 h-4 text-amber-500" />
                            <span className="text-xs font-bold tracking-[0.15em] text-slate-600 uppercase font-['Poppins']">जनवरी 2025 के लिए लिमिटेड स्लॉट्स</span>
                        </div>
                    </Reveal>

                    {/* Premium Starter Pack Image */}
                    <Reveal className="w-full max-w-4xl mt-12 mb-10 relative">
                        <div className="rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden relative group hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-all duration-500">
                            <img
                                src={premiumStarterPackImg}
                                alt="Premium Starter Pack"
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </Reveal>

                    {/* Timer & CTA Block */}
                    <Reveal className="flex flex-col items-center gap-8 w-full">
                        <CountdownTimer />
                        <button
                            onClick={() => {
                                setContactOpen(true);
                                ReactPixel.track('InitiateCheckout', { content_name: 'Starter Pack Claim' });
                            }}
                            className="group relative overflow-hidden bg-amber-400 hover:bg-amber-300 text-black font-extrabold py-5 px-6 max-[376px]:px-2 max-[321px]:text-sm cursor-pointer rounded-2xl transition-all shadow-[0_4px_0_rgb(180,83,9)] hover:shadow-[0_2px_0_rgb(180,83,9)] hover:translate-y-[2px] font-['Poppins'] tracking-wide flex items-center gap-3 max-[376px]:gap-2 w-full max-w-md justify-center"
                        >
                            <Zap className="w-6 max-[321px]:w-4 h-6 max-[321px]:h-4 fill-black" />
                            अभी ऑफर क्लेम करें (CLAIM OFFER)
                        </button>
                    </Reveal>
                </motion.section>

                <Reveal className="w-full">
                    <AdMarquee />
                </Reveal>

                {/* MINIMAL GRID SERVICES SECTION */}
                <motion.section
                    onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'Starter Pack Services' })}
                    className="relative z-10 py-16 bg-white w-full border-t border-gray-100"
                >
                    <div className="max-w-7xl mx-auto px-4 md:px-0">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-2 font-['Poppins']">आपके बिज़नेस को <span className="text-amber-500">बढ़ाने के लिए हमारी सर्विसेज</span></h2>
                            <div className="flex items-baseline justify-center gap-3 font-['Poppins']">
                                <span className="text-gray-400 line-through text-lg">₹47,000</span>
                                <span className="text-5xl font-bold text-slate-900">₹39,999</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 border-l border-t border-gray-100">
                            {hindiServices.map((item, index) => (
                                <div key={item.id} className="border-b border-r border-gray-100">
                                    <Reveal className="h-full">
                                        <ServiceCardMinimal item={item} index={index} />
                                    </Reveal>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                <section className="py-10 border-y border-gray-100 bg-gray-50 overflow-hidden">
                    <div className="text-center mb-6 text-xs font-bold uppercase tracking-[0.3em] text-gray-400 font-['Poppins']">ग्लोबल स्टैंडर्ड रिजल्ट्स (Verified Results)</div>
                    <div className="flex flex-col items-center justify-center gap-6 px-4">
                        <h3 className="text-xl md:text-2xl max-[321px]:text-lg font-bold text-slate-800 font-['Poppins']">
                            लोकल बिज़नेस के लिए <span className="text-amber-600 underline decoration-amber-300">500+ लीड्स</span> जनरेट करने वाली स्ट्रेटेजीज़।
                        </h3>
                    </div>
                </section>

                <motion.section
                    onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'Starter Pack Portfolio' })}
                    className="relative z-10 py-24 max-[769px]:py-12 overflow-hidden bg-slate-900 border-y border-white/5"
                >
                    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
                    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full" />

                    <div className="max-w-7xl mx-auto px-4 mb-20 max-[426px]:mb-10 text-center relative z-10">
                        <Reveal>
                            <span className="text-blue-400 font-mono text-xs font-black uppercase tracking-[0.4em] mb-4 block">Our Digital Footprint</span>
                            <h2 className="text-4xl md:text-6xl max-[426px]:text-5xl max-[376px]:text-4xl font-black text-white tracking-tighter font-['Poppins']">
                                THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-orange-400 uppercase">Portfolio</span>
                            </h2>
                        </Reveal>
                    </div>

                    <div className="mb-12 max-[426px]:mb-6 opacity-50 hover:opacity-100 transition-opacity duration-500">
                        <div className="flex w-full overflow-hidden relative py-4">
                            <motion.div
                                className="flex gap-16 items-center whitespace-nowrap"
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                                whileHover={{ animationPlayState: "paused" }}
                            >
                                {[...clientLogo, ...clientLogo, ...clientLogo].map((logo, i) => (
                                    <span key={i} className="text-white/40 text-2xl md:text-4xl font-black font-['Poppins'] tracking-tighter uppercase italic hover:text-blue-400 transition-colors cursor-default">
                                        {logo}
                                    </span>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    <div className="mb-20 max-[426px]:mb-6">
                        <div className="flex w-full overflow-hidden relative">
                            <div className="absolute inset-y-0 left-0 w-20 md:w-60 bg-gradient-to-r from-slate-900 to-transparent z-20 pointer-events-none" />
                            <div className="absolute inset-y-0 right-0 w-20 md:w-60 bg-gradient-to-l from-slate-900 to-transparent z-20 pointer-events-none" />

                            <motion.div
                                className="flex gap-8 px-4"
                                animate={{ x: ["0%", "-80%"] }}
                                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                                whileHover={{ animationPlayState: "paused" }}
                            >
                                {[...webProjects, ...webProjects].map((project, index) => (
                                    <div key={index} className="w-[350px] md:w-[600px] lg:w-[750px] shrink-0 relative">
                                        <a
                                            href={project.website}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="block h-[250px] md:h-[450px] relative rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-2xl group"
                                        >
                                            <div className="absolute inset-0 z-0">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-fill transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
                                            </div>
                                            <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <h3 className="text-2xl md:text-5xl font-black text-white mb-4 drop-shadow-2xl font-['Poppins']">
                                                    {project.title}
                                                </h3>
                                                <div className="inline-flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                    <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">Explore Project</span>
                                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-900">
                                                        <ArrowRight size={16} />
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    <div className="py-4">
                        <div className="flex w-full overflow-hidden relative">
                            <motion.div
                                className="flex gap-6 px-4"
                                initial={{ x: "0%" }}
                                animate={{ x: ["-50%", "0%"] }}
                                transition={{
                                    duration: 40,
                                    ease: "linear",
                                    repeat: Infinity
                                }}
                                whileHover={{ animationPlayState: "paused" }}
                            >
                                {[...socialPosts, ...socialPosts, ...socialPosts].map((post, i) => (
                                    <div key={i} className="w-[200px] md:w-[300px] shrink-0">
                                        <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/5 group">
                                            <img src={post.image} className="w-full h-full object-fill transition-all duration-500" alt="" />
                                            <div className="absolute inset-0 transition-colors" />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white/10 backdrop-blur-md text-[10px] text-white px-3 py-1 rounded-full border border-white/10 font-bold uppercase tracking-widest">
                                                    {post.platform}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <p className="text-white text-xs font-bold font-['Poppins'] leading-tight line-clamp-2 opacity-100 transition-opacity">
                                                    {post.title}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'Starter Pack Bottom Form' })}
                    id="contact"
                    className="relative z-10 py-20 max-[426px]:py-10 px-4"
                >
                    <Reveal>
                        <div className="max-w-2xl mx-auto rounded-3xl border border-gray-100 bg-white p-8 max-[426px]:px-6 max-[376px]:px-4 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl max-[426px]:text-2xl max-[321px]:text-xl font-bold mb-2 text-slate-900 font-['Poppins']">फ्री ऑडिट और कॉल बैक पाएं</h2>
                                <p className="text-slate-500 text-sm max-[321px]:text-xs">हमारे साथ बढ़ रहे 500+ लोकल बिज़नेसेस से जुड़ें।</p>
                            </div>
                            <form className="space-y-5" onSubmit={handleFormSubmit}>
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500 font-medium uppercase tracking-wider ml-1">नाम (Name)</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} required className={getInputClass('name', true)} placeholder="अपना नाम लिखें" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500 font-medium uppercase tracking-wider ml-1">व्हाट्सएप नंबर (WhatsApp Number)</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur} required className={getInputClass('phone', true)} placeholder="+91 98765 43210" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-500 font-medium uppercase tracking-wider ml-1">संदेश (Message)</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} onBlur={handleBlur} className={getInputClass('message', true)} placeholder="अपना संदेश लिखें" />
                                </div>
                                <button type="submit" disabled={isSubmitting || submitted || !isFormValid} className={`w-full font-bold py-4 rounded-xl transition-all transform hover:scale-[1.01] shadow-lg cursor-pointer flex items-center justify-center gap-2 font-['Poppins'] tracking-wide uppercase text-sm ${isFormValid && !isSubmitting && !submitted ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200' : submitted ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
                                    {isSubmitting ? (<> <Loader2 className="w-4 h-4 animate-spin" /> प्रोसेस हो रहा है... </>) : submitted ? (<> <Check className="w-4 h-4" /> सफल! </>) : (isFormValid ? "फ्री ऑडिट और कॉल बैक पाएं" : "विवरण भरें")}
                                </button>
                            </form>
                        </div>
                    </Reveal>
                </motion.section>

                <StarterPackSection />

                <div className="w-full h-32 opacity-10 bg-[url('https://cdn-icons-png.flaticon.com/512/2942/2942544.png')] bg-repeat-x bg-bottom bg-contain pointer-events-none mt-[-50px]"></div>

            </div >
            <div ref={footerRef} className="relative z-20">
                <Footer />
            </div>

            {/* Fixed Bottom CTA Button - 100% Width */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                style={{ bottom: `${bottomOffset}px` }}
                className="fixed left-0 right-0 z-50 px-0 pb-0 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] transition-all duration-100 ease-linear"
            >
                <button
                    onClick={() => {
                        setContactOpen(true);
                        ReactPixel.track('InitiateCheckout', { content_name: 'Starter Pack Fixed Bottom Claim' });
                    }}
                    className="group relative overflow-hidden bg-amber-400 hover:bg-amber-300 text-black font-extrabold py-5 px-6 max-[376px]:px-2 max-[321px]:text-sm cursor-pointer transition-all shadow-[0_4px_0_rgb(180,83,9)] hover:shadow-[0_2px_0_rgb(180,83,9)] hover:translate-y-[2px] font-['Poppins'] tracking-wide flex items-center gap-3 max-[376px]:gap-2 w-full justify-center min-[769px]:justify-between min-[769px]:px-20 rounded-none"
                >
                    <div className="flex items-center gap-3">
                        <Zap className="w-6 max-[321px]:w-4 h-6 max-[321px]:h-4 fill-black" />
                        अभी ऑफर क्लेम करें (CLAIM OFFER)
                    </div>

                    <div className="hidden min-[769px]:flex items-center gap-3">
                        <Zap className="w-6 max-[321px]:w-4 h-6 max-[321px]:h-4 fill-black" />
                        अभी ऑफर क्लेम करें (CLAIM OFFER)
                    </div>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                </button>
            </motion.div>

            <ContactPopup
                isOpen={isContactOpen}
                onClose={() => setContactOpen(false)}
                onSubmit={handlePopupSubmit}
                isSubmitting={isPopupSubmitting}
                submitted={popupSubmitted}
            />
        </>
    );
};

export default StarterPackOffers;