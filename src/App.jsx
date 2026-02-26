import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import ReactPixel from 'react-facebook-pixel';
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Plans from "./pages/Plans";
import GrowthEngine from "./pages/GrowthEngine";
import PerformanceAcc from "./pages/PerformanceAcc";
import MarketLeader from "./pages/MarketLeader";
import Portfolio from "./pages/Portfolio";
import ScrollToTop from "./components/ScrollToTop";
import NewYear from "./pages/NewYear";
import StarterPackOffers from './pages/StarterPackOffers';
import OnboardingForm from './pages/OnboardingForm';
import Career from './pages/Career';
import GrowthEngineLP from './pages/GrowthEngineLP';
import PerformanceAcceleratorLP from './pages/PerformanceAcceleratorLP';
import MarketLeaderLP from './pages/MarketLeaderLP';
import FreeMarketingPlanPage from './pages/FreeMarketingPlanPage';
import MarketingFormPage from './pages/MarketingFormPage';
import Audit from './pages/audit';


ReactGA.initialize("G-H5N5VHRL0Q");

const PIXEL_ID = 'YOUR_PIXEL_ID'; // Replace with real ID

const options = {
  autoConfig: true,
  debug: false,
};

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Pixel once
    ReactPixel.init(PIXEL_ID, {}, options);

    // Global click listener for all buttons and links
    const handleGlobalClick = (e) => {
      const target = e.target.closest('button, a');
      if (target) {
        const text = target.innerText || target.getAttribute('aria-label') || 'unnamed';
        const type = target.tagName.toLowerCase();
        const href = target.getAttribute('href') || 'no-link';

        ReactPixel.track('Click', {
          element_type: type,
          text: text.trim(),
          href: href,
          location: window.location.pathname
        });
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  useEffect(() => {
    // Google Analytics Page View
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });

    // Meta Pixel Page View
    ReactPixel.pageView();
  }, [location]);

  return null;
};

function App() {

  return (
    <>
      <Router>

        <AnalyticsTracker />
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/plans/growth-engine-plans" element={<GrowthEngine />} />
          <Route path="/plans/performance-accelerator-plans" element={<PerformanceAcc />} />
          <Route path="/plans/market-leader-plans" element={<MarketLeader />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/new-year-offers" element={<NewYear />} />
          <Route path="/starter-pack-offers" element={<StarterPackOffers />} />
          <Route path="/onboarding-form" element={<OnboardingForm />} />
          <Route path="/careers" element={<Career />} />
          <Route path="/growth-engine-package" element={<GrowthEngineLP />} />
          <Route path="/performance-accelerator-package" element={<PerformanceAcceleratorLP />} />
          <Route path="/market-leader-package" element={<MarketLeaderLP />} />
          <Route path="/free-audit">
            <Route index element={<Audit />} />
            <Route path="free-marketing-plan" element={<FreeMarketingPlanPage />} />
            <Route path="marketing-form" element={<MarketingFormPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
