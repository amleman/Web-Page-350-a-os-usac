import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useLikes } from '../hooks/useLikes';
import { LikeAnimation } from './LikeAnimation';

interface LikeButtonProps {
  rectorId: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ rectorId }) => {
  const { likeCount, isLiked, toggleLike } = useLikes(rectorId);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleLike = async () => {
    console.log(`[Component] LikeButton - Click en like para ${rectorId}, estado actual: isLiked=${isLiked}, count=${likeCount}`);
    const wasLiked = isLiked;
    
    try {
      const added = await toggleLike();
      console.log(`[Component] LikeButton - Toggle completado para ${rectorId}, added=${added}`);

      // Mostrar animación solo si se agregó un like
      if (added && !wasLiked) {
        console.log(`[Component] LikeButton - Mostrando animación para ${rectorId}`);
        setShowAnimation(true);
      }
    } catch (error) {
      console.error(`[Component] LikeButton - Error al dar like para ${rectorId}:`, error);
    }
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleLike}
        className="relative flex flex-col items-center gap-2 p-3 md:p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-amber-500/30 hover:border-amber-400/50 transition-all duration-300 shadow-lg hover:shadow-amber-500/20 group"
        aria-label={isLiked ? 'Quitar me gusta' : 'Dar me gusta'}
      >
        {/* Icono de corazón */}
        <motion.div
          animate={{
            scale: isLiked ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Heart
            className={`w-8 h-8 md:w-10 md:h-10 transition-all duration-300 ${
              isLiked
                ? 'text-red-500 fill-red-500'
                : 'text-amber-400/70 group-hover:text-amber-400'
            }`}
            fill={isLiked ? 'currentColor' : 'none'}
          />
        </motion.div>

        {/* Contador */}
        <motion.span
          key={likeCount}
          initial={{ scale: 1.2, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-sm md:text-base font-serif font-semibold text-amber-200 min-w-[2ch] text-center"
        >
          {likeCount}
        </motion.span>

        {/* Efecto de brillo al hacer hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/10 group-hover:via-amber-500/5 group-hover:to-amber-500/10 transition-all duration-300 pointer-events-none" />
      </motion.button>

      {/* Animación de like */}
      <AnimatePresence>
        {showAnimation && (
          <div className="fixed inset-0 pointer-events-none z-[100]">
            <LikeAnimation
              isVisible={showAnimation}
              onComplete={() => setShowAnimation(false)}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
