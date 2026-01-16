import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

interface SwipeIndicatorProps {
  currentIndex: number;
  totalItems: number;
  onDismiss?: () => void;
}

export const SwipeIndicator: React.FC<SwipeIndicatorProps> = ({ 
  currentIndex, 
  totalItems,
  onDismiss 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Ocultar después de la primera interacción o después de 4 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setIsVisible(false);
        onDismiss?.();
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [hasInteracted, onDismiss]);

  // Detectar interacción del usuario
  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
      setIsVisible(false);
      onDismiss?.();
    };

    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('wheel', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('wheel', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [onDismiss]);

  if (!isVisible || hasInteracted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 1.5, duration: 0.4 }}
          className="fixed bottom-6 left-0 right-0 z-40 pointer-events-none"
          style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            {/* Flechas animadas */}
            <motion.div
              animate={{ 
                y: [0, 4, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex flex-col items-center gap-1 rotate-180"
            >
              <ChevronUp className="w-4 h-4 text-amber-400/60" />
              <ChevronUp className="w-4 h-4 text-amber-400/40 -mt-2" />
            </motion.div>
            
            {/* Texto sutil */}
            <motion.div
              animate={{ 
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-[10px] sm:text-xs text-amber-300/70 font-serif uppercase tracking-wider text-center whitespace-nowrap"
            >
              Desliza arriba o abajo
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
