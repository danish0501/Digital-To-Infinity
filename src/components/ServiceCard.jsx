import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ServiceCard = ({ icon: Icon, title, desc, index }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for the tilt effect
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    // Calculate rotation based on mouse position
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            style={{ perspective: 1000 }}
            className="h-full"
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                }}
                className="group relative h-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl transition-all duration-300 hover:shadow-violet-500/10"
            >
                {/* Dynamic Background Gradient */}
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-violet-500/5 to-purple-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Neon Glow Blob */}
                <div
                    className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl transition-all duration-500 group-hover:bg-violet-500/20"
                    style={{ transform: "translateZ(-20px)" }}
                />

                {/* Content Container (Pops out in 3D) */}
                <div style={{ transform: "translateZ(30px)" }} className="relative flex flex-col items-start h-full leading-snug">

                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-105 group-hover:border-violet-400/30">
                        <Icon className="h-7 w-7 text-violet-200 group-hover:text-white transition-colors duration-300" />
                    </div>

                    <h3 className="mb-3 text-2xl max-[321px]:text-xl font-bold text-white tracking-tight group-hover:text-violet-100 transition-colors">
                        {title}
                    </h3>

                    <p className="text-[#DCDCDC] leading-relaxed text-sm font-medium transition-colors group-hover:text-violet-100/90">
                        {desc}
                    </p>

                    <div className="mt-auto pt-6 w-full">
                        <div className="h-0.5 w-12 rounded-full bg-white/20 group-hover:w-1/2 group-hover:bg-gradient-to-r group-hover:from-violet-500 group-hover:to-transparent transition-all duration-500 ease-out" />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ServiceCard;