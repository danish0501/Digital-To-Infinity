import { useState, useEffect, useRef } from 'react';
import { Check, X, Star, Sparkles, Zap } from 'lucide-react';
import { pricingPlans } from '../data/mock';
import { Link } from 'react-router-dom';

const PricingSection = () => {
    const [visibleCards, setVisibleCards] = useState([]);
    const sectionRef = useRef(null);

    const getPlanPath = (planName) => {
        const name = planName.toLowerCase();
        if (name.includes('basic')) return '/plans/growth-engine-plans';
        if (name.includes('starter')) return '/plans/performance-accelerator-plans';
        if (name.includes('premium')) return '/plans/market-leader-plans';
        return '/contact'; 
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.dataset.index);
                        setVisibleCards((prev) => [...new Set([...prev, index])]);
                    }
                });
            },
            { threshold: 0.2 }
        );

        const cards = sectionRef.current?.querySelectorAll('.pricing-card');
        cards?.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    return (
        <section id="plans" className="py-24 max-[426px]:py-16 bg-gray-50 relative overflow-hidden" ref={sectionRef}>
            {/* Background Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-violet-100 to-indigo-100 rounded-full blur-3xl opacity-50 -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-medium">Pricing Plans</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl max-[426px]:text-3xl max-[376px]:text-4xl font-bold text-gray-900 mb-6">
                        Plans That{' '}
                        <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                            Grow With You
                        </span>
                    </h2>
                    <p className="text-xl max-[426px]:text-base text-gray-600 max-w-2xl mx-auto">
                        Whether you're just starting out or scaling big, our flexible plans give you the right tools and support to succeed.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-3 max-[769px]:grid-cols-1 gap-8 max-w-6xl mx-auto">
                    {pricingPlans.map((plan, index) => {
                        const isVisible = visibleCards.includes(index);
                        const isPopular = plan.popular;

                        return (
                            <div
                                key={plan.id}
                                data-index={index}
                                className={`pricing-card relative ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    } transition-all duration-700`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                {/* Popular Badge */}
                                {isPopular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                                        <div className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium rounded-full shadow-lg shadow-violet-500/30">
                                            <Star className="w-4 h-4 fill-current" />
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                <div
                                    className={`relative h-full p-8 max-[376px]:p-6 rounded-3xl transition-all duration-500 ${isPopular
                                        ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-2xl shadow-violet-500/30 scale-105 hover:scale-[1.08]'
                                        : 'bg-white text-gray-900 border border-gray-100 shadow-xl hover:shadow-2xl hover:scale-[1.02]'
                                        }`}
                                >
                                    {/* Glow Effect for Popular */}
                                    {isPopular && (
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl" />
                                    )}

                                    <div className="relative z-10">
                                        {/* Plan Name */}
                                        <div className="flex items-center gap-2 mb-2">
                                            {isPopular ? (
                                                <Zap className="w-5 h-5" />
                                            ) : (
                                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />
                                            )}
                                            <span className={`text-sm font-medium uppercase tracking-wider ${isPopular ? 'text-white/80' : 'text-violet-600'
                                                }`}>
                                                {plan.name}
                                            </span>
                                        </div>

                                        {/* Price */}
                                        <div className="mb-4">
                                            <span className="text-4xl sm:text-5xl font-bold">₹{plan.price}</span>
                                            <span className={isPopular ? 'text-white/70' : 'text-gray-500'}>
                                                {plan.period}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <p className={`text-sm mb-8 ${isPopular ? 'text-white/80' : 'text-gray-600'
                                            }`}>
                                            {plan.description}
                                        </p>

                                        {/* Features */}
                                        <ul className="space-y-4 mb-8">
                                            {plan.features.map((feature, featureIndex) => (
                                                <li
                                                    key={featureIndex}
                                                    className={`flex items-start gap-3 ${feature.included
                                                        ? ''
                                                        : isPopular ? 'opacity-40' : 'opacity-40'
                                                        }`}
                                                >
                                                    {feature.included ? (
                                                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${isPopular ? 'bg-white/20' : 'bg-violet-100'
                                                            }`}>
                                                            <Check className={`w-3 h-3 ${isPopular ? 'text-white' : 'text-violet-600'
                                                                }`} />
                                                        </div>
                                                    ) : (
                                                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${isPopular ? 'bg-white/10' : 'bg-gray-100'
                                                            }`}>
                                                            <X className={`w-3 h-3 ${isPopular ? 'text-white/50' : 'text-gray-400'
                                                                }`} />
                                                        </div>
                                                    )}
                                                    <span className={`text-sm ${feature.included
                                                        ? isPopular ? 'text-white' : 'text-gray-700'
                                                        : isPopular ? 'text-white/50 line-through' : 'text-gray-400 line-through'
                                                        }`}>
                                                        {feature.text}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* CTA Button */}
                                        <Link
                                            to={getPlanPath(plan.name)}
                                            className={`w-full py-4 max-[426px]:py-3 px-6 rounded-xl font-bold text-base transition-all duration-300 
                                                      flex items-center justify-center transform hover:-translate-y-1
                                                ${isPopular
                                                    ? 'bg-white text-violet-700 shadow-xl hover:shadow-2xl hover:bg-gray-50'
                                                    : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40'
                                                }
                                                      `}
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
