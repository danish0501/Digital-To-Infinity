import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import StarterPackSection from "../components/StarterPackSection";
import StatsSection from "../components/StatsSection";
import PricingSection from "../components/PricingSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <ServicesSection />
            <StarterPackSection />  
            <StatsSection />
            <PricingSection />
            <ContactSection />
            <Footer />
        </>
    )
}

export default Home;