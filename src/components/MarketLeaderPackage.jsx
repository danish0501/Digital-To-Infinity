import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Loader2, Zap, Target, Award, Plus, ChevronDown, ShieldCheck, XCircle } from 'lucide-react';
import ilnmLogo from '../assets/ilnm-logo.png';
import ReactPixel from 'react-facebook-pixel';

const MarketLeaderPackage = () => {
  const [isLite, setIsLite] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: '',
    node: '',
    spend: '',
    decision: ''
  });
  const [formStatus, setFormStatus] = useState('idle');
  const [ctaVisible, setCtaVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Custom Cursor Performance
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 769 : false);
  const formRef = useRef(null);

  useEffect(() => {
    // track page view
    ReactPixel.pageView();

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      if (window.scrollY > 600) {
        setCtaVisible(true);
      } else {
        setCtaVisible(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('processing');

    try {
      const response = await fetch('https://digitaltoinfinity.com/market_leader_contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Meta Pixel Lead Event
        ReactPixel.track('Lead', {
          content_name: 'Market Leader Package Application',
          category: formData.category,
          node: formData.node,
          investment: formData.spend
        });

        setFormStatus('success');
        setTimeout(() => {
          setFormStatus('idle');
          setFormData({
            name: '',
            phone: '',
            email: '',
            category: '',
            node: '',
            spend: '',
            decision: ''
          });
        }, 5000);
      } else {
        setFormStatus('idle');
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setFormStatus('idle');
      alert('An error occurred. Please check your connection and try again.');
    }
  };

  const toggleTheme = () => setIsLite(!isLite);

  // Animation Variants
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }
  };

  const faqs = [
    {
      q: "Who is this for?",
      a: "Established Navi Mumbai businesses that want category leadership. If you are looking for cheap leads, quick hacks, or a “trial month”, this is not designed for you."
    },
    {
      q: "Why ₹1,00,000/month?",
      a: "Because it includes leadership-level positioning, full-funnel media, premium asset creation, and operational systems. The fee filters for seriousness and protects exclusivity."
    },
    {
      q: "What results can I expect?",
      a: "Expect clearer positioning, stronger trust signals, and higher-quality enquiries over time. Outcomes depend on category, competition, budget, and your delivery capacity. No fake guarantees."
    },
    {
      q: "Do you guarantee exclusivity?",
      a: "We do not work with direct competitors in your category within Navi Mumbai. Exclusivity depends on category availability at the time of onboarding."
    },
    {
      q: "What is the minimum commitment?",
      a: "Market leadership is not built in a few weeks. Minimum commitment is discussed after we evaluate fit. If you want immediate results without systems, this will feel frustrating."
    },
    {
      q: "How fast can we start?",
      a: "Onboarding depends on current slots and category exclusivity checks. If accepted, we typically start with positioning and tracking setup, then launch the demand system and asset engine."
    }
  ];

  return (
    <div className={`selection:bg-purple-500/30 font-manrope transition-colors duration-700 ${isLite ? 'bg-[#F4F4F0] text-[#111111]' : 'bg-[#000000] text-[#FFFFFF]'}`}>

      {/* Dynamic CSS Variables */}
      <style dangerouslySetInnerHTML={{
        __html: `
        :root {
          --accent: ${isLite ? '#6200EA' : '#A855F7'};
          --accent-glow: ${isLite ? 'rgba(98, 0, 234, 0.2)' : 'rgba(168, 85, 247, 0.1)'};
          --text-main: ${isLite ? '#111111' : '#FFFFFF'};
          --text-muted: ${isLite ? '#666666' : '#949494'};
          --glass-bg: ${isLite ? 'rgba(255,255,255,0.7)' : 'rgba(10,10,10,0.9)'};
          --border: ${isLite ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'};
          --border-strong: ${isLite ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'};
          --font-display: 'Playfair Display', serif;
        }
        .playfair { font-family: var(--font-display); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { 
          background: var(--accent); 
          border-radius: 10px;
          opacity: 0.3;
        }
        .custom-scroll::-webkit-scrollbar { width: 3px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: var(--accent); opacity: 0.5; }
      `}} />

      {/* Custom Cursor */}
      {!isMobile && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-1.5 h-1.5 bg-white mix-blend-difference rounded-full pointer-events-none z-[9999]"
            animate={{ x: mousePos.x, y: mousePos.y }}
            transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
          />
          <motion.div
            className="fixed top-0 left-0 w-10 h-10 border border-white mix-blend-difference rounded-full pointer-events-none z-[9998]"
            animate={{
              x: mousePos.x,
              y: mousePos.y,
              scale: isHovering ? 1.5 : 1,
              backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0)'
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 150, mass: 0.8 }}
            style={{ translateX: '-50%', translateY: '-50%' }}
          />
        </>
      )}

      {/* Theme Switcher */}
      <div className="fixed bottom-6 right-6 sm:right-8 z-[500] hidden sm:block">
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`relative flex items-center gap-4 p-1.5 rounded-full border backdrop-blur-xl transition-all duration-500 ${isLite
            ? 'bg-white/40 border-black/5 shadow-lg'
            : 'bg-black/40 border-white/10 shadow-[0_0_20px_rgba(157,78,221,0.2)]'
            }`}
        >
          <div className={`absolute h-8 w-8 rounded-full bg-[var(--accent)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isLite ? 'left-1.5' : 'left-[calc(100%-2.4rem)]'
            }`} />

          <div className={`relative z-10 p-1.5 transition-colors duration-500 ${isLite ? 'text-white' : 'text-white/40'}`}>
            <Zap className="w-4 h-4" />
          </div>
          <div className={`relative z-10 p-1.5 transition-colors duration-500 ${!isLite ? 'text-white' : 'text-black/40'}`}>
            <Target className="w-4 h-4" />
          </div>
        </motion.button>
      </div>

      {/* Mobile Theme Toggle */}
      <div className="fixed bottom-[110px] right-6 z-[500] sm:hidden">
        <button
          onClick={toggleTheme}
          className="w-12 h-12 rounded-full bg-[var(--glass-bg)] border border-[var(--border)] backdrop-blur-xl flex items-center justify-center shadow-xl active:scale-90 transition-transform"
        >
          {isLite ? <Zap className="w-5 h-5 text-[var(--accent)] cursor-pointer" /> : <Target className="w-5 h-5 text-[var(--accent)] cursor-pointer" />}
        </button>
      </div>

      {/* Hero Section */}
      <motion.section
        onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'Market Leader Hero' })}
        className="min-h-screen flex items-center justify-center text-center px-4 relative"
      >
        <div className="max-w-[1400px] w-[90%] mx-auto mt-26 max-[426px]:mt-12 pb-16 max-[426px]:pb-6">
          <motion.div
            {...fadeUp}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-[var(--glass-bg)] border border-[var(--border)] rounded-full backdrop-blur-md text-xs sm:text-sm">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10B981]" />
              <span>Invite-only partnership for established brands</span>
            </div>
          </motion.div>

          <motion.span
            {...fadeUp}
            className="block text-[var(--accent)] text-[0.75rem] uppercase tracking-[0.2em] font-semibold mb-4"
          >
            Digital to Infinity
          </motion.span>

          <h1 className="text-[clamp(3rem,8vw,6rem)] leading-[1.1] tracking-tight mb-8 playfair">
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
                className="block"
              >
                Category Monopoly
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
                className="block text-[var(--text-muted)] italic"
              >
                for <span className="text-[var(--text-main)] not-italic">Navi Mumbai</span>
              </motion.span>
            </div>
          </h1>

          <motion.p
            {...fadeUp}
            className="text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed mb-12"
          >
            A selective CMO office partnership to become the default choice through full-funnel dominance, premium content, and local trust.
          </motion.p>

          <motion.div
            {...fadeUp}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <a
              href="#apply"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="group relative px-8 py-4 bg-white/5 border border-[var(--border)] text-sm tracking-widest uppercase overflow-hidden backdrop-blur-md transition-all hover:text-black hover:font-semibold"
            >
              <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]" />
              <span className="relative z-10">Apply for Partnership</span>
            </a>
            <a
              href="#comparison"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="text-[var(--text-muted)] text-sm border-b border-transparent hover:border-[var(--text-muted)] transition-all hover:font-semibold"
            >
              Why ₹1 Lakh/mo?
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Filtering Section */}
      <motion.section
        onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'Market Leader Filtering' })}
        className="py-[10vh] px-4 bg-[rgba(0,0,0,0.02)]"
      >
        <div className="max-w-[1400px] w-[90%] mx-auto">
          <div className="mb-16">
            <span className="block text-[var(--accent)] text-[0.75rem] uppercase tracking-[0.2em] font-semibold mb-4">Filtering</span>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] mb-6 playfair">This Is Not for Everyone</h2>
            <p className="text-xl text-[var(--text-muted)]">We keep it strict so the partnership stays effective and exclusive.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div {...fadeUp} className="p-8 sm:p-12 bg-red-500/5 border border-red-500/10 backdrop-blur-md rounded-2xl">
              <div className="flex items-center gap-3 mb-8 text-red-500">
                <XCircle className="w-6 h-6" />
                <h3 className="text-xl font-bold uppercase tracking-wider">Not For</h3>
              </div>
              <ul className="space-y-6">
                {[
                  'Cheap leads and "just run ads" requests.',
                  'Trial marketing with weekly switching and no ownership.',
                  'Businesses without a commitment to premium positioning.',
                  'Teams not ready to implement standard follow-up systems.'
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-[var(--text-muted)]">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeUp} className="p-8 sm:p-12 bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-md rounded-2xl">
              <div className="flex items-center gap-3 mb-8 text-emerald-500">
                <ShieldCheck className="w-6 h-6" />
                <h3 className="text-xl font-bold uppercase tracking-wider">For</h3>
              </div>
              <ul className="space-y-6">
                {[
                  'Serious businesses building long-term dominance in Navi Mumbai.',
                  'Founders who want category leadership, not temporary spikes.',
                  'Owners ready to invest in authority and premium content.',
                  'Teams ready to work with CRM and lead qualification systems.'
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-[var(--text-muted)]">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Asset Section */}
      <motion.section
        onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'Market Leader Assets' })}
        className="py-[10vh] px-4"
      >
        <div className="max-w-[1400px] w-[90%] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] playfair">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                We run your growth like a CMO office.
              </motion.span>
            </h2>
            <div className="pl-8 border-l border-[var(--border)]">
              <motion.p
                {...fadeUp}
                className="text-xl sm:text-2xl text-[var(--text-muted)] mb-8"
              >
                You get a complete market leadership system that creates demand, filters enquiries, and builds authority. Integrated growth at scale.
              </motion.p>
              <ul className="space-y-4 text-lg playfair">
                {[
                  'Growth Operating System (Not tasks)',
                  'Positioning & Messaging Monopoly',
                  'Authority-led Content Cadence',
                  'Full-Funnel Demand Generation'
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-[var(--text-muted)]">—</span> {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Comparison Section */}
      <motion.section
        id="comparison"
        onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'Market Leader Comparison' })}
        className="py-[10vh] px-4"
      >
        <div className="max-w-[1400px] w-[90%] mx-auto">
          <span className="block text-[var(--accent)] text-[0.75rem] uppercase tracking-[0.2em] font-semibold mb-4">The Logic</span>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] mb-12 playfair">
            The Cost of Chaos vs.<br />The Investment in Control.
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              {...fadeUp}
              className="bg-[var(--glass-bg)] border border-[var(--border)] p-8 sm:p-12 backdrop-blur-xl opacity-60"
            >
              <h3 className="text-2xl italic mb-10 text-[var(--text-muted)] playfair">The "Freelancer" Chaos</h3>
              <div className="space-y-6">
                {[
                  ['Digital Agency Retainer', '₹40,000'],
                  ['Video/Photo Shoots', '₹35,000'],
                  ['CRM Software', '₹15,000'],
                  ['Landing Page Dev', '₹25,000'],
                ].map(([title, price], i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-[var(--border)]">
                    <span className="text-[var(--text-muted)]">{title}</span>
                    <span>{price}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-8 text-[var(--text-muted)]">
                  <span className="font-semibold">Total Monthly Burn</span>
                  <span className="line-through">₹1,15,000+</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              className="bg-[var(--glass-bg)] border border-[var(--accent)] p-8 sm:p-12 backdrop-blur-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)] blur-[100px] opacity-20" />
              <h3 className="text-2xl italic mb-10 text-[var(--accent)] playfair">Market Leader Pack</h3>
              <div className="space-y-6">
                {[
                  ['CMO-Level Strategy', 'Included'],
                  ['Monthly Premium Shoots', 'Included'],
                  ['Full-Funnel Ads Team', 'Included'],
                  ['Local ILNM Network', 'Included'],
                ].map(([title, status], i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-[var(--border)]">
                    <span className="text-[var(--text-main)]">{title}</span>
                    <span className="text-emerald-500 font-medium flex items-center gap-2">
                      {status}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-8">
                  <span className="font-semibold text-xl playfair">Total Investment</span>
                  <span className="text-3xl font-bold playfair">₹1,00,000</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Infrastructure Section */}
      <motion.section
        onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'Market Leader Infrastructure' })}
        className="py-[10vh] px-4"
      >
        <div className="max-w-[1400px] w-[90%] mx-auto">
          <span className="block text-[var(--accent)] text-[0.75rem] uppercase tracking-[0.2em] font-semibold mb-4">The Infrastructure</span>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] mb-16 playfair">Market Leader Protocol</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: '01',
                title: 'Authority',
                desc: 'Category positioning and offer framing. Trust assets: proof, reviews, and local credibility signals that reduce price-shopping.',
                icon: <Award className="w-8 h-8 text-[var(--accent)]" />
              },
              {
                id: '02',
                title: 'Demand',
                desc: "Full-funnel Meta & Google campaigns. Retargeting loops to stay 'top of mind', conversion tracking, and leak routing systems.",
                icon: <Target className="w-8 h-8 text-[var(--accent)]" />
              },
              {
                id: '03',
                title: 'Assets',
                desc: 'Monthly premium shoot planning (photo/video). Creative library for ads, reels, and remarketing that build long-term trust.',
                icon: <Zap className="w-8 h-8 text-[var(--accent)]" />
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="p-10 bg-[var(--glass-bg)] border border-[var(--border)] backdrop-blur-md hover:border-[var(--border-strong)] transition-all group"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-2xl mb-4 text-[var(--accent)] playfair">{feature.id}. {feature.title}</h3>
                <p className="text-[var(--text-muted)] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Endorsement Section */}
      <motion.section
        onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'Market Leader Endorsement' })}
        className="py-[10vh] px-4 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.1)] flex justify-center items-center"
      >
        <div className="max-w-4xl mx-auto text-center">
          <span className="block text-[var(--accent)] text-[0.75rem] uppercase tracking-[0.2em] font-semibold mb-4">The Unfair Advantage</span>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center -mt-22 max-[426px]:-mt-12 -mb-16 max-[426px]:-mb-8"
          >
            <div className="relative group">
              <div className="absolute rounded-full"></div>
              <img
                src={ilnmLogo}
                alt="I Love Navi Mumbai Logo"
                className={`h-42 sm:h-72 w-122 relative z-10 transition-transform duration-500 group-hover:scale-105 ${isLite ? 'brightness-100' : 'brightness-[1.2]'}`}
              />
            </div>
          </motion.div>

          <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1] mb-8 playfair">Supported by ilovenavimumbai.com</h2>
          <p className="text-xl text-[var(--text-muted)] mb-10 leading-relaxed">
            Leverage the local trust of Navi Mumbai's largest digital community. While others fight for attention, you get the endorsement of the local network.
          </p>
          <motion.div
            {...fadeUp}
            className="inline-block px-8 py-3 border border-[var(--border)] rounded-full text-sm text-[var(--text-muted)]"
          >
            Category Protection: Only 1 Partner per Node/Category.
          </motion.div>
        </div>
      </motion.section>

      {/* Outcomes Section */}
      <motion.section
        onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'Market Leader Outcomes' })}
        className="py-[10vh] px-4"
      >
        <div className="max-w-[1400px] w-[90%] mx-auto">
          <div className="text-center mb-16">
            <span className="block text-[var(--accent)] text-[0.75rem] uppercase tracking-[0.2em] font-semibold mb-4">Outcomes</span>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] playfair">Control, Not Just Activity.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t: 'Clarity', d: 'One positioning, one direction. Everyone on your team knows exactly who you serve.' },
              { t: 'Authority', d: 'Premium framing that reduces price-shopping and makes you the trusted default.' },
              { t: 'Quality Enquiries', d: 'Better intent, cleaner filtering, and a system that protects owner time.' },
              { t: 'Dominance', d: 'Consistent month-after-month execution to cement your market leadership.' }
            ].map((card, i) => (
              <motion.div {...fadeUp} key={i} className="p-8 bg-[var(--glass-bg)] border border-[var(--border)] backdrop-blur-md rounded-xl hover:translate-y-[-5px] transition-transform">
                <h3 className="text-xl mb-3 font-bold">{card.t}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{card.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Application Form Section */}
      <motion.section
        id="apply"
        onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'Market Leader Application Form' })}
        className={`py-[10vh] px-4 transition-colors duration-700 ${isLite ? 'bg-[rgba(0,0,0,0.02)]' : 'bg-[rgba(255,255,255,0.02)]'}`}
      >
        <div className="max-w-[1400px] w-[90%] mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">
            {/* Info Side */}
            <div className="lg:sticky lg:top-32">
              <motion.div {...fadeUp}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-[0.65rem] font-bold uppercase tracking-widest mb-6">
                  <ShieldCheck className="w-3 h-3" />
                  Limited Partnership Slots
                </div>
                <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] mb-8 playfair font-medium">
                  Apply For <br /> <span className="italic text-[var(--accent)]">Category Monopoly.</span>
                </h2>
                <p className="text-xl text-[var(--text-muted)] mb-12 max-w-md leading-relaxed">
                  We verify node availability, category exclusivity, and marketing budget before onboarding.
                </p>

                <div className="space-y-8">
                  <div className="flex gap-4 p-6 bg-[var(--glass-bg)] border-l-4 border-[var(--accent)] rounded-r-xl">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
                      <Award className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 italic">Exclusive Territory</h4>
                      <p className="text-sm text-[var(--text-muted)]">Once a node is locked for your category, we reject all your direct competitors.</p>
                    </div>
                  </div>

                  <ul className="grid sm:grid-cols-2 gap-4 ml-2">
                    {[
                      'Min Budget ₹1L/mo',
                      'Established Brand',
                      'Decision Maker Req.',
                      'Long-term Vision'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Form Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`p-8 sm:p-12 max-[426px]:p-6 rounded-3xl border backdrop-blur-3xl relative overflow-hidden ${isLite
                ? 'bg-white border-black/5 shadow-[0_40px_100px_rgba(0,0,0,0.05)]'
                : 'bg-[#0A0A0A] border-white/5 shadow-2xl'
                }`}
            >
              {/* Decorative logic */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 blur-[100px] pointer-events-none" />

              <AnimatePresence mode="wait">
                {formStatus !== 'success' ? (
                  <motion.form
                    key="application-form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10 space-y-8"
                  >
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-black ml-1">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          placeholder="Arjun Singh"
                          required
                          onChange={handleInputChange}
                          className={`w-full bg-transparent border-b-2 py-3 px-1 outline-none transition-all focus:border-[var(--accent)] ${isLite ? 'border-black/5' : 'border-white/5'}`}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-black ml-1">Mobile Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          placeholder="91XXXXXXXX"
                          required
                          onChange={handleInputChange}
                          className={`w-full bg-transparent border-b-2 py-3 px-1 outline-none transition-all focus:border-[var(--accent)] ${isLite ? 'border-black/5' : 'border-white/5'}`}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-black ml-1">Email Id</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="mail@gmail.com"
                        onChange={handleInputChange}
                        className={`w-full bg-transparent border-b-2 py-3 px-1 outline-none transition-all focus:border-[var(--accent)] ${isLite ? 'border-black/5' : 'border-white/5'}`}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-black ml-1">Business Category *</label>
                        <input
                          type="text"
                          name="category"
                          value={formData.category}
                          placeholder="e.g. Real Estate"
                          required
                          onChange={handleInputChange}
                          className={`w-full bg-transparent border-b-2 py-3 px-1 outline-none transition-all focus:border-[var(--accent)] ${isLite ? 'border-black/5' : 'border-white/5'}`}
                        />
                      </div>
                      <div className="space-y-2 relative">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-black ml-1">Navi Mumbai Node *</label>
                        <button
                          type="button"
                          onClick={() => setActiveDropdown(activeDropdown === 'node' ? null : 'node')}
                          className={`w-full flex justify-between items-center bg-transparent border-b-2 py-3 px-1 outline-none transition-all ${activeDropdown === 'node' ? 'border-[var(--accent)]' : (isLite ? 'border-black/5' : 'border-white/5')}`}
                        >
                          <span>
                            {formData.node || 'Select Node'}
                          </span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'node' ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === 'node' && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 5, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className={`absolute left-0 right-0 top-full z-[100] p-2 rounded-xl border shadow-2xl backdrop-blur-3xl overflow-y-auto max-h-[260px] custom-scroll ${isLite ? 'bg-white/90 border-black/5' : 'bg-[#121212]/95 border-white/10'}`}
                            >
                              {['Vashi', 'Nerul', 'Belapur', 'Kharghar', 'Panvel', 'Seawoods', 'Sanpada', 'Airoli', 'Other'].map(node => (
                                <button
                                  key={node}
                                  type="button"
                                  onClick={() => {
                                    setFormData(p => ({ ...p, node }));
                                    setActiveDropdown(null);
                                  }}
                                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${formData.node === node
                                    ? 'bg-[var(--accent)] text-white'
                                    : (isLite ? 'hover:bg-black/5' : 'hover:bg-white/5')}`}
                                >
                                  {node}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-2 relative">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-black ml-1">Investment Capacity *</label>
                        <button
                          type="button"
                          onClick={() => setActiveDropdown(activeDropdown === 'spend' ? null : 'spend')}
                          className={`w-full flex justify-between items-center bg-transparent border-b-2 py-3 px-1 outline-none transition-all ${activeDropdown === 'spend' ? 'border-[var(--accent)]' : (isLite ? 'border-black/5' : 'border-white/5')}`}
                        >
                          <span>
                            {formData.spend || 'Select range'}
                          </span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'spend' ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === 'spend' && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 5, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className={`absolute left-0 right-0 top-full z-[100] p-2 rounded-xl border shadow-2xl backdrop-blur-3xl overflow-hidden ${isLite ? 'bg-white/90 border-black/5' : 'bg-[#121212]/95 border-white/10'}`}
                            >
                              {['₹50K - ₹1L', '₹1L - ₹2.5L', '₹2.5L+'].map(range => (
                                <button
                                  key={range}
                                  type="button"
                                  onClick={() => {
                                    setFormData(p => ({ ...p, spend: range }));
                                    setActiveDropdown(null);
                                  }}
                                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${formData.spend === range
                                    ? 'bg-[var(--accent)] text-white'
                                    : (isLite ? 'hover:bg-black/5' : 'hover:bg-white/5')}`}
                                >
                                  {range}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="space-y-2 relative">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-black ml-1">Your Role *</label>
                        <button
                          type="button"
                          onClick={() => setActiveDropdown(activeDropdown === 'decision' ? null : 'decision')}
                          className={`w-full flex justify-between items-center bg-transparent border-b-2 py-3 px-1 outline-none transition-all ${activeDropdown === 'decision' ? 'border-[var(--accent)]' : (isLite ? 'border-black/5' : 'border-white/5')}`}
                        >
                          <span>
                            {formData.decision || 'Select Status'}
                          </span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'decision' ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === 'decision' && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 5, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className={`absolute left-0 right-0 top-full z-[100] p-2 rounded-xl border shadow-2xl backdrop-blur-3xl overflow-hidden ${isLite ? 'bg-white/90 border-black/5' : 'bg-[#121212]/95 border-white/10'}`}
                            >
                              {['Decision Maker', 'Partner / Director', 'Marketing Manager'].map(role => (
                                <button
                                  key={role}
                                  type="button"
                                  onClick={() => {
                                    setFormData(p => ({ ...p, decision: role }));
                                    setActiveDropdown(null);
                                  }}
                                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${formData.decision === role
                                    ? 'bg-[var(--accent)] text-white'
                                    : (isLite ? 'hover:bg-black/5' : 'hover:bg-white/5')}`}
                                >
                                  {role}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={formStatus !== 'idle'}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className={`w-full py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 bg-[var(--accent)] text-white hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(98,0,234,0.3)] active:scale-[0.98] cursor-pointer`}
                      >
                        {formStatus === 'processing' ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Applying...</span>
                          </>
                        ) : (
                          <>
                            <span>Apply For Partnership</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <div className="mt-8 flex items-center justify-center gap-6 opacity-30 grayscale">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-center">Data Secured by Priority Onboarding Protocol</p>
                      </div>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-20 text-center space-y-6"
                  >
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                      <Check className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-3xl font-bold playfair">Application Received</h3>
                    <p className="text-[var(--text-muted)] max-w-sm">
                      Your request has been logged. Our partnership team will contact you within 24 hours to verify eligibility.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        onViewportEnter={() => ReactPixel.track('ViewContent', { content_name: 'Market Leader FAQ' })}
        className="py-[10vh] px-4 bg-[rgba(0,0,0,0.01)] overflow-hidden"
      >
        <div className="max-w-[1400px] w-[90%] mx-auto">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
            {/* Sidebar Heading */}
            <div className="lg:sticky lg:top-32 h-fit">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="block text-[var(--accent)] text-[0.75rem] uppercase tracking-[0.2em] font-semibold mb-4">Common Doubts</span>
                <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1] playfair mb-8">
                  Clarifying the<br />Standard of<br />Exclusivity.
                </h2>
                <p className="text-[var(--text-muted)] max-w-sm leading-relaxed">
                  We don't do sales pitches. We provide clarity so you can decide if category monopoly is your next move.
                </p>

                <div className="mt-12 p-6 border border-[var(--border)] bg-[var(--glass-bg)] hidden lg:block">
                  <p className="text-sm italic mb-4">"Market leadership isn't bought through ads, it's engineered through authority."</p>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                    <Zap className="w-3 h-3" />
                    The Protocol
                  </div>
                </div>
              </motion.div>
            </div>

            {/* FAQ Accordion List */}
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`group border transition-all duration-500 overflow-hidden ${openFaq === i
                    ? 'border-[var(--accent)] bg-[var(--glass-bg)] shadow-[0_20px_50px_rgba(0,0,0,0.1)]'
                    : 'border-[var(--border)] bg-transparent hover:border-[var(--text-muted)]'
                    }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start gap-6 p-4 text-left outline-none"
                  >
                    <span className={`text-base mt-1.5 font-bold tracking-tighter transition-colors duration-300 ${openFaq === i ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]/40'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`flex-1 text-lg sm:text-xl max-[426px]:text-base font-bold transition-all duration-300 ${openFaq === i ? 'translate-x-1' : ''}`}>
                      {faq.q}
                    </span>
                    <div className={`mt-1 h-6 w-6 rounded-full border border-[var(--border)] flex items-center justify-center shrink-0 transition-all duration-500 ${openFaq === i ? 'bg-[var(--accent)] border-none rotate-90' : 'group-hover:border-[var(--text-muted)]'}`}>
                      <Plus className={`w-3.5 h-3.5 transition-transform duration-500 ${openFaq === i ? 'rotate-45 text-white' : ''}`} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                      >
                        <div className="px-8 pb-8 flex gap-6">
                          {/* Decorative line */}
                          <div className="w-[1px] bg-[var(--accent)]/30 ml-2" />
                          <div className="text-[var(--text-muted)] text-base sm:text-lg max-[426px]:text-sm leading-relaxed max-w-2xl">
                            {faq.a}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* Need more help? */}
              <motion.div
                {...fadeUp}
                className="pt-10 flex items-center justify-between max-[426px]:flex-col gap-4 border-t border-[var(--border)] mt-12"
              >
                <p className="text-base text-[var(--text-muted)]">Still have questions about node availability?</p>
                <a href="https://wa.me/919594222334" target='_blank' className="text-sm font-bold border-b border-[var(--accent)] text-[var(--accent)] hover:pb-1 transition-all">Direct WhatsApp &rarr;</a>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Sticky Mobile CTA */}
      <AnimatePresence>
        {ctaVisible && (
          <motion.div
            initial={{ y: 100, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            exit={{ y: 100, x: '-50%', opacity: 0 }}
            whileHover={{ scale: 1.02 }}
            className="fixed bottom-8 left-1/2 w-[min(90%,400px)] z-[1000]"
          >
            <div className="relative group">
              {/* Simple Accent Glow (Subtle) */}
              <div className="absolute -inset-0.5 bg-[var(--accent)] rounded-[40px] blur-sm opacity-10"></div>

              <div className={`relative flex items-center justify-between gap-4 backdrop-blur-2xl border p-2.5 pl-6 rounded-[40px] transition-colors duration-500 ${isLite
                ? 'bg-white/90 border-black/10'
                : 'bg-[#1A1A1A] border-white/10'
                }`}>
                <div className="flex flex-col">
                  <span className="text-[0.6rem] uppercase tracking-widest text-[var(--accent)] font-black">Market Leader</span>
                  <span className="text-xs font-bold opacity-80">₹1,00,000 / month</span>
                </div>

                <a
                  href="#apply"
                  className="px-6 py-3 bg-[var(--accent)] text-white text-[0.7rem] font-bold uppercase tracking-widest rounded-full hover:brightness-110 transition-all flex items-center gap-2"
                >
                  Apply Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketLeaderPackage;