import { useEffect, useRef, useState } from 'react';
import {
    MapPin, Globe, Smartphone, Palette, MessageCircle,
    Megaphone, Grid, GraduationCap, FileText, Headphones,
    ArrowRight, Zap, Image, Layers, Tag, Loader2, Check
} from 'lucide-react';
import ContactPopup from "../components/ContactPopup";
import { webProjects } from "../data/mock";
import ReactGA from "react-ga4";

/* --- UTILITY: Scroll Reveal Component --- */
const Reveal = ({ children, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(ref.current);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${className}`}
        >
            {children}
        </div>
    );
};

/* --- COMPONENT: Colorful Fireworks --- */
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
                this.x = Math.random() * w;
                this.y = h;
                this.vx = Math.random() * 4 - 2;
                this.vy = Math.random() * -12 - 5;
                this.gravity = 0.2;
                this.exploded = false;

                const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#ff9900'];
                this.color = colors[Math.floor(Math.random() * colors.length)];

                this.life = 100;
                this.shards = [];
            }

            update() {
                if (!this.exploded) {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.vy += this.gravity;
                    if (this.vy >= -2) {
                        this.exploded = true;
                        this.createShards();
                    }
                } else {
                    this.shards.forEach((s, i) => {
                        s.x += s.vx;
                        s.y += s.vy;
                        s.vy += 0.1;
                        s.alpha -= 0.02;
                        if (s.alpha <= 0) this.shards.splice(i, 1);
                    });
                    if (this.shards.length === 0) this.life = 0;
                }
            }

            createShards() {
                for (let i = 0; i < 50; i++) {
                    const speed = Math.random() * 4 + 2;
                    const angle = Math.random() * Math.PI * 2;
                    this.shards.push({
                        x: this.x,
                        y: this.y,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        alpha: 1,
                        color: this.color
                    });
                }
            }

            draw() {
                if (!this.exploded) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(255,255,255,0.9)";
                    ctx.fill();
                } else {
                    this.shards.forEach(s => {
                        ctx.beginPath();
                        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
                        ctx.fillStyle = s.color;
                        ctx.globalAlpha = s.alpha;
                        ctx.fill();
                        ctx.globalAlpha = 1;
                    });
                }
            }
        }

        const loop = () => {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, w, h);
            ctx.globalCompositeOperation = 'source-over';
            if (Math.random() < 0.05) particles.push(new Particle());
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw();
                if (particles[i].life === 0 || particles[i].y > h) {
                    particles.splice(i, 1);
                }
            }
            animationFrameId = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />;
};

/* --- MAIN PAGE COMPONENT --- */
const NewYearOffers = () => {

    const [isContactOpen, setContactOpen] = useState(false);

    // --- FORM LOGIC START ---
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const hasStartedFilling = Object.values(formData).some(value => value.trim() !== '');

    useEffect(() => {
        const isValid =
            formData.name.trim() !== '' &&
            formData.phone.trim() !== '';

        setIsFormValid(isValid);
    }, [formData]);

    const handleBlur = (e) => {
        setTouched({ ...touched, [e.target.name]: true });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Red Outline Logic
    const getInputClass = (fieldName, isRequired = false) => {
        const baseClass = "w-full bg-black border rounded-lg px-4 py-3 focus:outline-none focus:bg-neutral-900 text-white transition-colors";

        // Show Red Border if Required + Empty + Interacted
        if (isRequired && formData[fieldName].trim() === '' && (touched[fieldName] || hasStartedFilling)) {
            return `${baseClass} border-red-500 placeholder-red-400/50`;
        }
        return `${baseClass} border-white/20 focus:border-white`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('https://digitaltoinfinity.com/send_contact.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
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
                    label: formData.name // Optional: tracks who submitted
                });

                // Meta Pixel Lead
                ReactPixel.track('Lead', {
                    content_name: 'New Year Offer Form',
                    content_category: 'New Year Offer'
                });

                setFormData({ name: '', email: '', phone: '', message: '' });
                setTouched({});
                setTimeout(() => setSubmitted(false), 3000);
            } else {
                throw new Error(result.message || "Failed to send");
            }

        } catch (error) {
            console.error("Error sending email:", error);
            setIsSubmitting(false);
            alert("Failed to send message. Please try again.");
        }
    };
    // --- FORM LOGIC END ---

    const features = [
        { icon: <MapPin />, text: "Google Business Profile Setup" },
        { icon: <Globe />, text: "Responsive Website Creation" },
        { icon: <Smartphone />, text: "Instagram & Facebook Setup" },
        { icon: <Palette />, text: "Brand Asset Pack (Logo/Bio)" },
        { icon: <MessageCircle />, text: "WhatsApp Marketing Tool" },
        { icon: <Megaphone />, text: "3 Ad Campaigns Setup" },
        { icon: <Grid />, text: "All-Over Full Integration" },
        { icon: <GraduationCap />, text: "Basic Training Handover" },
        { icon: <FileText />, text: "5 Viral-Ready Reel Scripts" },
        { icon: <Headphones />, text: "1 Month Support & Maintenance" },
    ];

    return (
        <>
            {/* Inject Animation Styles for Carousel */}
            <style>
                {`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
                `}
            </style>

            <motion.div
                onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'New Year Offer Page' })}
                className="min-h-screen bg-black text-white font-sans overflow-x-hidden relative selection:bg-white selection:text-black"
            >

                {/* --- CLASSIC BLACK BACKGROUNDS --- */}
                <div className="fixed inset-0 z-[-3] bg-black"></div>
                <div className="fixed inset-0 z-[-2] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/30 via-transparent to-transparent"></div>
                <div className="fixed inset-0 z-[-1] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20"></div>

                {/* COLORFUL FIREWORKS */}
                <Fireworks />

                {/* Hero Section */}
                <section className="relative z-10 flex flex-col items-center text-center px-4 mt-24">
                    <Reveal>
                        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/50 bg-purple-900/20 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                            <Zap className="w-4 h-4 text-purple-400 animate-pulse fill-purple-400" />
                            <span className="text-sm max-[321px]:text-xs font-bold tracking-wider text-purple-200">LIMITED TIME NEW YEAR OFFER</span>
                        </div>
                    </Reveal>

                    <Reveal>
                        <h1 className="text-6xl max-[426px]:text-5xl max-[321px]:text-4xl md:text-8xl font-extrabold mb-6 tracking-tight leading-tight">
                            SCALE <span className="bg-gradient-to-r from-emerald-400 via-cyan-500 to-purple-600 bg-clip-text text-transparent">DIGITAL</span><br />
                            IN <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(234,88,12,0.5)]">2026</span>
                        </h1>
                    </Reveal>

                    <Reveal>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
                            Digital To Infinity presents the ultimate launchpad for your business.
                            Start the new year with a complete digital overhaul.
                        </p>
                    </Reveal>
                </section>

                {/* Offer Section */}
                <section className="relative z-10 px-4 md:px-10 max-w-7xl mx-auto mt-24">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">

                        {/* Left: Pricing Card */}
                        <div className="lg:col-span-2">
                            <Reveal>
                                <h2 className="text-5xl max-[321px]:text-4xl font-bold text-white leading-tight mb-6">
                                    The <br />
                                    <span className="bg-gradient-to-r from-blue-400 via-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent text-6xl max-[426px]:text-5xl max-[321px]:text-4xl">
                                        New Year Pack
                                    </span>
                                </h2>
                                <p className="text-gray-400 mb-8 font-light">
                                    Launch your digital presence with a powerful, all-in-one kit designed for speed and impact in 2026.
                                </p>

                                <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-neutral-900/80 backdrop-blur-xl p-8 max-[376px]:p-4 shadow-2xl group hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500">
                                    <div className="absolute top-0 right-0 bg-white text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                                        SAVE 52%
                                    </div>

                                    <p className="text-gray-600 line-through text-2xl">₹25,000</p>
                                    <div className="flex items-baseline gap-2 mb-8">
                                        <span className="text-5xl font-bold text-white">₹11,999</span>
                                        <span className="text-gray-400 text-sm">ONE-TIME</span>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setContactOpen(true);
                                            ReactPixel.track('InitiateCheckout', { content_name: 'New Year Offer Claim' });
                                        }}
                                        className="flex items-center justify-center w-full bg-white hover:bg-gray-200 text-black font-bold py-4 max-[376px]:py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-[1.02] cursor-pointer">
                                        Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
                                    </button>
                                </div>
                            </Reveal>
                        </div>

                        {/* Right: Feature Grid */}
                        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {features.map((feature, idx) => (
                                <Reveal key={idx} className="h-full">
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-black border border-white/10 hover:bg-neutral-900 hover:border-white/30 transition-all duration-300 h-full group">
                                        <div className="w-12 h-12 shrink-0 rounded-full bg-neutral-900 flex items-center justify-center text-white border border-white/10 group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
                                            {feature.icon}
                                        </div>
                                        <div className="text-sm font-semibold text-gray-300 group-hover:text-white">
                                            {feature.text}
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Navigation Buttons */}
                <Reveal className="mt-16 mb-20 max-full mx-auto pt-10 border-t border-white/5">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl max-[321px]:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-white to-gray-500 uppercase">
                            Explore The Ecosystem
                        </h2>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mt-4"></div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-12 max-[1025px]:gap-8">
                        {[
                            {
                                title: 'Explore Portfolio',
                                desc: 'See 500+ Brands We Scaled',
                                link: '/portfolio',
                                icon: <Image className="w-6 h-6" />
                            },
                            {
                                title: 'Our Premium Services',
                                desc: 'Web, AI & High-Growth Ads',
                                link: '/services',
                                icon: <Layers className="w-6 h-6" />
                            },
                            {
                                title: 'Unlock 2026 Pricing',
                                desc: 'Save 68% - Limited Slots',
                                link: '/plans',
                                icon: <Tag className="w-6 h-6" />
                            },
                        ].map((btn, idx) => (
                            <a
                                key={idx}
                                href={btn.link}
                                target="_blank"
                                rel="noreferrer"
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/40 px-12 max-[1025px]:px-8 max-[321px]:px-4 py-5 text-white backdrop-blur-md transition-all duration-500 hover:border-white/60 hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] hover:-translate-y-1 w-full md:w-auto min-w-[280px] max-[426px]:w-[90%]"
                            >
                                <div className="absolute inset-0 translate-y-[100%] bg-white transition-transform duration-300 ease-out group-hover:translate-y-0"></div>
                                <div className="relative z-10 flex items-center gap-5 transition-colors duration-300 group-hover:text-black">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/10 transition-colors duration-300 group-hover:bg-black/10 group-hover:border-black/10">
                                        {btn.icon}
                                    </div>
                                    <div className="text-left">
                                        <div className="text-lg font-bold leading-tight tracking-tight">
                                            {btn.title}
                                        </div>
                                        <div className="text-xs font-medium opacity-60 uppercase tracking-wider mt-1 group-hover:opacity-80 group-hover:font-semibold">
                                            {btn.desc}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </Reveal>

                {/* --- NEW PROJECT CAROUSEL SECTION --- */}
                <section className="relative z-10 py-10 overflow-hidden border-y border-white/5">
                    <Reveal>
                        <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 text-white tracking-wide">
                            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400">MASTERPIECES</span>
                        </h2>
                    </Reveal>

                    {/* Scrolling Track */}
                    <div className="flex w-max animate-scroll">
                        {[...webProjects, ...webProjects].map((project, index) => (
                            <div key={index} className="w-[700px] max-[426px]:w-[400px] mx-4 shrink-0 relative group">
                                {/* Card Design - Fixed height for the full image background */}
                                <div className="h-[350px] max-[426px]:h-[300px] relative border border-white/10 rounded-2xl overflow-hidden hover:border-white/40 transition-all duration-300 group">

                                    {/* Background Image */}
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-fill transition-transform duration-700 group-hover:scale-100 opacity-90"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                                        <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors drop-shadow-lg">{project.title}</h3>
                                        <p className="text-gray-200 text-sm line-clamp-3 mb-8 drop-shadow-md font-medium">{project.description}</p>

                                        <a
                                            href={project.website}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group inline-flex items-center text-sm font-bold text-white uppercase tracking-wider hover:text-gray-300 transition-colors"
                                        >
                                            Visit Website
                                            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Form */}
                <section id="contact" className="relative z-10 py-20 max-[426px]:py-10 px-4">
                    <Reveal>
                        <div className="max-w-2xl mx-auto rounded-3xl border border-white/10 bg-neutral-900/50 backdrop-blur-xl p-8 max-[426px]:px-4 md:p-12 shadow-2xl">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold mb-2 text-white">Claim This Offer</h2>
                                <p className="text-gray-400">Fill out the form below to lock in the 2026 pricing.</p>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-2">
                                            Your Name <span className="text-gray-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            className={getInputClass('name', true)}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-2">
                                            Phone Number <span className="text-gray-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            className={getInputClass('phone', true)}
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-500 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={getInputClass('email')}
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-500 mb-2">Message (Optional)</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white focus:bg-neutral-900 text-white h-32 transition-colors"
                                        placeholder="Tell us about your business..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || submitted || !isFormValid}
                                    className={`w-full font-bold py-4 max-[426px]:py-3 rounded-lg transition-all transform hover:scale-[1.01] shadow-lg cursor-pointer flex items-center justify-center gap-2
                                    ${isFormValid && !isSubmitting && !submitted
                                            ? 'bg-white text-black hover:bg-gray-200'
                                            : submitted
                                                ? 'bg-emerald-500 text-white'
                                                : 'bg-white/20 text-white/50 cursor-not-allowed'}`}
                                >
                                    {isSubmitting ? (
                                        <> <Loader2 className="w-5 h-5 animate-spin" /> Sending... </>
                                    ) : submitted ? (
                                        <> <Check className="w-5 h-5" /> Sent Successfully </>
                                    ) : (
                                        isFormValid ? "SEND ENQUIRY" : "Fill Required Fields"
                                    )}
                                </button>
                            </form>
                        </div>
                    </Reveal>
                </section>

                {/* --- MOBILE FLOATING ACTION BUTTON (Visible only <= 769px) --- */}
                <button
                    onClick={() => {
                        setContactOpen(true);
                        ReactPixel.track('InitiateCheckout', { content_name: 'New Year Offer Mobile Claim' });
                    }}
                    className="fixed bottom-6 right-6 z-50 hidden max-[769px]:flex items-center gap-2 bg-white text-black font-bold py-2 px-6 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)] animate-bounce hover:scale-105 transition-transform"
                >
                    <Zap className="w-4 h-4 text-purple-600 fill-purple-600" />
                    Claim Offer
                </button>

            </motion.div>

            {/* RENDER POPUP COMPONENT */}
            <ContactPopup
                isOpen={isContactOpen}
                onClose={() => setContactOpen(false)}
            />
        </>
    );
}

export default NewYearOffers;