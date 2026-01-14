import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue, MotionValue } from 'framer-motion';
import { RECTORES } from './constants';
import { RectorCard } from './components/RectorCard';
import { TimelineScrubber } from './components/TimelineScrubber';
import { IntroSection } from './components/IntroSection';
import { BioSheet } from './components/BioSheet';
import { Rector } from './types';

// --- Background Component ---
const ActiveBackground = ({ 
  rector, 
  mouseX, 
  mouseY,
  isHovered,
  isIntro 
}: { 
  rector: Rector | undefined, 
  mouseX: MotionValue<number>, 
  mouseY: MotionValue<number>,
  isHovered: boolean,
  isIntro: boolean
}) => {
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const x = useTransform(springX, [0, window.innerWidth], [20, -20]);
  const y = useTransform(springY, [0, window.innerHeight], [20, -20]);

  const introImage = "https://picsum.photos/id/1048/800/1200"; 

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={isIntro ? 'intro-bg' : rector?.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: 1, 
            scale: (!isIntro && isHovered) ? 1.15 : 1.1, 
            filter: (!isIntro && isHovered) ? "blur(5px) brightness(0.3)" : "blur(2px) brightness(0.35)"
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ x, y }} 
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={isIntro ? introImage : rector?.fondo_url}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- Types & Constants ---
type ViewState = 'INTRO' | 'RECTORS';

function App() {
  const [viewState, setViewState] = useState<ViewState>('INTRO');
  const [currentRectorIndex, setCurrentRectorIndex] = useState(0);
  
  const [selectedRector, setSelectedRector] = useState<Rector | null>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);

  // Scroll/Swipe Cooldown
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);

  // Mouse Motion
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  // --- Navigation Logic ---

  const handleNext = useCallback(() => {
    if (isScrolling.current) return;
    
    if (viewState === 'INTRO') {
      setViewState('RECTORS');
      setCurrentRectorIndex(0);
    } else {
      if (currentRectorIndex < RECTORES.length - 1) {
        setCurrentRectorIndex(prev => prev + 1);
      }
    }
    
    isScrolling.current = true;
    setTimeout(() => { isScrolling.current = false; }, 800);
  }, [viewState, currentRectorIndex]);

  const handlePrev = useCallback(() => {
    if (isScrolling.current) return;

    if (viewState === 'RECTORS') {
      if (currentRectorIndex > 0) {
        setCurrentRectorIndex(prev => prev - 1);
      } else {
        setViewState('INTRO');
      }
    }

    isScrolling.current = true;
    setTimeout(() => { isScrolling.current = false; }, 800);
  }, [viewState, currentRectorIndex]);

  const jumpToRector = (index: number) => {
    setViewState('RECTORS');
    setCurrentRectorIndex(index);
  };

  // --- Event Listeners ---

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 30) return;
      if (e.deltaY > 0) handleNext();
      else handlePrev();
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {};

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;
      if (Math.abs(diff) > 50) {
        if (diff > 0) handleNext();
        else handlePrev();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleNext, handlePrev]);


  return (
    <main 
      className="relative w-full h-[100dvh] bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      
      {/* 1. Background Layer */}
      <ActiveBackground 
        rector={viewState === 'RECTORS' ? RECTORES[currentRectorIndex] : undefined}
        mouseX={mouseX}
        mouseY={mouseY}
        isHovered={isCardHovered}
        isIntro={viewState === 'INTRO'}
      />

      {/* 2. Content Container */}
      <div className="relative z-10 w-full h-full">
        
        {/* Global Header for Rectors View (Static) */}
        {viewState === 'RECTORS' && (
             <div className="absolute top-0 left-0 right-0 w-full flex justify-center pt-4 md:pt-6 z-50 pointer-events-none">
                <motion.img 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  src="public/images/Dorado-350-logo-1024x640-sin-fondo" 
                  alt="USAC 350 Años" 
                  className="h-16 md:h-20 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                />
            </div>
        )}

        <AnimatePresence mode="wait">
          {viewState === 'INTRO' && (
            <motion.div 
              key="intro-section"
              className="absolute inset-0 w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100, transition: { duration: 0.8 } }}
              transition={{ duration: 0.8 }}
            >
               <IntroSection 
                  onScrollClick={() => handleNext()} 
               />
            </motion.div>
          )}

          {viewState === 'RECTORS' && (
             <motion.div
                key="rectors-stack"
                className="absolute inset-0 w-full h-full"
             >
                {/* 
                  Sequential Card Transitions 
                  We pass state names to motion.div so children can inherit them.
                */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={RECTORES[currentRectorIndex].id}
                    className="absolute inset-0 w-full h-full flex items-center justify-center pt-20" // added padding top for logo
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <RectorCard 
                        rector={RECTORES[currentRectorIndex]} 
                        isActive={true} 
                        onOpenBio={(r) => setSelectedRector(r)}
                        onHoverChange={setIsCardHovered}
                    />
                  </motion.div>
                </AnimatePresence>
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Navigation UI */}
      <motion.div
        animate={{ opacity: viewState === 'RECTORS' ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute inset-0 z-40"
      >
        <TimelineScrubber 
          rectors={RECTORES} 
          currentIndex={viewState === 'INTRO' ? -1 : currentRectorIndex} 
          onScrollTo={jumpToRector}
        />
      </motion.div>

      {/* 4. Modals */}
      <AnimatePresence>
        {selectedRector && (
          <BioSheet 
            key="bio-sheet"
            rector={selectedRector} 
            isOpen={true} 
            onClose={() => setSelectedRector(null)} 
          />
        )}
      </AnimatePresence>

    </main>
  );
}

export default App;