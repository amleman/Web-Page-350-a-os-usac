import React from 'react';
import { Rector } from '../types';

interface TimelineScrubberProps {
  rectors: Rector[];
  currentIndex: number; // -1 if Intro, 0..N for Rectors
  onScrollTo: (index: number) => void;
}

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({ rectors, currentIndex, onScrollTo }) => {
  // Only interactive if we are in rectors mode (currentIndex >= 0)

  const showTimeline = currentIndex >= 0;

  return (
    <div className={`absolute left-0 top-0 bottom-0 w-12 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-250 ${showTimeline ? 'opacity-100' : 'opacity-0'}`}>
      {/* Interactive Hit Area */}
      <div className="h-3/4 w-full flex flex-col justify-between items-center pointer-events-auto bg-transparent pl-6">
        {rectors.map((rector, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={rector.id}
              onClick={(e) => { e.stopPropagation(); onScrollTo(index); }}
              className="relative group cursor-pointer w-full flex justify-start py-2 items-center"
            >
              {/* Anchor Container for Alignment */}
              <div className="relative flex items-center justify-center">
                {/* Tooltip showing Year - Positioned Above */}
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white/90 text-black text-[10px] font-bold px-2 py-0.5 rounded opacity-0 transition-opacity duration-100 pointer-events-none whitespace-nowrap ${isActive ? 'opacity-100' : 'group-hover:opacity-100'}`}>
                  {rector.periodo.split('-')[0]}
                  {/* Little triangle pointer */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white/90"></div>
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
    </div>
  );
};