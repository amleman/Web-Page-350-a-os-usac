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
      className="relative w-full h-full flex flex-col items-center justify-between p-4"
    >
      {/* Central Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-[85vw] md:w-full md:max-w-md min-h-[75vh] md:min-h-[70vh] relative my-2">

        {/* Glass Card */}
        <motion.div
          variants={cardVariants}
          className="w-full relative z-10 px-2"
        >
          <motion.div
            onHoverStart={() => onHoverChange?.(true)}
            onHoverEnd={() => onHoverChange?.(false)}
            className="w-full p-5 md:p-8 flex flex-col items-center text-center relative overflow-hidden
                                bg-white/5 
                                backdrop-blur-[2px]
                                rounded-[2rem] md:rounded-[2.5rem]
                                border-t border-l border-white/20
                                border-b border-r border-white/5
                                shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
          >
            {/* Reflection */}
            <div className="absolute -inset-[100%] bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rotate-12 opacity-50" />

            {/* Period Badge */}
            <motion.div variants={itemVariants} className="mb-4 md:mb-6 relative z-10">
              <span className="px-5 py-1.5 rounded-full text-[10px] md:text-xs font-serif font-bold tracking-[0.2em] bg-black/40 text-amber-100 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                {rector.periodo}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="relative z-10 font-serif text-2xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-500 mb-4 md:mb-8 drop-shadow-sm leading-tight"
            >
              {rector.nombre}
            </motion.h1>

            {/* Photo */}
            <motion.div
              variants={itemVariants}
              className="relative w-40 h-40 md:w-64 md:h-64 mb-4 md:mb-6 z-10 shrink-0 group"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/10 to-yellow-600/10 blur-xl md:blur-2xl group-hover:from-amber-500/20 transition-all duration-500" />
              {imageError ? (
                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center border border-amber-500/20 relative z-10">
                  <User size={64} className="text-slate-600" />
                </div>
              ) : (
                <img
                  src={rector.foto_url}
                  alt={rector.nombre}
                  className="w-full h-full object-cover rounded-full shadow-2xl border border-amber-500/20 relative z-10"
                  onError={() => setImageError(true)}
                />
              )}
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="relative z-10 text-zinc-300 font-light italic text-xs md:text-lg leading-relaxed max-w-xs"
            >
              {rector.descripcion_corta}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="w-full relative z-20 shrink-0 mb-4 md:mb-8 min-h-[5rem] max-w-lg">
        <motion.div
          variants={footerVariants}
          className="flex flex-col gap-3 md:gap-4"
        >
          <blockquote className="font-serif italic text-sm md:text-xl text-center text-white/80 drop-shadow-lg px-2 line-clamp-2">
            "{rector.cita}"
          </blockquote>

          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(245, 158, 11, 0.2)" }}
            onClick={(e) => { e.stopPropagation(); onOpenBio(rector); }}
            className="w-full py-3 md:py-4 bg-black/60 backdrop-blur-sm border border-amber-500/40 text-amber-400 hover:text-amber-200 hover:border-amber-400 rounded-xl md:rounded-2xl font-serif font-medium tracking-wide shadow-lg flex items-center justify-center gap-2 transition-all duration-300 text-sm md:text-base group"
          >
            <Info size={18} className="text-amber-500 group-hover:text-amber-300" />
            <span>LEER BIOGRAFÍA COMPLETA</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};