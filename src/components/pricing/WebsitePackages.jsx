import { motion } from 'framer-motion';
import PackageCard from './PackageCard';
import { websitePackages } from '../../data/packageData';

const WebsitePackages = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {websitePackages.map((plan, index) => (
                <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <PackageCard plan={plan} showToggle={false} staticPeriod="one time" />
                </motion.div>
            ))}
        </div>
    );
};

export default WebsitePackages;
