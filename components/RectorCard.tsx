import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Heart, GraduationCap, Share2, Info } from 'lucide-react';
import { Rector } from '../types';
import { LikeAnimation } from './LikeAnimation';

interface RectorCardProps {
  rector: Rector;
  isActive: boolean;
  onOpenBio: (rector: Rector) => void;
  onHoverChange?: (isHovered: boolean) => void;
}

export const RectorCard: React.FC<RectorCardProps> = ({ rector, isActive, onOpenBio, onHoverChange }) => {
  const [likes, setLikes] = useState(rector.interacciones.likes);
  const [alumnos, setAlumnos] = useState(rector.interacciones.alumnos);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [showLikeAnim, setShowLikeAnim] = useState(false);
  
  const lastTapRef = useRef<number>(0);

  useEffect(() => {
    const liked = localStorage.getItem(`like_${rector.id}`);
    const checkedIn = localStorage.getItem(`checkin_${rector.id}`);
    if (liked) setHasLiked(true);
    if (checkedIn) setHasCheckedIn(true);
  }, [rector.id]);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
      localStorage.setItem(`like_${rector.id}`, 'true');
    }
    setShowLikeAnim(true);
  };

  const handleDoubleTap = (e: React.MouseEvent | React.TouchEvent) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      handleLike();
    }
    lastTapRef.current = now;
  };

  const handleCheckIn = () => {
    if (hasCheckedIn) return;
    setAlumnos(prev => prev + 1);
    setHasCheckedIn(true);
    localStorage.setItem(`checkin_${rector.id}`, 'true');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Rector USAC: ${rector.nombre}`,
          text: `Conoce la historia del ${rector.nombre} (${rector.periodo}) en los 350 años de la USAC.`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      alert('Compartir no soportado en este navegador');
    }
  };

  // --- Animation Variants ---
  // These variants are automatically used by children because the parent in App.tsx sets initial/animate/exit
  
  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        delay: 0.3, 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)',
      transition: { 
        duration: 0.4, 
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
      transition: { duration: 0.5, ease: "easeOut" } 
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 } 
    }
  };

  const sideContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.5 }
    },
    exit: { 
        opacity: 0, 
        transition: { duration: 0.3 } 
    }
  };

  const sideItemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    exit: { 
        opacity: 0, 
        x: 10,
        transition: { duration: 0.2 } 
    }
  };

  const footerVariants: Variants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
          opacity: 1, 
          y: 0,
          transition: { delay: 0.6, duration: 0.4 }
      },
      exit: { 
          opacity: 0, 
          y: 10,
          transition: { duration: 0.3 } 
      }
  };

  return (
    <section 
      className="relative w-full h-full flex flex-col items-center justify-between p-4"
      onClick={handleDoubleTap}
    >
      <LikeAnimation isVisible={showLikeAnim} onComplete={() => setShowLikeAnim(false)} />

      {/* Central Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg relative min-h-0 my-2">
            
            {/* Action Sidebar - Now participating in Exit animation */}
            <motion.div 
                className="absolute -right-1 md:-right-16 top-1/2 -translate-y-1/2 flex flex-col gap-4 items-center z-20 pointer-events-auto"
                variants={sideContainerVariants}
                // initial/animate/exit inherited from parent in App.tsx
            >
                {/* Likes */}
                <motion.div variants={sideItemVariants}>
                    <div className="flex flex-col items-center gap-0.5">
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleLike(); }}
                            className={`p-3 rounded-full backdrop-blur-md border border-white/10 shadow-lg transition-all active:scale-90 ${hasLiked ? 'text-red-500 bg-red-500/20' : 'text-white/90 bg-white/10 hover:bg-white/20'}`}
                        >
                            <Heart size={20} className={hasLiked ? 'fill-current' : ''} />
                        </button>
                        <span className="text-[9px] font-bold text-white/90 drop-shadow-md bg-black/40 px-1.5 py-0.5 rounded-full">
                            {likes >= 1000 ? (likes / 1000).toFixed(1) + 'K' : likes}
                        </span>
                    </div>
                </motion.div>

                {/* Check-In */}
                <motion.div variants={sideItemVariants}>
                    <div className="flex flex-col items-center gap-0.5">
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleCheckIn(); }}
                            disabled={hasCheckedIn}
                            className={`p-3 rounded-full backdrop-blur-md border border-white/10 shadow-lg transition-all active:scale-90 ${hasCheckedIn ? 'text-blue-400 bg-blue-500/20' : 'text-white/90 bg-white/10 hover:bg-white/20'}`}
                        >
                            <GraduationCap size={20} />
                        </button>
                        <span className="text-[9px] font-bold text-white/90 drop-shadow-md bg-black/40 px-1.5 py-0.5 rounded-full">
                            {alumnos >= 1000 ? (alumnos / 1000).toFixed(1) + 'K' : alumnos}
                        </span>
                    </div>
                </motion.div>

                {/* Share */}
                <motion.div variants={sideItemVariants}>
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleShare(); }}
                        className="p-3 rounded-full text-white/90 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 shadow-lg transition-all active:scale-90"
                    >
                        <Share2 size={18} />
                    </button>
                </motion.div>
            </motion.div>

            {/* Glass Card */}
            <motion.div
                variants={cardVariants}
                className="w-full relative z-10 px-2"
                // initial/animate/exit inherited
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
                            <img 
                            src={rector.foto_url} 
                            alt={rector.nombre}
                            className="w-full h-full object-cover rounded-full shadow-2xl border border-amber-500/20 relative z-10"
                            />
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
                // initial/animate/exit inherited
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