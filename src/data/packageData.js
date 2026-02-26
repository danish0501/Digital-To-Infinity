import { Globe, Palette, Users, Zap, Star, ShieldCheck, Rocket, Layout, Video, Target, TrendingUp, MessageCircle } from 'lucide-react';

export const packageCategories = [
    { id: 'web', label: 'Website Development Packages' },
    { id: 'creatives', label: 'Creatives & Reels Packages' },
    { id: 'ads', label: 'Ads Management Packages' },
    { id: 'social', label: 'Social Media Management Packages' }
];

export const websitePackages = [
    {
        id: 'web-business',
        name: 'Business Website',
        monthlyPrice: '14,999',
        originalPrice: '19,999',
        yearlyPrice: '2,15,990',
        subPrice: 'E-commerce starts @₹22,000',
        originalSubPrice: '₹30,000',
        desc: 'Best for local businesses establishing an online presence.',
        icon: Globe,
        features: [
            { text: 'Up to 5 Custom Pages', included: true },
            { text: 'Clean & Mobile-Friendly Design', included: true },
            { text: 'Contact Form & WhatsApp Integration', included: true },
            { text: 'Basic SEO Readiness', included: true },
            { text: 'Training & Handover included', included: true },
            { text: '8-10 High-Conversion Pages', included: false },
            { text: 'CRM & Ads-Ready Architecture', included: false },
            { text: 'Full Custom Coding (3D Unlocked)', included: false }
        ],
        color: 'from-blue-400/20 to-blue-600/20',
        recommended: false
    },
    {
        id: 'web-growth',
        name: 'Growth Website',
        monthlyPrice: '34,999',
        yearlyPrice: '3,77,990',
        subPrice: 'E-commerce starts @₹60,000',
        desc: 'The "Default Recommendation" for lead generation & scaling.',
        icon: Layout,
        features: [
            { text: '8-10 High-Conversion Pages', included: true },
            { text: 'Conversion-Focused UI/UX', included: true },
            { text: 'Lead Forms & CTA Strategy', included: true },
            { text: 'On-page SEO + Blog-Ready', included: true },
            { text: 'Google Analytics & Lead Tracking', included: true },
            { text: 'CRM & Ads-Ready Architecture', included: true },
            { text: 'Full Custom Coding (3D Unlocked)', included: false },
            { text: 'Advanced Animations & Storytelling', included: false }
        ],
        color: 'from-violet-600 to-indigo-600',
        recommended: true
    },
    {
        id: 'web-brand',
        name: 'Brand Experience Website',
        monthlyPrice: '60K - 1L+',
        yearlyPrice: '6,00,000',
        subPrice: '3D Experience starts @₹80,000',
        desc: 'Premium authority building with high-end custom tech.',
        icon: Rocket,
        features: [
            { text: 'Full Custom Coding (3D Unlocked)', included: true },
            { text: 'Advanced Animations & Storytelling', included: true },
            { text: 'High-Speed Premium Hosting', included: true },
            { text: 'Stand-out, Unique Brand Identity', included: true },
            { text: 'Fully Built to Specific Brand Needs', included: true },
            { text: '3D Experience Integration', included: true },
            { text: 'Advanced Funnel Architecture', included: true },
            { text: 'Priority Strategy & Support', included: true }
        ],
        color: 'from-emerald-400 to-emerald-600',
        recommended: false
    }
];

export const creativesPackages = [
    {
        id: 'creative-presence',
        name: 'Brand Presence Pack',
        monthlyPrice: '9,000',
        yearlyPrice: '97,200',
        desc: 'Best for local visibility and maintaining consistency.',
        icon: Palette,
        features: [
            { text: 'Creatives: 8 Static Posts', included: true },
            { text: 'Reels: 2 Basic Reels', included: true },
            { text: 'Style: Clean & Brand-aligned templates', included: true },
            { text: 'Captions: Basic & Readable', included: true },
            { text: 'Revisions: Limited (3 Per Post)', included: true },
            { text: 'Usage: Social Media', included: true },
            { text: '12 Premium Posts', included: false },
            { text: 'Reels (Trending + Storytelling)', included: false }
        ],
        color: 'from-pink-400/20 to-pink-600/20',
        recommended: false
    },
    {
        id: 'creative-growth',
        name: 'Brand Growth Pack',
        monthlyPrice: '18,000',
        yearlyPrice: '1,94,400',
        desc: 'Focuses on reach, engagement, and brand recall.',
        icon: Video,
        features: [
            { text: 'Creatives: 12 Premium Posts', included: true },
            { text: 'Reels: 4 Reels (Trending + Storytelling)', included: true },
            { text: 'Style: Custom-designed', included: true },
            { text: 'Captions: Hook-based to drive engagement', included: true },
            { text: 'Branding: Consistent Visual Language', included: true },
            { text: 'Usage: Social + Ads-Ready', included: true },
            { text: '15-18 High-end Posts', included: false },
            { text: 'Story-led Reels (Premium Edits)', included: false }
        ],
        color: 'from-violet-600 to-indigo-600',
        recommended: true
    },
    {
        id: 'creative-authority',
        name: 'Brand Authority Pack',
        monthlyPrice: '32,000',
        yearlyPrice: '3,45,600',
        desc: 'Premium positioning with full creative direction.',
        icon: Star,
        features: [
            { text: 'Creatives: 15-18 High-end Posts', included: true },
            { text: 'Reels: 6 Story-led Reels (Premium Edits)', included: true },
            { text: 'Design: Fully Custom Brand Design', included: true },
            { text: 'Strategy: Monthly Content Direction', included: true },
            { text: 'Usage: Social + Ads + Website', included: true },
            { text: 'Bonus: Full Creativity & Dedicated Style', included: true },
            { text: 'Priority Strategy & Management', included: true },
            { text: 'Premium Asset Delivery', included: true }
        ],
        color: 'from-orange-400 to-amber-600',
        recommended: false
    }
];

