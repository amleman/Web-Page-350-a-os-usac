import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

interface CreditsSectionProps {
  onScrollUp: () => void;
}

export const CreditsSection: React.FC<CreditsSectionProps> = ({ onScrollUp }) => {
  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-transparent text-center z-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Contenido de créditos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6 md:space-y-8"
        >
          {/* Información de la Universidad */}
          <div className="bg-white/5 backdrop-blur-[2px] rounded-2xl p-6 md:p-8 border border-white/10">
            <h2 className="font-serif text-2xl md:text-3xl text-amber-300 mb-4">
              Universidad de San Carlos de Guatemala
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              Tricentenaria Universidad de San Carlos de Guatemala
            </p>
            <p className="text-zinc-400 text-xs md:text-sm mt-2">
              Celebrando 350 años de historia y excelencia académica
            </p>
          </div>

          {/* Biblioteca Central */}
          <div className="bg-white/5 backdrop-blur-[2px] rounded-2xl p-6 md:p-8 border border-white/10">
            <h2 className="font-serif text-xl md:text-2xl text-amber-300 mb-1">
              Biblioteca Central
            </h2>
            <p className="text-zinc-400 text-[10px] md:text-xs mb-4">
              Dirección General de Administración -DIGA-
            </p>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              Preservando y difundiendo el conocimiento universitario
            </p>
          </div>

          {/* Año */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center gap-2 text-amber-400 mt-8"
          >
            <span className="font-serif text-2xl md:text-4xl tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              1676 - 2026
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator hacia arriba */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-8 md:bottom-12 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={onScrollUp}
      >
        <span className="text-amber-200/80 text-xs tracking-[0.2em] uppercase group-hover:text-amber-100 transition-colors">
          Volver
        </span>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        >
          <ChevronUp className="text-amber-400 w-6 h-6 md:w-8 md:h-8 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
