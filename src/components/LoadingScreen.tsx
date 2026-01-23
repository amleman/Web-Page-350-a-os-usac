import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="relative flex flex-col items-center">
                {/* Logo Animation */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <img
                        src={`${import.meta.env.BASE_URL}images/logotipo-usac-blanco.png`}
                        alt="USAC Logo"
                        className="w-32 h-auto opacity-90"
                    />
                </motion.div>

                {/* Text Animation */}
                <motion.h2
                    className="text-2xl md:text-3xl font-light text-white tracking-widest uppercase font-serif"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    Cargando la experiencia
                </motion.h2>

                {/* Progress Bar / Loader */}
                <motion.div
                    className="w-48 h-0.5 bg-gray-800 mt-6 overflow-hidden relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-amber-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3.2, ease: "easeInOut", delay: 0.2 }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};