export const adsPackages = [
    {
        id: 'ads-foundation',
        name: 'Ads Foundation Plan',
        monthlyPrice: '9,000',
        yearlyPrice: '97,200',
        desc: 'Perfect for first-time advertisers starting their journey.',
        icon: Target,
        features: [
            { text: 'Meta OR Google (Choice of One)', included: true },
            { text: 'Ad-Spend: ₹15k – ₹30k /month', included: true },
            { text: 'Campaign: Leads OR Awareness', included: true },
            { text: 'Funnel: Single-step Strategy', included: true },
            { text: 'Optimization: Weekly Review', included: true },
            { text: 'Reporting: Monthly Summary', included: true },
            { text: 'Retargeting Campaigns', included: false },
            { text: 'Multi-Platform Management', included: false }
        ],
        color: 'from-blue-400/20 to-blue-600/20',
        recommended: false
    },
    {
        id: 'ads-growth',
        name: 'Growth Ads System',
        monthlyPrice: '20,000',
        yearlyPrice: '2,16,000',
        desc: 'Consistent lead generation for scaling businesses.',
        icon: TrendingUp,
        features: [
            { text: 'Meta OR Google (Primary Focus)', included: true },
            { text: 'Ad-Spend: ₹30k – ₹80k /month', included: true },
            { text: 'Campaigns: 2–3 (Leads + Retargeting)', included: true },
            { text: 'Funnel: Structured Funnel', included: true },
            { text: 'Optimization: 2x Weekly', included: true },
            { text: 'Reporting: Performance + Insights', included: true },
            { text: 'Meta + Google Management', included: false },
            { text: 'Daily Scaling Strategy', included: false }
        ],
        color: 'from-violet-600 to-indigo-600',
        recommended: true
    },
    {
        id: 'ads-authority',
        name: 'Performance Ads Engine',
        monthlyPrice: '50,000',
        yearlyPrice: '5,40,000',
        desc: 'High-level scaling for established brands.',
        icon: ShieldCheck,
        features: [
            { text: 'Platforms: Meta + Google', included: true },
            { text: 'Ad-Spend: ₹80k – ₹3L+ /month', included: true },
            { text: 'Funnel: Full-funnel Multi-step', included: true },
            { text: 'Optimization: Daily Review', included: true },
            { text: 'Reporting: Weekly + Strategy Call', included: true },
            { text: 'Strategy: Offer + Scaling Strategy', included: true },
            { text: 'Competitor Ad Analysis', included: true },
            { text: 'Advanced Tracking Setup', included: true }
        ],
        color: 'from-blue-600 to-indigo-900',
        recommended: false
    }
];

export const socialPackages = [
    {
        id: 'social-basic',
        name: 'Social Presence Management',
        monthlyPrice: '14,999',
        yearlyPrice: '1,62,000',
        desc: 'Build a solid foundation for your social media handles.',
        icon: Users,
        features: [
            { text: '3 Platforms Managed', included: true },
            { text: '15 Posts per Month', included: true },
            { text: 'Community Management', included: true },
            { text: 'Basic Hashtag Strategy', included: true },
            { text: 'DM Automation Setup', included: false },
            { text: 'Influencer Outreach', included: false },
            { text: 'Viral Trend Response', included: false },
            { text: 'Dedicated Social Manager', included: false }
        ],
        color: 'from-emerald-400/20 to-emerald-600/20',
        recommended: false
    },
    {
        id: 'social-growth',
        name: 'Social Growth Management',
        monthlyPrice: '28,000',
        yearlyPrice: '3,02,400',
        desc: 'Boost your engagement and build a loyal community.',
        icon: MessageCircle,
        features: [
            { text: '4 Platforms Managed', included: true },
            { text: 'Daily Posting Schedule', included: true },
            { text: 'Real-time Comment Reply', included: true },
            { text: 'DM Automation Setup', included: true },
            { text: 'Influencer Outreach (2/mo)', included: true },
            { text: 'Competitor Monitoring', included: true },
            { text: 'Viral Trend Response', included: false },
            { text: 'Dedicated Social Manager', included: false }
        ],
        color: 'from-violet-600 to-indigo-600',
        recommended: true
    },
    {
        id: 'social-omni',
        name: 'Social Authority Management',
        monthlyPrice: '45,000',
        yearlyPrice: '4,86,000',
        desc: 'Complete control over your niche\'s digital space.',
        icon: Zap,
        features: [
            { text: 'All Social Platforms', included: true },
            { text: 'Daily High-Quality Reels', included: true },
            { text: 'Viral Trend Response', included: true },
            { text: 'Crisis Management', included: true },
            { text: 'Monthly Strategy Workshop', included: true },
            { text: 'Dedicated Social Manager', included: true },
            { text: 'Influencer Outreach (5/mo)', included: true },
            { text: 'Community Building', included: true }
        ],
        color: 'from-emerald-500 to-green-700',
        recommended: false
    }
];
