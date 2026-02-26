import { Rocket, Instagram, Facebook, Linkedin, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { companyInfo } from '../data/mock';
import { useEffect, useState } from 'react';
import footerLogo from "../assets/footer-logo.jpg";

const Footer = () => {

  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const footerLinks = {
    plans: [
      { name: 'Growth Engine', href: '/plans/growth-engine-plans' },
      { name: 'Performance Acceleration', href: '/plans/performance-accelerator-plans' },
      { name: 'Market Leader', href: '/plans/market-leader-plans' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Services', href: '/services' },
      { name: 'Plans', href: '/plans' },
      { name: 'Contact', href: '/contact' }
    ],
    support: [
      { name: 'FAQs', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Refund Policy', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/digitaltoinfinity/", label: 'Instagram' },
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61568974208735", label: 'Facebook' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/digital-to-infinity/', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 max-[426px]:pt-14 pb-12 max-[426px]:pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <img src={footerLogo} alt="Digital Infinity" className="h-20 w-auto object-contain" />
              </div>
              <p className="text-white/60 mb-6 max-w-sm">
                {companyInfo.description}
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <a href={`tel:+91${companyInfo.phone}`} className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+91 {companyInfo.phone}</span>
                </a>
                <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>{companyInfo.email}</span>
                </a>
                <div className="flex items-start gap-3 text-white/60">
                  <MapPin className="w-5 h-5" />
                  <span>Room no 101, F-9, Sec - 3E, Kalamboli, Navi Mumbai, Maharashtra - 410218</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-violet-600 transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Plans</h4>
              <ul className="space-y-3">
                {footerLinks.plans.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors duration-300 hover:pl-2"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors duration-300 hover:pl-2"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors duration-300 hover:pl-2"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <p className="text-white/50 text-sm text-center sm:text-left">
                © {new Date().getFullYear()} Digital to Infinity. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 left-8 w-12 h-12 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-500 z-50 cursor-pointer ${showScrollButton
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </button>
    </footer>
  );
};

export default Footer;
