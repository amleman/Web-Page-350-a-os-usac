import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#001e42] flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.05),transparent_70%)]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 text-center max-w-lg mx-auto"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-9xl font-playfair font-bold text-amber-500/20 select-none">404</h1>
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-amber-400 mb-4">
                    Página no encontrada
                </h2>

                <p className="text-white/70 text-lg mb-8 font-serif leading-relaxed">
                    Lo sentimos, la página que buscas no forma parte de nuestro recorrido histórico de 350 años.
                </p>

                <Link to="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full text-white font-serif font-semibold shadow-lg hover:shadow-amber-500/20 transition-all border border-amber-400/20"
                    >
                        <ArrowLeft size={20} />
                        Regresar al Inicio
                    </motion.button>
                </Link>
            </motion.div>

            {/* Decorative footer line */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </div>
    );
};
