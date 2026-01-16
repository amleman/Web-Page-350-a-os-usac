import React from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen } from 'lucide-react';
import { Rector } from '../types';

interface BioSheetProps {
  rector: Rector | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BioSheet: React.FC<BioSheetProps> = ({ rector, onClose }) => {
  if (!rector) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-60 backdrop-blur-sm"
        transition={{ duration: 0.3 }}
      />

      {/* Sheet - Changed bg-zinc-950 to bg-[#0B1120] (Dark Ocean Blue) */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-70 bg-[#0B1120] border-t border-cyan-500/20 rounded-t-3xl max-h-[85vh] overflow-y-auto shadow-[0_-10px_40px_rgba(0,0,0,0.8)]"
      >
        <div className="sticky top-0 left-0 right-0 p-4 flex justify-center bg-[#0B1120]/95 backdrop-blur z-10 border-b border-cyan-500/10">
          <div className="w-12 h-1.5 bg-slate-700 rounded-full mb-2 absolute top-3" />
        </div>

        <div className="px-8 pb-12 pt-4">
          <div className="flex justify-between items-start mb-6">
             <div>
                <h2 className="text-3xl font-serif text-amber-400 mb-2">{rector.nombre}</h2>
                {/* Dark Gold Aesthetic Badge */}
                <span className="inline-block px-4 py-1 bg-black/40 border border-amber-500/30 rounded-full text-amber-200 text-xs font-serif font-bold tracking-widest">
                  {rector.periodo}
                </span>
             </div>
             <button onClick={onClose} className="p-2 bg-slate-800/50 rounded-full text-slate-400 hover:text-amber-400 transition-colors border border-white/5 hover:border-amber-500/30">
               <X size={24} />
             </button>
          </div>

          <div className="mb-8">
             <h3 className="text-lg font-semibold text-amber-100 flex items-center gap-2 mb-3 font-serif">
               <BookOpen size={20} className="text-amber-500" />
               Biografía
             </h3>
             <p className="text-slate-300 leading-relaxed text-lg font-light">
               {rector.biografia_completa}
             </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-slate-900 to-[#020617] rounded-2xl border border-cyan-500/10 shadow-inner">
            <p className="font-serif italic text-xl text-center text-amber-200/80">
              "{rector.cita}"
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};