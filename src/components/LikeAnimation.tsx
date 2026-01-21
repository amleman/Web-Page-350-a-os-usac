import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LikeAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const LikeAnimation: React.FC<LikeAnimationProps> = ({ isVisible, onComplete }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -45 }}
          animate={{ scale: 1.5, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: -100 }}
          transition={{ duration: 0.5, ease: "backOut" }}
          onAnimationComplete={onComplete}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-[100]"
        >
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-full shadow-2xl border border-white/30">
            <Heart className="w-24 h-24 text-red-500 fill-red-500 drop-shadow-lg" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};