import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ContactPopup from "../components/ContactPopup";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setContactOpen] = useState(false);
  const location = useLocation();

  const isSticky = true; 


  useEffect(() => {
    // Auto-open logic: 30 seconds delay
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

  const navLinks = [
    { name: 'Home', path: "/" },
    { name: 'About', path: "/about" },
    { name: 'Portfolio', path: "/portfolio" },
    { name: 'Services', path: "/services" },
    { name: 'Plans', path: "/plans" },
    { name: 'Contact', path: "/contact" }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isSticky
          ? 'bg-white/90 backdrop-blur-lg shadow-lg py-4'
          : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <img src={Logo} alt="Digital Infinity" className="h-12 w-auto object-contain" />
            </Link>

            {/* DESKTOP MENU  */}
            <div className="hidden min-[769px]:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-medium transition-all duration-300 group 
                ${isActive(link.path)
                      ? 'bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent'
                      : isSticky
                        ? 'text-gray-700 hover:bg-gradient-to-r hover:from-violet-500 hover:to-indigo-500 hover:bg-clip-text hover:text-transparent'
                        : 'text-white/90 hover:bg-gradient-to-r hover:from-violet-500 hover:to-indigo-500 hover:bg-clip-text hover:text-transparent'
                    }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0'}`} />
                </Link>
              ))}
            </div>

            {/* DESKTOP BUTTON */}
            <div className="hidden min-[769px]:flex items-center gap-4">
              <button
                onClick={() => setContactOpen(true)}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 px-4 py-1.5 rounded-md font-semibold cursor-pointer text-base"
              >
                Get Started
              </button>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`min-[769px]:hidden p-2 rounded-lg transition-colors duration-300 ${isSticky ? 'text-gray-700' : 'text-white'}`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* MOBILE MENU DROPDOWN */}
          <div
            className={`min-[769px]:hidden overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 max-[426px]:px-2 py-2 max-[426px]:py-1 rounded-xl font-medium transition-all duration-300 ${isActive(link.path)
                    ? 'text-violet-600 bg-violet-50'
                    : 'text-gray-700 hover:text-violet-600 hover:bg-violet-50'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => setContactOpen(true)}
                className="block w-full text-center mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-2 rounded-lg font-semibold"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* RENDER POPUP COMPONENT */}
      <ContactPopup
        isOpen={isContactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
};

export default Navbar;