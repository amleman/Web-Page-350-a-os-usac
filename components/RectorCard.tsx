import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Info, User } from 'lucide-react';
import { Rector } from '../types';

interface RectorCardProps {
  rector: Rector;
  isActive: boolean;
  onOpenBio: (rector: Rector) => void;
  onHoverChange?: (isHovered: boolean) => void;
}

export const RectorCard: React.FC<RectorCardProps> = ({ rector, isActive, onOpenBio, onHoverChange }) => {
  const [imageError, setImageError] = useState(false);

  // Reset error state when rector changes
  useEffect(() => {
    setImageError(false);
  }, [rector.id]);


  // --- Animation Variants ---

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.15,
        when: "beforeChildren",
        staggerChildren: 0.05,
        duration: 0.125,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)',
      transition: {
        duration: 0.125,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.15, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.1 }
    }
  };

  const footerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, duration: 0.2 }
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.15 }
    }
  };

  return (
    <section
      className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12"
    >
      {/* Main Card Container */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl flex flex-col items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 flex-1 justify-center">
        
        {/* Glass Card */}
        <motion.div
          variants={cardVariants}
          className="w-full relative z-10 flex-shrink-0"
        >
          <motion.div
            onHoverStart={() => onHoverChange?.(true)}
            onHoverEnd={() => onHoverChange?.(false)}
            className="w-full p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 2xl:p-12 flex flex-col items-center text-center relative overflow-hidden
                                bg-gradient-to-b from-white/[0.08] to-white/[0.03]
                                backdrop-blur-md
                                rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl
                                border border-amber-500/20
                                shadow-[0_8px_32px_0_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.1)]
                                flex-1 min-h-0"
          >
            {/* Period Badge */}
            <motion.div variants={itemVariants} className="mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-8 relative z-10 flex-shrink-0">
              <span className="px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 py-1 sm:py-1.5 md:py-2 lg:py-2.5 xl:py-3 2xl:py-4 rounded-full text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg font-serif font-bold tracking-wider uppercase bg-black/40 text-amber-300 border border-amber-500/50 shadow-[0_0_10px_rgba(251,191,36,0.2)]">
                {rector.periodo}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="relative z-10 font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-8 2xl:mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] leading-tight px-2 flex-shrink-0"
            >
              {rector.nombre}
            </motion.h1>

            {/* Photo */}
            <motion.div
              variants={itemVariants}
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 xl:w-72 xl:h-72 2xl:w-80 2xl:h-80 mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-8 2xl:mb-10 z-10 shrink-0 group"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/20 via-amber-400/15 to-yellow-600/20 blur-2xl md:blur-3xl group-hover:from-amber-500/30 group-hover:to-yellow-600/30 transition-all duration-700" />
              <div className="absolute inset-0 rounded-full border-2 border-amber-500/30 group-hover:border-amber-400/50 transition-all duration-300" />
              {imageError ? (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border-2 border-amber-500/30 relative z-10 shadow-inner">
                  <User size={64} className="text-slate-500" />
                </div>
              ) : (
                <img
                  src={rector.foto_url}
                  alt={rector.nombre}
                  className="w-full h-full object-cover rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_0_2px_rgba(251,191,36,0.2)] relative z-10"
                  loading="lazy"
                  decoding="async"
                  onError={() => setImageError(true)}
                />
              )}
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="relative z-10 text-zinc-200 font-light italic text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl leading-relaxed max-w-xs sm:max-w-sm md:max-w-md px-2 flex-shrink-0"
            >
              {rector.descripcion_corta}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Quote and Button */}
        <motion.div
          variants={footerVariants}
          className="w-full flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 flex-shrink-0"
        >
          <blockquote className="font-serif italic text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-center text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] px-2 sm:px-4 py-2 sm:py-3 line-clamp-2 leading-relaxed border-t border-b border-white/10">
            "{rector.cita}"
          </blockquote>

          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(245, 158, 11, 0.3)" }}
            onClick={(e) => { e.stopPropagation(); onOpenBio(rector); }}
            className="w-full py-2.5 sm:py-3 md:py-4 lg:py-5 xl:py-6 bg-gradient-to-r from-amber-900/40 via-amber-800/30 to-amber-900/40 backdrop-blur-md border border-amber-500/40 text-amber-300 hover:text-amber-100 hover:border-amber-400/60 rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl font-serif font-semibold tracking-wide shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 transition-all duration-300 text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl group"
          >
            <Info size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-amber-400 group-hover:text-amber-300 transition-colors" />
            <span>LEER BIOGRAFÍA COMPLETA</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};