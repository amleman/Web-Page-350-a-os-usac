import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface AudioControllerProps {
    isMuted: boolean;
    onToggle: () => void;
}

export const AudioController: React.FC<AudioControllerProps> = ({ isMuted, onToggle }) => {
    return (
        <motion.button
            onClick={onToggle}
            className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 p-2 text-white transition-opacity hover:opacity-80 group outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
            title={isMuted ? "Activar audio" : "Silenciar audio"}
        >
            {/* Visualizer Bars (Only visible when active) */}
            {!isMuted && (
                <div className="flex items-center gap-[2px] h-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                            key={i}
                            className="w-0.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                            animate={{
                                height: [
                                    "20%",
                                    Math.random() > 0.5 ? "100%" : "60%",
                                    "40%",
                                    "80%",
                                    "20%"
                                ],
                            }}
                            transition={{
                                duration: 0.8 + Math.random() * 0.45, // Slower animation
                                repeat: Infinity,
                                repeatType: "mirror",
                                ease: "easeInOut",
                                delay: i * 0.05
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Icon - Reduced size */}
            {isMuted ? (
                <VolumeX className="w-5 h-5 text-white/50" />
            ) : (
                <Volume2 className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
            )}
        </motion.button>
    );
};
