import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FreeMarketingPlan from '../components/FreeMarketingPlan';

const FreeMarketingPlanPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white">
            <Navbar />
            <FreeMarketingPlan />
            <Footer />
        </div>
    );
};

export default FreeMarketingPlanPage;
