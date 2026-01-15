import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Bookmark } from 'lucide-react';

interface InteractionBurstProps {
    isVisible: boolean;
    onComplete: () => void;
    type: 'like' | 'bookmark';
}

const COLORS = [
    '#fbbf24', // Gold (Amber 400)
    '#f59e0b', // Darker Gold (Amber 500)
    '#e4e4e7', // Silver (Zinc 200)
    '#94a3b8', // Silver/Blueish (Slate 400)
    '#001e42', // Deep Blue (USAC)
    '#1e3a8a', // Blue 900
];

export const InteractionBurst: React.FC<InteractionBurstProps> = ({ isVisible, onComplete, type }) => {
    // Generate random particles
    const particles = Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 360) / 24;
        const distance = Math.random() * 100 + 50; // Distance from center
        return {
            id: i,
            x: Math.cos((angle * Math.PI) / 180) * distance,
            y: Math.sin((angle * Math.PI) / 180) * distance,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            scale: Math.random() * 0.5 + 0.5,
        };
    });

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 overflow-hidden">

                    {/* Central Icon Background */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0, rotate: -45 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0, opacity: 0 }} // Quick exit
                        transition={{ duration: 0.3, ease: "backOut" }}
                        onAnimationComplete={() => setTimeout(onComplete, 100)} // Small buffer
                        className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-full shadow-[0_0_30px_rgba(251,191,36,0.2)] border border-white/20"
                    >
                        {type === 'like' ? (
                            <Heart className="w-16 h-16 text-red-500 fill-red-500 drop-shadow-lg" />
                        ) : (
                            <Bookmark className="w-16 h-16 text-amber-400 fill-amber-400 drop-shadow-lg" />
                        )}
                    </motion.div>

                    {/* Particles */}
                    {particles.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                            animate={{
                                x: p.x,
                                y: p.y,
                                opacity: 0,
                                scale: p.scale
                            }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut"
                            }}
                            className="absolute w-3 h-3 rounded-full shadow-sm"
                            style={{ backgroundColor: p.color }}
                        />
                    ))}

                </div>
            )}
        </AnimatePresence>
    );
};
