import React, { useState, useRef, useEffect, useCallback, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue, MotionValue } from 'framer-motion';
import { RECTORES } from './constants';
import { Rector } from './types';
import { preloadImages } from './utils/imagePreloader';
import { useImagePreloader } from './hooks/useImagePreloader';
import { trackVisit } from './utils/visitsTracker';

// Lazy load components para code splitting
const RectorCard = lazy(() => import('./components/RectorCard').then(module => ({ default: module.RectorCard })));
const TimelineScrubber = lazy(() => import('./components/TimelineScrubber').then(module => ({ default: module.TimelineScrubber })));
const IntroSection = lazy(() => import('./components/IntroSection').then(module => ({ default: module.IntroSection })));
const BioSheet = lazy(() => import('./components/BioSheet').then(module => ({ default: module.BioSheet })));
const CreditsSection = lazy(() => import('./components/CreditsSection').then(module => ({ default: module.CreditsSection })));
const LikeButton = lazy(() => import('./components/LikeButton').then(module => ({ default: module.LikeButton })));

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

  const introImage = "/images/bc-fondo.png";

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#001e42]">
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
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ x, y }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={isIntro ? introImage : rector?.fondo_url}
            alt="Background"
            className="w-full h-full object-cover"
            loading={isIntro ? "eager" : "lazy"}
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001e42]/90 via-[#001e42]/20 to-[#001e42]/60" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- Types & Constants ---
type ViewState = 'INTRO' | 'RECTORS' | 'CREDITS';

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

  // Precargar imágenes críticas al montar
  useEffect(() => {
    const criticalImages = [
      '/images/bc-fondo.png',
      '/images/Dorado-350-logo-1024x640-sin-fondo.png',
      '/images/logotipo_bc_principal_blanco.svg',
      '/images/logotipo-usac-blanco.png',
      RECTORES[0]?.fondo_url,
      RECTORES[0]?.foto_url,
    ].filter(Boolean) as string[];

    preloadImages(criticalImages).catch(() => {
      // Ignorar errores silenciosamente
    });

    // Trackear visita inicial a intro
    trackVisit(null, 'intro');
  }, []);

  // Precargar imágenes adyacentes cuando cambia el índice
  useImagePreloader(
    currentRectorIndex,
    RECTORES,
    (rector) => rector.fondo_url
  );

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
      trackVisit(RECTORES[0].id, 'rector');
    } else if (viewState === 'RECTORS') {
      if (currentRectorIndex < RECTORES.length - 1) {
        const nextIndex = currentRectorIndex + 1;
        setCurrentRectorIndex(nextIndex);
        trackVisit(RECTORES[nextIndex].id, 'rector');
      } else {
        // Si estamos en el último rector, ir a créditos
        setViewState('CREDITS');
        trackVisit(null, 'credits');
      }
    }

    isScrolling.current = true;
    setTimeout(() => { isScrolling.current = false; }, 400);
  }, [viewState, currentRectorIndex]);

  const handlePrev = useCallback(() => {
    if (isScrolling.current) return;

    if (viewState === 'CREDITS') {
      // Volver al último rector desde créditos
      setViewState('RECTORS');
      setCurrentRectorIndex(RECTORES.length - 1);
      trackVisit(RECTORES[RECTORES.length - 1].id, 'rector');
    } else if (viewState === 'RECTORS') {
      if (currentRectorIndex > 0) {
        const prevIndex = currentRectorIndex - 1;
        setCurrentRectorIndex(prevIndex);
        trackVisit(RECTORES[prevIndex].id, 'rector');
      } else {
        setViewState('INTRO');
        trackVisit(null, 'intro');
      }
    }

    isScrolling.current = true;
    setTimeout(() => { isScrolling.current = false; }, 400);
  }, [viewState, currentRectorIndex]);

  const jumpToRector = (index: number) => {
    setViewState('RECTORS');
    setCurrentRectorIndex(index);
    trackVisit(RECTORES[index].id, 'rector');
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

    const handleTouchMove = (e: TouchEvent) => { };

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
        isIntro={viewState === 'INTRO' || viewState === 'CREDITS'}
      />

      {/* 2. Content Container */}
      <div className="relative z-10 w-full h-full">

        {/* Global Header for Rectors View (Static) */}
        {viewState === 'RECTORS' && (
          <div className="absolute top-0 left-0 right-0 w-full flex justify-center pt-4 md:pt-6 z-50 pointer-events-none">
            <motion.img
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.25 }}
              src="/images/Dorado-350-logo-1024x640-sin-fondo.png"
              alt="USAC 350 Años"
              className="h-16 md:h-20 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mt-8"
              loading="eager"
              decoding="async"
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
              exit={{ opacity: 0, y: -100, transition: { duration: 0.26 } }}
              transition={{ duration: 0.26 }}
            >
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <div className="animate-pulse text-amber-400">Cargando...</div>
                </div>
              }>
                <IntroSection
                  onScrollClick={() => handleNext()}
                />
              </Suspense>
            </motion.div>
          )}

          {viewState === 'RECTORS' && (
            <motion.div
              key="rectors-stack"
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.26 }}
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
                  <Suspense fallback={
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-pulse text-amber-400">Cargando...</div>
                    </div>
                  }>
                    <RectorCard
                      rector={RECTORES[currentRectorIndex]}
                      isActive={true}
                      onOpenBio={(r) => setSelectedRector(r)}
                      onHoverChange={setIsCardHovered}
                    />
                  </Suspense>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {viewState === 'CREDITS' && (
            <motion.div
              key="credits-section"
              className="absolute inset-0 w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100, transition: { duration: 0.26 } }}
              transition={{ duration: 0.26 }}
            >
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <div className="animate-pulse text-amber-400">Cargando...</div>
                </div>
              }>
                <CreditsSection
                  onScrollUp={() => handlePrev()}
                />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Like Button - Solo visible en vista de rectores */}
      <AnimatePresence>
        {viewState === 'RECTORS' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50"
          >
            <Suspense fallback={null}>
              <LikeButton
                rectorId={RECTORES[currentRectorIndex].id}
              />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Navigation UI */}
      <motion.div
        animate={{ opacity: viewState === 'RECTORS' ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none absolute inset-0 z-40"
      >
        <Suspense fallback={null}>
          <TimelineScrubber
            rectors={RECTORES}
            currentIndex={viewState === 'INTRO' || viewState === 'CREDITS' ? -1 : currentRectorIndex}
            onScrollTo={jumpToRector}
          />
        </Suspense>
      </motion.div>

      {/* 5. Modals */}
      <AnimatePresence>
        {selectedRector && (
          <Suspense fallback={null}>
            <BioSheet
              key="bio-sheet"
              rector={selectedRector}
              isOpen={true}
              onClose={() => setSelectedRector(null)}
            />
          </Suspense>
        )}
      </AnimatePresence>


    </main>
  );
}

export default App;