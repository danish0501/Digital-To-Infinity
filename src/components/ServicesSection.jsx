import { Users, Search, Target, Monitor, Palette, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { services } from '../data/mock';

const iconMap = {
  Users,
  Search,
  Target,
  Monitor,
  Palette,
  MessageCircle
};

const ServicesSection = () => {
  // Animation Variants for the Container (Grid)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Animation Variants for Individual Cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const gradients = [
    'from-violet-500 to-purple-600',
    'from-blue-500 to-cyan-500',
    'from-orange-500 to-red-500',
    'from-emerald-500 to-teal-500',
    'from-pink-500 to-rose-500',
    'from-indigo-500 to-violet-500'
  ];

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoration - Static to avoid re-paints */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 mb-6"
          >
            <span className="text-sm font-medium">What We Offer</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl max-[376px]:text-3xl max-[321px]:text-2xl font-bold text-gray-900 mb-6 max-[376px]:mb-4"
          >
            Our Premium{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Services
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl max-[376px]:text-lg max-[321px]:text-base text-gray-600 max-w-2xl mx-auto"
          >
            We combine creativity, strategy, and technology to deliver tailored digital marketing solutions.
          </motion.p>
        </div>

        {/* Services Grid - Animated Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="service-card group relative p-8 max-[376px]:p-6 bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 max-[376px]:w-12 h-16 max-[376px]:h-12 mb-6 rounded-2xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}>
                    <IconComponent className="w-8 max-[376px]:w-6 h-8 max-[376px]:h-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl max-[376px]:text-lg max-[321px]:text-sm font-bold text-gray-900 group-hover:text-white mb-4 transition-colors duration-500">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 max-[321px]:text-sm group-hover:text-white/90 mb-6 transition-colors duration-500">
                    {service.description}
                  </p>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-4 right-4 w-20 max-[376px]:w-16 max-[321px]:w-12 h-20 max-[376px]:h-16 max-[321px]:h-12 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                  <IconComponent className="w-full h-full text-gray-900 group-hover:text-white" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;