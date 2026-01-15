import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface IntroSectionProps {
  onScrollClick: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onScrollClick }) => {
  return (
    <section className="relative w-full h-full flex flex-col items-center justify-between p-6 bg-transparent text-center z-20">

      {/* Top: Logos Container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mt-8 md:mt-12 flex flex-row items-center justify-center gap-12"
      >
        <img
          src="/images/logotipo_bc_principal_blanco.svg"
          alt="Biblioteca Central USAC"
          className="h-14 md:h-[4.5rem] w-auto object-contain drop-shadow-lg opacity-90"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            console.error('Error loading BC logo');
          }}
        />
        <div className="hidden md:block w-px h-10 bg-white/20"></div>
        {/* Updated to use the generated SVG for reliability */}
        <img
          src="/images/logotipo-usac-blanco.png"
          alt="USAC"
          className="h-14 md:h-[4.5rem] w-auto object-contain drop-shadow-lg opacity-90"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            console.error('Error loading USAC logo');
          }}
        />
      </motion.div>

      {/* Center: Main Title */}
      <div className="flex flex-col items-center gap-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] mb-2">
            350 Años
          </h1>
          <h2 className="text-xl md:text-3xl text-white/90 font-serif tracking-widest uppercase border-t border-b border-amber-500/30 py-2">
            De Historia USAC a través de nuestros Rectores
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-zinc-300 font-light text-sm md:text-lg max-w-md leading-relaxed"
        >
          Explora el legado de los rectores que forjaron la identidad de la Tricentenaria Universidad de San Carlos de Guatemala.
        </motion.p>
      </div>

      {/* Bottom: Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="mb-8 md:mb-12 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={onScrollClick}
      >
        <span className="text-amber-200/80 text-xs tracking-[0.2em] uppercase group-hover:text-amber-100 transition-colors">
          Descubre más
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="text-amber-400 w-6 h-6 md:w-8 md:h-8 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
        </motion.div>
      </motion.div>
    </section>
  );
};