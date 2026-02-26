import { motion } from 'framer-motion';
import PackageCard from './PackageCard';
import { socialPackages } from '../../data/packageData';

const SocialPackages = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {socialPackages.map((plan, index) => (
                <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <PackageCard plan={plan} />
                </motion.div>
            ))}
        </div>
    );
};

export default SocialPackages;
