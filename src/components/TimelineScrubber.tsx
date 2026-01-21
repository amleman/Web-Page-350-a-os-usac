import React from 'react';
import { Rector } from '../types';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface TimelineScrubberProps {
  rectors: Rector[];
  currentIndex: number; // -1 if Intro, 0..N for Rectors
  onScrollTo: (index: number) => void;
  onGoToIntro: () => void;
  onGoToCredits: () => void;
}

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
  rectors,
  currentIndex,
  onScrollTo,
  onGoToIntro,
  onGoToCredits
}) => {
  // Only interactive if we are in rectors mode (currentIndex >= 0)
  const showTimeline = currentIndex >= 0;

  return (
    <div className={`absolute left-0 top-0 bottom-0 w-12 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-250 ${showTimeline ? 'opacity-100' : 'opacity-0'}`}>
      {/* Interactive Hit Area */}
      <div className="h-[85%] w-full flex flex-col justify-between items-center pointer-events-auto bg-transparent pl-4">

        {/* Start Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onGoToIntro(); }}
          className="group flex flex-col items-center gap-1 p-2 hover:scale-110 transition-transform"
          title="Ir al Inicio"
        >
          <div className="text-[10px] text-white/50 font-serif opacity-0 group-hover:opacity-100 transition-opacity absolute left-10">Inicio</div>
          <ChevronUp className="w-5 h-5 text-white/50 group-hover:text-amber-400 transition-colors" />
        </button>

        {/* Dots Container */}
        <div className="flex-1 flex flex-col justify-between items-center w-full py-4">
          {rectors.map((rector, index) => {
            const isActive = index === currentIndex;

            return (
              <div
                key={rector.id}
                onClick={(e) => { e.stopPropagation(); onScrollTo(index); }}
                className="relative group cursor-pointer w-full flex justify-center py-1 items-center"
              >
                {/* Anchor Container for Alignment */}
                <div className="relative flex items-center justify-center">
                  {/* Tooltip showing Year - Positioned Right */}
                  <div className={`absolute left-full ml-3 bg-black/80 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded opacity-0 transition-opacity duration-100 pointer-events-none whitespace-nowrap z-50 ${isActive ? 'opacity-100' : 'group-hover:opacity-100'}`}>
                    {rector.periodo.split('-')[0]}
                    {/* Little triangle pointer */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-full border-4 border-transparent border-r-black/80"></div>
                  </div>

                  {/* Dot */}
                  <div
                    className={`rounded-full transition-all duration-150 ${isActive ? 'w-2.5 h-2.5 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* End Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onGoToCredits(); }}
          className="group flex flex-col items-center gap-1 p-2 hover:scale-110 transition-transform"
          title="Ver Créditos"
        >
          <div className="text-[10px] text-white/50 font-serif opacity-0 group-hover:opacity-100 transition-opacity absolute left-10">Créditos</div>
          <ChevronDown className="w-5 h-5 text-white/50 group-hover:text-amber-400 transition-colors" />
        </button>

      </div>
    </div>
  );
};