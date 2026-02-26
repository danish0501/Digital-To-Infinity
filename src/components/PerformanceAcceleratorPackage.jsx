import { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import outcomesImg from '../assets/performance-accelerator-package/outcomes-section.png';
import marketImg from '../assets/performance-accelerator-package/navi-mumbai-market.png';
import changeImg from '../assets/performance-accelerator-package/change-we-make.png';
import differenceImg from '../assets/performance-accelerator-package/the-premium-difference.png';
import consultationImg from '../assets/performance-accelerator-package/strategy-consultation.png';

const PerformanceAcceleratorPackage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessType: '',
    marketingSpend: '',
    isDecisionMaker: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const businessOptions = [
    "Interior Design",
    "Real Estate",
    "Boutique Developer",
    "Architect"
  ];

  const spendRanges = [
    "₹30,000 - ₹50,000",
    "₹50,000 - ₹1,00,000",
    "₹1,00,000+"
  ];

  const decisionOptions = ["Yes", "No"];

  const [isSpendDropdownOpen, setIsSpendDropdownOpen] = useState(false);
  const spendDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (spendDropdownRef.current && !spendDropdownRef.current.contains(event.target)) {
        setIsSpendDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectBusiness = (option) => {
    setFormData(prev => ({ ...prev, businessType: option }));
    setIsDropdownOpen(false);
  };

  const handleSelectSpend = (option) => {
    setFormData(prev => ({ ...prev, marketingSpend: option }));
    setIsSpendDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTriedSubmit(true);

    const isFormValid =
      formData.name.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.businessType !== '' &&
      formData.marketingSpend !== '' &&
      formData.isDecisionMaker !== '';

    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('https://digitaltoinfinity.com/performance_accelerator_contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setIsSubmitted(true);
        setTriedSubmit(false);
        setIsSubmitting(false);

        // Meta Pixel Lead
        ReactPixel.track('Lead', {
          content_name: 'Performance Accelerator Form',
          content_category: 'Performance Accelerator',
          business_type: formData.businessType,
          marketing_spend: formData.marketingSpend
        });

        // Success message disappears and form reappears after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            phone: '',
            email: '',
            businessType: '',
            marketingSpend: '',
            isDecisionMaker: ''
          });
        }, 5000);
      } else {
        alert(result.message || "Something went wrong. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Network error. Please try again later.");
      setIsSubmitting(false);
    }
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const element = document.getElementById('contact-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'Performance Accelerator Page' })}
      className="bg-[#0A0D14] text-[#F5F7FA] font-sans selection:bg-[#7C3AED]/30 relative overflow-hidden"
    >
      {/* Background Texture & Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
            x: [-20, 20, -20],
            y: [-10, 10, -10]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#7C3AED]/10 blur-[150px] rounded-full"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1.2, 1, 1.2],
            x: [20, -20, 20],
            y: [10, -10, 10]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#6366F1]/10 blur-[150px] rounded-full"
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.08),transparent_50%)] blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0D14] via-[#0E1218] to-[#0A0D14]" />
      </div>

      <main className="relative z-10">
        {/* Hero */}
        <section className="pt-24 pb-8 md:pt-30 md:pb-12 text-center" id="top">
          <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12, delayChildren: 0.2 }
                }
              }}
              className="font-['Sora'] text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] bg-gradient-to-br from-white to-[#F5F7FA]/80 bg-clip-text text-transparent mb-6 max-w-[20ch] mx-auto"
            >
              {["This", "Is", "Not", "Marketing.", "This", "Is", "Strategic", "Growth."].map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="inline-block mr-[0.2em] last:mr-0"
                >
                  {word}
                  {i === 3 && <br />}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl font-medium leading-[1.65] text-[#F5F7FA]/75 max-w-[65ch] mx-auto mb-4"
            >
              A ₹50,000/month performance system built for Interior Designers, Architects, and Boutique Developers in Navi Mumbai who want positioning, qualified enquiries, and control — not chaos.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-[13px] font-bold text-[#F5F7FA]/40 uppercase tracking-[0.2em] mb-10"
            >
              Built for serious businesses • Limited monthly onboarding
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center gap-4 mb-8"
            >
              <a
                href="#contact-section"
                onClick={(e) => {
                  scrollToContact(e);
                  ReactPixel.track('InitiateCheckout', { content_name: 'Performance Accelerator Hero Claim' });
                }}
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-[15px] bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#A855F7] text-white border border-white/20 shadow-[0_0_32px_rgba(124,58,237,0.3)] hover:shadow-[0_20px_60px_rgba(124,58,237,0.4)] transition-all duration-300 active:scale-95"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                  animate={{ translateX: ["100%", "-100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                />
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Apply for the ₹50K Growth Plan
              </a>
              <motion.a
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}
                href="#solves"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-semibold text-[15px] bg-white/5 border border-white/10 transition-all duration-300"
              >
                See How the System Works
              </motion.a>
            </motion.div>
          </div>
        </section>

        <div className="h-px bg-white/10" />

        {/* This Is Not For Everyone */}
        <section className="py-12 md:py-16 bg-white/[0.02]">
          <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-['Sora'] text-3xl md:text-5xl font-bold tracking-tight text-[#F5F7FA] mb-4">
                This Is Not for Everyone. <br className="max-md:hidden" /> And That’s Intentional.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-red-500/5 border border-red-500/10 rounded-[2.5rem] p-8 md:p-10"
              >
                <h3 className="text-xl font-bold text-red-400 mb-8 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-400/10 flex items-center justify-center text-sm font-black">✕</span>
                  This is NOT for you if:
                </h3>
                <ul className="space-y-6">
                  {[
                    "You want cheap leads without a system",
                    "You are still \"trying\" digital marketing",
                    "You expect instant results without structure"
                  ].map((text, i) => (
                    <li key={i} className="flex gap-4 text-[#F5F7FA]/70 leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400/30 mt-2.5 shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-[#7C3AED]/5 border border-[#7C3AED]/10 rounded-[2.5rem] p-8 md:p-10"
              >
                <h3 className="text-xl font-bold text-[#7C3AED] mb-8 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#7C3AED]/10 flex items-center justify-center text-sm font-black">✓</span>
                  This IS for you if:
                </h3>
                <ul className="space-y-6">
                  {[
                    "You want predictable, qualified enquiries",
                    "You care about positioning and long-term growth",
                    "You are ready to invest monthly in a real system"
                  ].map((text, i) => (
                    <li key={i} className="flex gap-4 text-[#F5F7FA]/70 leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]/30 mt-2.5 shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="h-px bg-white/10" />

        {/* Reframe What You Get */}
        <section className="py-12 md:py-16" id="solves">
          <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="font-['Sora'] text-3xl md:text-5xl font-bold tracking-tight text-[#F5F7FA] mb-4">
                What This ₹50,000 Plan <br className="max-md:hidden" /> Actually Solves
              </h2>
              <p className="text-lg text-[#F5F7FA]/55 max-w-[60ch]">
                This is not a list of services. <br /> It’s a connected system designed to remove uncertainty from growth.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "1. Positioning & Authority",
                  points: [
                    "Clear market positioning for Navi Mumbai audiences",
                    "Local authority signals that separate you from competitors",
                    "Messaging designed to attract serious enquiries"
                  ],
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  )
                },
                {
                  title: "2. Qualified Enquiry Flow",
                  points: [
                    "Funnel built to filter curiosity and attract intent",
                    "Lead flow optimized for quality, not volume",
                    "Retargeting system for missed but interested prospects"
                  ],
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12h8M12 8v8" />
                    </svg>
                  )
                },
                {
                  title: "3. Execution & Control",
                  points: [
                    "Structured Meta + Google execution",
                    "Clear visibility into what’s working and why",
                    "No guesswork, no random activity"
                  ],
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M21 12V7H5v10h10" />
                      <path d="M16 5V3M22 12a6 6 0 11-12 0 6 6 0 0112 0z" />
                    </svg>
                  )
                }
              ].map((block, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(124, 58, 237, 0.4)" }}
                  className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 transition-all duration-300 group cursor-default"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    className="w-12 h-12 rounded-2xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center text-[#7C3AED] mb-8 group-hover:bg-[#7C3AED] group-hover:text-white transition-colors duration-300"
                  >
                    {block.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-[#F5F7FA] mb-6 leading-tight">{block.title}</h3>
                  <ul className="space-y-4">
                    {block.points.map((val, idx) => (
                      <li key={idx} className="flex gap-3 text-[14px] text-[#F5F7FA]/60 leading-relaxed font-medium">
                        <div className="w-1 h-1 rounded-full bg-[#7C3AED] mt-2.5 shrink-0" />
                        {val}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px bg-white/10" />

        {/* Outcomes */}
        <section className="py-12 md:py-16" id="outcomes">
          <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="font-['Sora'] text-3xl md:text-4xl font-bold tracking-tight text-[#F5F7FA] mb-3">Outcomes, Not Activity</h2>
              <p className="text-[15px] text-[#F5F7FA]/55 font-medium leading-relaxed max-w-[70ch]">
                We don’t measure success by posts, impressions, or dashboards. <br />
                We measure it by clarity, control, and qualified demand.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {[
                { label: "Positioning", value: "Clear", desc: "You stop sounding like every other \"premium interior designer.\"" },
                { label: "Local Presence", value: "Strong", desc: "Google, directories, word-of-mouth — you show up credibly." },
                { label: "Enquiry Quality", value: "Higher", desc: "Fewer \"just checking\", more \"ready to discuss.\"" },
                { label: "Control", value: "Yours", desc: "You know what's working and what to delegate." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(124, 58, 237, 0.4)" }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 transition-colors duration-300 cursor-default"
                >
                  <div className="text-[12px] font-bold text-[#7C3AED] uppercase tracking-[0.08em] mb-2">{item.label}</div>
                  <div className="font-['Sora'] text-3xl font-extrabold text-[#F5F7FA] tracking-tight mb-2">{item.value}</div>
                  <div className="text-[14px] text-[#F5F7FA]/55 leading-relaxed">{item.desc}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.img
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              src={outcomesImg} alt="Outcomes Section" className="w-full rounded-2xl opacity-90 mt-14"
            />
          </div>
        </section>

        <div className="h-px bg-white/10" />

        {/* System Snapshot */}
        <section className="py-12 md:py-16" id="system">
          <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="font-['Sora'] text-3xl md:text-4xl font-bold tracking-tight text-[#F5F7FA] mb-3">System Snapshot</h2>
              <p className="text-[14px] text-[#F5F7FA]/55 font-medium">Abstract view. Minimal labels. Sophisticated by design.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-6 md:p-10 mb-16"
            >
              <div className="flex gap-4 mb-8 overflow-x-auto pb-4 no-scrollbar">
                {['Positioning', 'Local Authority', 'Entry Points', 'Conversion Assets', 'Qualified Calls'].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex-1 min-w-[140px] bg-white/5 border border-white/10 rounded-2xl p-5 text-center transition-all hover:bg-white/[0.08]"
                  >
                    <div className="font-bold text-[14px] text-[#F5F7FA]">{step}</div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.img
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  src={marketImg} alt="Market Analysis" className="w-full rounded-2xl opacity-90"
                />
                <motion.img
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  src={changeImg} alt="Change Analysis" className="w-full rounded-2xl opacity-90"
                />
              </div>
            </motion.div>

            {/* Micro-Proof Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-['Sora'] text-2xl font-bold text-[#F5F7FA] mb-8">What Changes When the System Is in Place</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  "Fewer leads, but higher-quality sales conversations",
                  "Clear understanding of which campaigns actually work",
                  "Reduced dependency on “trial-and-error” marketing"
                ].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 items-start p-6 bg-white/5 border border-white/10 rounded-2xl"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0 mt-0.5">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                    <p className="text-[15px] text-[#F5F7FA]/75 leading-relaxed font-medium">{text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <div className="h-px bg-white/10" />

        {/* Who & Why */}
        <section className="py-12 md:py-16" id="fit">
          <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-['Sora'] text-3xl md:text-4xl font-bold tracking-tight text-[#F5F7FA] mb-8"
                >
                  Who This Is For
                </motion.h2>
                <div className="space-y-6">
                  {[
                    { title: "₹1–3 Cr interior firms", desc: "Ready to look like the next tier." },
                    { title: "Boutique developers", desc: "Brand-aware founders." },
                    { title: "Already marketing", desc: "Now wants outcomes + positioning." }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(124, 58, 237, 0.4)" }}
                      className="p-7 bg-white/5 border border-white/10 rounded-2xl transition-all cursor-default"
                    >
                      <h3 className="font-bold text-[#F5F7FA] mb-2">{item.title}</h3>
                      <p className="text-[15px] text-[#F5F7FA]/75">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-['Sora'] text-3xl md:text-4xl font-bold tracking-tight text-[#F5F7FA] mb-8"
                >
                  Why ₹50K
                </motion.h2>
                <motion.img
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  src={differenceImg} alt="The Premium Difference" className="w-full rounded-3xl opacity-90 mb-6"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <p className="font-extrabold text-[#F5F7FA] text-lg">₹25k buys action.</p>
                  <p className="font-extrabold text-[#F5F7FA] text-lg">₹50k buys direction.</p>
                  <p className="text-[#F5F7FA]/55 text-sm">Less noise, more control.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-white/10" />

        {/* Contact Section */}
        <section className="py-12 md:py-16" id="contact-section">
          <div className="max-w-[1200px] mx-auto px-8 max-md:px-5">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 md:p-14 relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-start relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="font-['Sora'] text-3xl md:text-4xl font-bold tracking-tight text-[#F5F7FA] mb-5 leading-tight">
                    Apply for the <br /> Performance Accelerator
                  </h2>
                  <p className="text-lg text-[#F5F7FA]/75 mb-10 leading-relaxed font-medium">
                    We work with a limited number of businesses each month to ensure execution quality.
                  </p>
                  <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 p-2 shadow-xl">
                    <img src={consultationImg} alt="Consultation session" className="w-full h-[350px] max-[426px]:h-[300px] rounded-2xl" />
                    <div className="py-4 text-center">
                      <p className="text-[11px] font-bold text-[#F5F7FA]/50 uppercase tracking-widest">Strategies Developed In-Session</p>
                    </div>
                  </div>
                </motion.div>

                <div className="bg-[#121621] rounded-3xl p-8 max-[426px]:p-4 border border-white/10 shadow-2xl min-h-[500px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <motion.label
                              initial={{ opacity: 0, x: -5 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4 }}
                              className="text-[10px] font-bold text-[#F5F7FA]/40 uppercase tracking-wider px-1"
                            >
                              Name *
                            </motion.label>
                            <input
                              type="text" name="name" placeholder="Rahul"
                              value={formData.name} onChange={handleInputChange}
                              className={`w-full bg-[#0A0D14] border ${triedSubmit && !formData.name ? 'border-red-500' : 'border-white/5'} rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#7C3AED]/50 transition-all placeholder-[#F5F7FA]/20`}
                            />
                          </div>
                          <div className="space-y-2">
                            <motion.label
                              initial={{ opacity: 0, x: -5 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: 0.1 }}
                              className="text-[10px] font-bold text-[#F5F7FA]/40 uppercase tracking-wider px-1"
                            >
                              Mobile Number *
                            </motion.label>
                            <input
                              type="tel" name="phone" placeholder="95942xxxxx"
                              value={formData.phone} onChange={handleInputChange}
                              className={`w-full bg-[#0A0D14] border ${triedSubmit && !formData.phone ? 'border-red-500' : 'border-white/5'} rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#7C3AED]/50 transition-all placeholder-[#F5F7FA]/20`}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-[#F5F7FA]/40 uppercase tracking-wider px-1">Email</label>
                          <input
                            type="email" name="email" placeholder="mail@gmail.com"
                            value={formData.email} onChange={handleInputChange}
                            className="w-full bg-[#0A0D14] border border-white/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#7C3AED]/50 transition-all placeholder-[#F5F7FA]/20"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2 flex flex-col relative" ref={dropdownRef}>
                            <label className="text-[10px] font-bold text-[#F5F7FA]/40 uppercase tracking-wider px-1">Business Type *</label>
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`w-full bg-[#0A0D14] border ${isDropdownOpen ? 'border-[#7C3AED]/50 ring-4 ring-[#7C3AED]/10' : (triedSubmit && !formData.businessType ? 'border-red-500' : 'border-white/5')} rounded-2xl px-5 py-4 text-sm focus:outline-none transition-all flex items-center justify-between group active:scale-[0.99]`}
                              >
                                <span className={`${formData.businessType ? 'text-[#F5F7FA]' : 'text-[#F5F7FA]/30'} font-medium`}>
                                  {formData.businessType || "Select Business"}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-[#F5F7FA]/30 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#7C3AED]' : ''}`} />
                              </button>

                              <AnimatePresence>
                                {isDropdownOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-[#121621] border border-white/10 rounded-2xl overflow-hidden z-[100] shadow-2xl backdrop-blur-xl"
                                  >
                                    <div className="p-1.5 space-y-1">
                                      {businessOptions.map((option) => (
                                        <button
                                          key={option}
                                          type="button"
                                          onClick={() => handleSelectBusiness(option)}
                                          className={`w-full px-4 py-3 text-left text-sm rounded-xl transition-all flex items-center justify-between group/opt ${formData.businessType === option ? 'bg-[#7C3AED] text-white' : 'text-[#F5F7FA]/60 hover:bg-white/5 hover:text-[#F5F7FA]'}`}
                                        >
                                          {option}
                                        </button>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>

                          <div className="space-y-2 flex flex-col relative" ref={spendDropdownRef}>
                            <label className="text-[10px] font-bold text-[#F5F7FA]/40 uppercase tracking-wider px-1">Monthly Marketing Spend *</label>
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setIsSpendDropdownOpen(!isSpendDropdownOpen)}
                                className={`w-full bg-[#0A0D14] border ${isSpendDropdownOpen ? 'border-[#7C3AED]/50 ring-4 ring-[#7C3AED]/10' : (triedSubmit && !formData.marketingSpend ? 'border-red-500' : 'border-white/5')} rounded-2xl px-5 py-4 text-sm focus:outline-none transition-all flex items-center justify-between group active:scale-[0.99]`}
                              >
                                <span className={`${formData.marketingSpend ? 'text-[#F5F7FA]' : 'text-[#F5F7FA]/30'} font-medium`}>
                                  {formData.marketingSpend || "Select Range"}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-[#F5F7FA]/30 transition-transform duration-300 ${isSpendDropdownOpen ? 'rotate-180 text-[#7C3AED]' : ''}`} />
                              </button>

                              <AnimatePresence>
                                {isSpendDropdownOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-[#121621] border border-white/10 rounded-2xl overflow-hidden z-[100] shadow-2xl backdrop-blur-xl"
                                  >
                                    <div className="p-1.5 space-y-1">
                                      {spendRanges.map((option) => (
                                        <button
                                          key={option}
                                          type="button"
                                          onClick={() => handleSelectSpend(option)}
                                          className={`w-full px-4 py-3 text-left text-sm rounded-xl transition-all flex items-center justify-between group/opt ${formData.marketingSpend === option ? 'bg-[#7C3AED] text-white' : 'text-[#F5F7FA]/60 hover:bg-white/5 hover:text-[#F5F7FA]'}`}
                                        >
                                          {option}
                                        </button>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-[#F5F7FA]/40 uppercase tracking-wider px-1">Are you the decision-maker? *</label>
                          <div className="relative">
                            <div className={`flex gap-4 pt-1 rounded-2xl transition-all ${triedSubmit && !formData.isDecisionMaker ? 'ring-1 ring-red-500' : ''}`}>
                              {decisionOptions.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, isDecisionMaker: opt }))}
                                  className={`flex-1 py-4 rounded-2xl border text-sm font-bold transition-all ${formData.isDecisionMaker === opt ? 'bg-[#7C3AED] border-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/20' : 'bg-[#0A0D14] border-white/5 text-[#F5F7FA]/30 hover:border-white/20'}`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 group">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base max-[426px]:text-sm py-4 rounded-2xl transition-all shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Applying...
                              </>
                            ) : (
                              "Apply for the ₹50K Growth Plan"
                            )}
                          </button>
                          <p className="mt-4 text-center text-[10px] max-[426px]:text-[8px] font-bold text-[#F5F7FA]/30 uppercase tracking-widest group-hover:text-[#F5F7FA]/50 transition-colors">
                            Not Every Business Is Accepted.
                          </p>
                        </div>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center space-y-6 py-12"
                      >
                        <div className="relative">
                          {[1, 2, 3].map((i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1.5, 0],
                                x: [0, (i - 2) * 40],
                                y: [0, -60 - (i * 20)]
                              }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                              className="absolute left-1/2 top-1/2 w-2 h-2 bg-[#7C3AED] rounded-full blur-[2px]"
                            />
                          ))}
                          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                            <Check className="w-10 h-10 text-green-500" strokeWidth={3} />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-[#F5F7FA]">Application Sent Successfully!</h3>
                        <p className="text-[#F5F7FA]/60 leading-relaxed">
                          Thank you for your interest. <br />
                          We will review your details and get back to you within 24-48 hours.
                        </p>
                        <h4 className="text-[#F5F7FA]/80">Digital To Infinity Teams</h4>
                        <div className="pt-4">
                          <div className="h-1 w-24 bg-white/10 mx-auto rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 5, ease: "linear" }}
                              className="h-full bg-[#7C3AED]"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </motion.div>
  );
};

export default PerformanceAcceleratorPackage;