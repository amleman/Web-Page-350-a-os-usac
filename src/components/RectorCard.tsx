import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Info, User, ChevronUp, ChevronDown } from 'lucide-react';
import { Rector } from '../types';
import { LikeAnimation } from './LikeAnimation';

interface RectorCardProps {
  rector: Rector;
  isActive: boolean;
  onOpenBio: (rector: Rector) => void;
  onHoverChange?: (isHovered: boolean) => void;
  showLikeAnimation?: boolean;
  onAnimationComplete?: () => void;
}

export const RectorCard: React.FC<RectorCardProps> = ({
  rector,
  isActive,
  onOpenBio,
  onHoverChange,
  showLikeAnimation = false,
  onAnimationComplete = () => { }
}) => {
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
      className="relative w-full h-full flex flex-col items-center justify-center py-4 pr-4 pl-14 sm:py-6 sm:pr-6 sm:pl-16 md:p-8 lg:p-10 xl:p-12 lg:-mt-[80px]"
    >
      {/* Main Card Container */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none lg:w-full lg:pl-12 lg:pr-[80px] xl:p-[25px] xl:pr-[70px] flex flex-col lg:flex-row items-center gap-3 sm:gap-4 md:gap-5 lg:gap-12 xl:gap-16 flex-1 justify-center">

        {/* Glass Card */}
        <motion.div
          variants={cardVariants}
          className="w-full lg:w-3/5 relative z-10 flex-shrink-0"
        >
          <motion.div
            onHoverStart={() => onHoverChange?.(true)}
            onHoverEnd={() => onHoverChange?.(false)}
            className="w-full p-4 sm:p-5 md:p-6 lg:p-8 xl:p-8 xl:max-h-[600px] flex flex-col items-center text-center relative overflow-hidden
                                bg-gradient-to-b from-white/[0.08] to-white/[0.03]
                                backdrop-blur-md
                                rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl
                                border border-amber-500/20
                                shadow-[0_8px_32px_0_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.1)]
                                flex-1 min-h-0"
          >
            {/* Period Badge */}
            <motion.div variants={itemVariants} className="mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-3 relative z-10 flex-shrink-0">
              <span className="px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 py-1 sm:py-1.5 md:py-2 lg:py-2.5 xl:py-3 rounded-full text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg font-serif font-bold tracking-wider uppercase bg-black/40 text-amber-300 border border-amber-500/50 shadow-[0_0_10px_rgba(251,191,36,0.2)]">
                {rector.periodo}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="relative z-10 font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[40px] text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] leading-tight px-2 flex-shrink-0"
            >
              {rector.nombre}
            </motion.h1>

            {/* Photo */}
            <motion.div
              variants={itemVariants}
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 xl:w-60 xl:h-60 mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-4 z-10 shrink-0 group"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/20 via-amber-400/15 to-yellow-600/20 blur-2xl md:blur-3xl group-hover:from-amber-500/30 group-hover:to-yellow-600/30 transition-all duration-700" />
              <div className="absolute inset-0 rounded-full border-2 border-amber-500/30 group-hover:border-amber-400/50 transition-all duration-300" />
              {imageError ? (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border-2 border-amber-500/30 relative z-10 shadow-inner">
                  <User size={64} className="text-slate-500" />
                </div>
              ) : rector.video_url ? (
                <video
                  src={rector.video_url}
                  poster={rector.foto_url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_0_2px_rgba(251,191,36,0.2)] relative z-10"
                  onError={() => setImageError(true)} // Fallback to error state if video fails severely, though typically poster handles it
                />
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

              {/* Like Animation Overlay */}
              <LikeAnimation
                isVisible={showLikeAnimation}
                onComplete={onAnimationComplete}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="relative z-10 text-zinc-200 font-light italic text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg leading-relaxed max-w-xs sm:max-w-sm md:max-w-md px-[20px] flex-shrink-0"
            >
              {rector.descripcion_corta}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Quote and Button */}
        <motion.div
          variants={footerVariants}
          className="w-full lg:w-2/5 flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 flex-shrink-0 lg:px-8 justify-center"
        >
          <blockquote className="font-serif italic text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[24px] text-center text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] px-[15%] lg:px-0 py-4 sm:py-5 mb-4 mt-4 line-clamp-6 leading-relaxed border-t border-b border-white/10">
            "{rector.cita}"
          </blockquote>

          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(245, 158, 11, 0.3)" }}
            onClick={(e) => { e.stopPropagation(); onOpenBio(rector); }}
            className="w-auto min-w-[210px] px-6 sm:px-10 mx-auto lg:w-full py-2.5 sm:py-3 md:py-4 lg:py-5 xl:py-6 bg-gradient-to-r from-amber-900/40 via-amber-800/30 to-amber-900/40 backdrop-blur-md border border-amber-500/40 text-amber-300 hover:text-amber-100 hover:border-amber-400/60 rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl font-serif font-semibold tracking-wide shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 transition-all duration-300 text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg group"
          >
            <Info size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-amber-400 group-hover:text-amber-300 transition-colors" />
            <span>LEER BIOGRAFÍA COMPLETA</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Navigation Hints */}
      <motion.div
        className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 text-amber-500/40 hidden md:flex flex-col items-center gap-1 pointer-events-none"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <ChevronUp size={24} className="animate-bounce" />
      </motion.div>

      <motion.div
        className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-amber-500/40 flex flex-col items-center gap-1 pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <ChevronDown size={24} className="animate-bounce" />
        <span className="text-[10px] sm:text-xs tracking-widest uppercase opacity-60 hidden sm:block">Deslizar</span>
      </motion.div>
    </section>
  );
};