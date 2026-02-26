import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MarketingPlanForm from '../components/MarketingPlanForm';

const MarketingFormPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white">
            <Navbar />
            <MarketingPlanForm />
            <Footer />
        </div>
    );
};

export default MarketingFormPage;
